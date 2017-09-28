$(document).ready(function() {
    releases.forEach(function(release, index) {
        var points = getPoints(release);
        var pointsDisplay = (points > 0) ? `+${points}` : points;

        $(".releases").append(
            `<tr>
                <td class="cover">
                    <img src="${release.imgUrl}" />
                </td>
                <td class="artist">${release.artist}</td>
                <td class="number">${release.number}</td>
                <td class="release">${release.release}</td>
                <td class="year">${release.year}</td>
                <td class="points">${pointsDisplay}</td>
            </tr>`
        );

        if (points > 0) {
            $(".releases tr:last-child").addClass("positive");
        }
        else if (points < 0) {
            $(".releases tr:last-child").addClass("negative");
        }
    });
});