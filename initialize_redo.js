//  When the document is ready
$(document).ready(function() {
    //  Add a release row
    releases.forEach(function(release, index) {
        var points = getPoints(release);
        var pointsDisplay = (points > 0) ? `+${points}` : points;
        // Add columns
        $(".releases tbody").append(
            `<tr>
                <td class="ratings">${release.ratingCount}</td>
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
        //  Positive rows should have a class for that
        if (points > 0) {
            $(".releases tr:last-child").addClass("positive");
        }
        //  Negative rows should have a class for that
        else if (points < 0) {
            $(".releases tr:last-child").addClass("negative");
        }
    });

    $("th.points").each(function(col) {
        $(this).hover(
        function() { $(this).addClass('focus'); },
        function() { $(this).removeClass('focus'); }
        );
        $(this).click(function() {
            if ($(this).is('.desc')) {
                $(this).removeClass('desc');
                $(this).addClass('asc selected');
                sortOrder = 1;
            }
            else {
                $(this).addClass('desc selected');
                $(this).removeClass('asc');
                sortOrder = -1;
            }
            $(this).siblings().removeClass('asc selected');
            $(this).siblings().removeClass('desc selected');
            var arrData = $('table').find('tbody > tr').get();
            arrData.sort(function(a, b) {
                var ratingCount1 = $(a).children('td').eq(0).text().toUpperCase();
                var ratingCount2 = $(b).children('td').eq(0).text().toUpperCase();
                
                var avgRating1 = $(a).children('td').eq(6).text().toUpperCase();
                var avgRating2 = $(b).children('td').eq(6).text().toUpperCase();

                if ($.isNumeric(avgRating1) && $.isNumeric(avgRating2) && avgRating1 != avgRating2) {
                    return sortOrder == 1 ? avgRating1-avgRating2 : avgRating2-avgRating1;
                } else if ($.isNumeric(ratingCount1) && $.isNumeric(ratingCount2) && ratingCount1 != ratingCount2) {
                    return sortOrder == 1 ? ratingCount1-ratingCount2 : ratingCount2-ratingCount1;
                }
                
                return 0;
            });

            $.each(arrData, function(index, row) {
                $('tbody').append(row);
            });
        });
    });
});