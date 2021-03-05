function playAudio3(id_number) {
    var button = document.getElementById('playbut_' + id_number);
    button.style.background = "url('https://www.scales-chords.com/images/snd-mute-green-2.png') no-repeat";
    button.style.backgroundSize = "100%"; var music = document.getElementById('music' + id_number); 
    music.play();
}

function audioStop(id_number) {
    var button = document.getElementById('playbut_' + id_number);
    button.style.background = "url('https://www.scales-chords.com/images/snd-play-green-2.png') no-repeat";
    button.style.backgroundSize = "100%";
}

function scales_chords_api_onload() {
    var api_url = "https://www.scales-chords.com/api/scapi.1.3.php";
    if (typeof api_override_url !== 'undefined') {
        var api_url = api_override_url;
    }
    if (typeof scales_chords_api_debug === 'undefined') {
        var scales_chords_api_debug = false;
    }
    var x = document.getElementsByClassName("scales_chords_api");
    var obj_id_count = 1;
    if (scales_chords_api_debug)
        console.log(x);
    for (var i = 0; i < x.length; i++) {
        var params = "";
        var first = true;
        var obj = x[i];
        obj.id = "scapiobjid" + obj_id_count;
        obj_id_count += 1;
        var att = x[i].attributes;
        if (scales_chords_api_debug)
            console.log(x[i]);
        if (scales_chords_api_debug)
            console.log(att);
        if (scales_chords_api_debug)
            console.log(att.length);
        for (j = 0; j < att.length; j++) {
            if (scales_chords_api_debug)
                console.log(att[j]);
            if (scales_chords_api_debug)
                console.log("name: " + att[j].nodeName + " value: " + att[j].nodeValue);
            if (!first) params += "&"; else params = "id=" + obj.id + "&";
            first = false;
            params += encodeURI(att[j].nodeName) + "=" + encodeURI(att[j].nodeValue);
        }
        if (scales_chords_api_debug) alert(params);
        ajaxCall(api_url, params, function (xmlhttp) {
            var myString = xmlhttp.responseText;
            var myStringArray = myString.split("###RAWR###");
            var objid = myStringArray[0]; if (scales_chords_api_debug) {
                document.getElementById(objid).innerHTML = "<!--" + mystring + "-->";
                if (myStringArray[2].length > 0) document.getElementById(objid).innerHTML += myStringArray[2];
            } else {
                if (myStringArray[2].length > 0)
                    document.getElementById(objid).innerHTML = myStringArray[2];
            }
        });
    }
}
function scales_chords_api_refresh(customId) {
    var api_url = "https://www.scales-chords.com/api/scapi.1.3.php";
    if (typeof api_override_url !== 'undefined') {
        var api_url = api_override_url;
    }
    if (typeof scales_chords_api_debug === 'undefined') {
        var scales_chords_api_debug = false;
    }
    var x = document.getElementsByClassName("scales_chords_api");
    var obj_id_count = 1;
    if (scales_chords_api_debug) console.log(x);
    for (var i = 0; i < x.length; i++) {
        var params = ""; var first = true; var obj = x[i];
        obj.id = "scapiobjid" + obj_id_count; obj_id_count += 1;
        var att = x[i].attributes;
        if (scales_chords_api_debug)
            console.log(x[i]);
        if (scales_chords_api_debug)
            console.log(att);
        if (scales_chords_api_debug)
            console.log(att.length);
        var customIdMatches = false;
        for (j = 0; j < att.length; j++) {
            if (att[j].nodeName == "customid" && att[j].nodeValue == customId) {
                customIdMatches = true;
            }
            if (scales_chords_api_debug)
                console.log(att[j]);
            if (scales_chords_api_debug)
                console.log("name: " + att[j].nodeName + " value: " + att[j].nodeValue);
            if (!first) params += "&";
            else params = "id=" + obj.id + "&";
            first = false; params += encodeURI(att[j].nodeName) + "=" + encodeURI(att[j].nodeValue);
        }
        if (scales_chords_api_debug) alert(params);
        if (customIdMatches) {
            ajaxCall(api_url, params, function (xmlhttp) {
                var myString = xmlhttp.responseText; 
                var myStringArray = myString.split("###RAWR###"); var objid = myStringArray[0];
                if (scales_chords_api_debug) {
                    document.getElementById(objid).innerHTML = "<!--" + mystring + "-->";
                    if (myStringArray[2].length > 0) document.getElementById(objid).innerHTML += myStringArray[2];
                } else {
                    if (myStringArray[2].length > 0)
                        document.getElementById(objid).innerHTML = myStringArray[2];
                }
            });
        }
    }
}
if (window.addEventListener) {
    window.addEventListener('load', scales_chords_api_onload, false);
} else {
    window.attachEvent('onload', scales_chords_api_onload);
}
function ajaxCall(url, params, successCallback, failCallback, ongoingCallback, cfg) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (successCallback) {
                    successCallback(xhr);
                }
            } else {
                if (failCallback) {
                    failCallback(xhr);
                }
            }
        } else {
            if (ongoingCallback) {
                ongoingCallback(xhr);
            }
        }
    };
    var paramString = "";
    if (typeof params === "string")
        paramString = params;
    else
        if (params && typeof params === "object") {
            for (var p in params) {
                var pValue = params[p]; if (typeof pValue === "string")
                    pValue = encodeURIComponent(pValue); paramString += "&" + p + "=" + pValue;
            }
            if (paramString.length > 0)
                paramString = paramString.substring(1);
        }
    xhr.open("POST", url, true); if (cfg) {
        if (cfg.options) {
            for (var o in cfg.options) {
                if (o in xhr)
                    xhr[o] = cfg.options[o];
            }
        }
        if (cfg.headers) {
            for (var h in cfg.headers) {
                xhr.setRequestHeader(h, cfg.headers[h]);
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); xhr.send(paramString);
}