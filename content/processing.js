
flexFont = function () {
    var divs = document.getElementsByClassName("flexFont");
    for(var i = 0; i < divs.length; i++) {
        var relFontsize
        if (!isNaN(parseFloat(divs[i].style.fontSize))) {
            relFontsize = 2*(divs[i].offsetWidth-15)/(divs[i].getElementsByTagName('span')[0].offsetWidth*2/parseFloat(divs[i].style.fontSize)); //to make general, replace 2 with divs[i].DEFAULTFONTHEIGHTASDEFINEDINSTYLESHEET
        } else {
            relFontsize = 2*(divs[i].offsetWidth-15)/(divs[i].getElementsByTagName('span')[0].offsetWidth);
        }
        if (relFontsize < 2) {
            divs[i].style.fontSize = relFontsize+'em';
        } else {
            divs[i].style.fontSize = '2em';
        }
        //var relFontsize = divs[i].offsetWidth*2/558; //2/558
        //divs[i].style.fontSize = relFontsize+'em';
    }
};
window.onload = function(event) {
    flexFont();
};
window.onresize = function(event) {
    flexFont();
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getval(path, callback ) {
    $.getJSON(path)
	.done(function(data) {
		callback(data);
	});
}
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function setUrlParameter(url, key, value) {
        var baseUrl = url.split('?')[0],
        urlQueryString = url.split('?').length > 1 ? '?' + url.split('?')[1] : null,
        newParam = key + '=' + value,
        params = value == null ? '' : '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
        var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

        if (typeof value === 'undefined' || value === null || value === '') { // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace(/[&;]$/, "");

        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);

        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }

    // no parameter was set so we don't need the question mark
    params = params === '?' ? '' : params;

    return baseUrl + params;
}
