function solve(args) {
    var result = [];
    var n = args[0] | 0,
        keyValueModel = readModelData();

    var viewLinesCount = args[n + 1] | 0,
        code = '',
        isHTMLstarted = false,
        isTemplateStarted = false,
        templateName = '',
        templateCode = [],
        templates = {},
        isTagOpened = false,
        isLoopOpened = false,
        loopContent = [],
        loopTitle = '',
        loopItem = '',
        loopProperty = '',
        loopInObject = [];

    for (var line = 0; line < viewLinesCount; line++) {
        code = args[n + 2 + line];

        if (isHTMLstarted) {
            // parse
            if (isTagOpened) {
                //check for closing tag. Sinxw thwew won't be nested if or repeats, we are checking for open tag in the same place ....
                if (code.indexOf('</nk-if>') > -1) {
                    isTagOpened = false;
                    continue;
                }

                if (isLoopOpened) {
                    if (code.indexOf('</nk-repeat>') > -1) {
                        isTagOpened = false;
                        isLoopOpened = false;
                        // TODO.......
                        // produce loop content
                        for (var item = 0; item < loopInObject.length; item++) {
                            code = processLoopUnit(loopContent, loopItem, loopInObject[item]);
                        }
                        loopContent = [];
                        continue;
                    } else {
                        if (code.indexOf('<nk-template') > -1) {
                            loopContent = renderTemplate(code, loopContent);
                        } else {
                            loopContent.push(code);
                        }
                        continue;
                    }
                }
            }

            // if not in opened NikoAng. tag and there is no tag in the current line => just add it to the result
            // if (code.indexOf('<nk-') === -1) {
            //     result.push(code);
            // } else {
            //     // check for tags that should be escaped
            //     if (isEcapedTag(code)) {
            //         result.push(code.replace('{{', '').replace('}}', ''));
            //     } else {
            //         // check which is the tag
            //         if (code.indexOf('<nk-model') > -1) {
            //             // model is at one line, so process here
            //             result.push(processModel(code));
            //         } else {
            //             if (code.indexOf('<nk-template') > -1) {
            //                 result = renderTemplate(code, result);
            //             } 
            if (checkForSimpleTags(code)) {

            } else {
                if (code.indexOf('<nk-if') > -1) {
                    // condition ....
                    var condition = getProperty(code);
                    if (keyValueModel[condition].toLowerCase() === 'true') {
                        isTagOpened = true;
                        continue;
                    } else {
                        processFalseIf(code);
                        isTagOpened = false;
                    }

                } else {
                    if (code.indexOf('<nk-repeat') > -1) {
                        loopTitle = getProperty(code),
                        loopItem = loopTitle.substring(0, loopTitle.indexOf(' ')),
                        loopProperty = loopTitle.substr(loopTitle.lastIndexOf(' ') + 1),
                        loopInObject = keyValueModel[loopProperty];

                        //console.log(loopItem)

                        isTagOpened = true;
                        isLoopOpened = true;
                        //result.push(code);
                        //result.push('stef')
                    }
                }
            }
            //         }
            //     }
            // }
        } else {
            if (code.indexOf('<!DOCTYPE') > -1) {
                isHTMLstarted = true;
                result.push(code);
            } else {
                getTemplates(code);
            }
        }
    }

    // console.log(result.join(''));
    for (var c = 0; c < result.length; c++) {
        console.log(result[c]);
    };


    function readModelData() {
        var keyValueModel = {};
        for (var i = 0; i < n; i++) {
            var pairs = args[i + 1].split('-');
            if (pairs[1].indexOf(';') > -1) {
                keyValueModel[pairs[0]] = pairs[1].split(';');
            } else {
                keyValueModel[pairs[0]] = pairs[1];
            }
        }
        return keyValueModel;
    }

    function getTemplates(code) {
        if (!isTemplateStarted) {
            if (code.indexOf('<nk-template') > -1) {
                isTemplateStarted = true;
                // get the template name
                templateName = getProperty(code);
            }

        } else {
            if (code.indexOf('</nk-template') > -1) {
                // template end
                templates[templateName] = templateCode;
                isTemplateStarted = false;
                // empty the template code array because the template close tag has been reached and we need the code array empty for the next template
                templateCode = [];
            } else {
                //push template line to the template array
                templateCode.push(code);
            }
        }
    }

    function checkForSimpleTags(code) {
        //console.log('---->>>' + code)
        //if not in opened NikoAng. tag and there is no tag in the current line => just add it to the result
        if (code.indexOf('<nk-') === -1) {
            result.push(code);
        } else {
            // check for tags that should be escaped
            if (isEcapedTag(code)) {
                result.push(code.replace('{{', '').replace('}}', ''));
            } else {
                // check which is the tag
                if (code.indexOf('<nk-model') > -1) {
                    // model is at one line, so process here
                    result.push(processModel(code));
                } else {
                    if (code.indexOf('<nk-template') > -1) {
                        result = renderTemplate(code, result);
                    } else {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function isEcapedTag(code) {
        var escapeOpenIndex = code.indexOf('{{<nk-'),
            escapeCloseindex = code.indexOf('>}}');
        return (escapeOpenIndex > -1 && escapeCloseindex > -1);
    }

    function getProperty(code) {
        return code.substring(code.indexOf('"') + 1, code.lastIndexOf('"'));
    }

    function processModel(code) {
        var startTagIndex = code.indexOf('<nk-model'),
            endTagIndex = code.indexOf('</nk-model>'),
            key = code.substring(startTagIndex + 10, endTagIndex);

        if (keyValueModel.hasOwnProperty(key)) {
            code = code.replace(key, keyValueModel[key]);
            // remove model tags
            code = code.replace('<nk-model>', '').replace('</nk-model>', '');
        }

        return code;
    }

    function renderTemplate(code, result) {
        // template render
        templateName = getProperty(code);
        // get tag complete code...
        var codeToReplace = code.substring(code.indexOf('<nk-template'), code.indexOf('/>') + 2);
        //loop through all the rows of the template and add each row
        for (var i = 0; i < templates[templateName].length; i++) {
            result.push(templates[templateName][i]);
        };
        return result;
    }

    function processFalseIf(code) {
        // loop till the closing nk-if tag becasue these lines will not be displayed
        do {
            line++;
            code = args[n + 2 + line];
        }
        while (code.indexOf('</nk-if>') === -1);
    }

    function processLoopUnit(content, item, value) {
        for (var line = 0; line < content.length; line++) {
            var specialModel = '<nk-model>' + item + '</nk-model>';
            if (content[line].indexOf(specialModel) > -1) {
                result.push(content[line].replace(specialModel, value));
            } else {
                checkForSimpleTags(content[line])
            }
        }
    }
}

var input = [6,
    'title-Telerik Academy',
    'showSubtitle-true',
    'subTitle-Free training',
    'showMarks-false',
    'marks-3;4;5;6',
    'students-Ivan;Gosho;Pesho',
    42,
    '<nk-template name="menu">',
    '    <ul id="menu">',
    '        <li>Home</li>',
    '        <li>About us</li>',
    '    </ul>',
    '</nk-template>',
    '<nk-template name="footer">',
    '    <footer>',
    '        Copyright Telerik Academy 2014',
    '    </footer>',
    '</nk-template>',
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '    <title>Telerik Academy</title>',
    '</head>',
    '<body>',
    '    <nk-template render="menu" />',
    '',
    '    <h1><nk-model>title</nk-model></h1>',
    '    <nk-if condition="showSubtitle">',
    '        <h2><nk-model>subTitle</nk-model></h2>',
    '        <div>{{<nk-model>subTitle</nk-model>}} ;)</div>',
    '    </nk-if>',
    '',
    '    <ul>',
    '        <nk-repeat for="student in students">',
    '            <li>',
    '                <nk-model>student</nk-model>',
    '            </li>',
    '            <li>Multiline <nk-model>title</nk-model></li>',
    '        </nk-repeat>',
    '    </ul>',
    '    <nk-if condition="showMarks">',
    '        <div>',
    '            <nk-model>marks</nk-model>',
    '        </div>',
    '    </nk-if>',
    '',
    '    <nk-template render="footer" />',
    '</body>',
    '</html>'





]


solve(input)