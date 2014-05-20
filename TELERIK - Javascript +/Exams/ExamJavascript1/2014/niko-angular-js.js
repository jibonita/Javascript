function solve(args) {
    var result = [];
    var n = args[0] | 0,
        keyValueModel = {};

    for (var i = 0; i < n; i++) {
        var pairs = args[i + 1].split('-');
        if (pairs[1].indexOf(';') > -1) {
            keyValueModel[pairs[0]] = pairs[1].split(';');
        } else {
            keyValueModel[pairs[0]] = pairs[1];
        }
    }

    var viewLinesCount = args[n + 1] | 0,
        code = '',
        isHTMLstarted = false,
        isTemplateStarted = false,
        templateName = '',
        templateCode = [],
        templates = {},
        isTagOpened = false;

    for (var line = 0; line < viewLinesCount; line++) {
        code = args[n + 2 + line];

        if (isHTMLstarted) {
            // parse
            if (isTagOpened) {
                //check for closing tag ....
                if (code.indexOf('</nk-if>') > -1) {
                    isTagOpened = false;
                    continue;
                }
            }

            // if not in opened NikoAng. tag and there is no tag in the current line => just add it to the result
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
                            renderTemplate(code);
                        } else {
                            if (code.indexOf('<nk-if')) {
                                // condition ....
                                var condition = getProperty(code);
                                if (keyValueModel[condition].toLowerCase() === 'true') {
                                    isTagOpened = true;
                                    continue;
                                } else {
                                    // loop till the closing nk-if tag becasue these lines will not be displayed
                                    do {
                                        line++;
                                        code = args[n + 2 + line];
                                    }
                                    while (code.indexOf('</nk-if>') === -1);
                                    isTagOpened = false;
                                }

                            } else {
                                if (code.indexOf('<nk-repeat')) {
                                    // loop =...

                                    isTagOpened = false; //temp
                                    result.push(code);

                                };
                            }
                        }
                    }
                }
            }



        } else {
            if (code.indexOf('<!DOCTYPE') > -1) {
                isHTMLstarted = true;
                result.push(code);
            } else {
                getTemplates(code);
            }
        }
    }

    //console.log(templates)

    //console.log(result);
    for (var c = 0; c < result.length; c++) {
        console.log(result[c]);
    };

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

        code = code.replace(key, keyValueModel[key]);
        // remove model tags
        code = code.replace('<nk-model>', '').replace('</nk-model>', '');

        return code;
    }

    function renderTemplate(code) {
        // template render
        templateName = getProperty(code);
        // get tag complete code...
        var codeToReplace = code.substring(code.indexOf('<nk-template'), code.indexOf('/>') + 2);
        //loop through all the rows of the template and add each row
        for (var i = 0; i < templates[templateName].length; i++) {
            result.push(templates[templateName][i]);
        };
    }
}

var input = [6,
    'title-Telerik Academy',
    'showSubtitle-true',
    'subTitle-Free training',
    'showMarks-false',
    'marks-3;4;5;6',
    'students-Ivan;Gosho;Pesho',
    24,
    '<nk-template name="menu">',
    '    <ul id="menu">',
    '        <li>Home</li>',
    '        <li>About us</li>',
    '    </ul>',
    '</nk-template>',
    '<nk-template name="footer">',
    '    <footer>',
    '        Copyright Telerik Academy 2014',
    '   </footer>',
    '</nk-template>',
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '    <title>Telerik Academy</title>',
    '</head>',
    '<body>',
    '<nk-template render="menu" />',
    '',
    '    <h1><nk-model>title</nk-model></h1>',
    '    <nk-if condition="showSubtitle">',
    '        <h2><nk-model>subTitle</nk-model></h2>',
    '        <div>{{<nk-model>subTitle</nk-model>}} ;)</div>',
    '    </nk-if>',




]

input = [6,
    'title-Telerik Academy',
    'showSubtitle-true',
    'subTitle-Free training',
    'showMarks-false',
    'marks-3;4;5;6',
    'students-Ivan;Gosho;Pesho',
    20,
    '<nk-template name="menu">',
    '    <ul id="menu">',
    '        <li>Home</li>',
    '        <li>About us</li>',
    '    </ul>',
    '</nk-template>',
    '<nk-template name="footer">',
    '    <footer>',
    '        Copyright Telerik Academy 2014',
    '   </footer>',
    '</nk-template>',
    '<!DOCTYPE html>',
    '<nk-template render="menu" />',
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




]
solve(input)