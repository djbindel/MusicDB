function getThreshold(releases) {
    //Get unique array of years
    var years = [];
    releases.forEach(function(release, index) {
        if (years.indexOf(release.year) == -1) {
            years.push(release.year);
        }
    });

    //For each year, find highest rating
    var highestPerYear = [];
    years.forEach(function (year) {

        var releasesForYear = releases.filter(function (release, index) {
            return release.year == year;
        });

        var sortedPerYear = releasesForYear.sort(function (r1, r2) {
            return r1.avgRating - r2.avgRating;
        });

        var topRelease = sortedPerYear[sortedPerYear.length - 1];

        highestPerYear.push(topRelease.avgRating);
    });

    //take lowest rating of highest of-year ratings
    return highestPerYear.sort()[0];
}

function getPoints(release, releases) {
    var threshold = getThreshold(releases) - 0.005;
    var pointsRaw = (release.avgRating - threshold) * 100;
    if (pointsRaw > 0) {
        return Math.ceil(pointsRaw);
    }
    else {
        return Math.floor(pointsRaw);
    }
}