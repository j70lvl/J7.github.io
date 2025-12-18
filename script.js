const mobileBackground = "https://i.pinimg.com/1200x/52/59/20/5259200ee6099410f1492185bbe70c96.jpg";
const DesktopBackground = "https://i.pinimg.com/1200x/38/14/2b/38142b860fc5a796adc95fcb6f421d9a.jpg";
const body = document.body;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    body.style.background = "url(" + mobileBackground + ")";
}
else {
    body.style.background = "url(" + DesktopBackground + ")";
}
body.style.backgroundSize = "100%";

const standart = [
    // пн
    // вт
    // ср
    // чт
    // пт
    // сб
    [1, 2, 3],
    [],
    [],
    [],
    [],
    []
];

function row(tr) {
    newTable += "\n<tr>" + tr + "</tr>";
}
function cell(td) {
    "\n    <td>" + td + "</td>";
}

function copy() {
    const table = document.getElementById("full_table");
    
    html2canvas(table, { backgroundColor: '#ffffff', scale: 2})
    .then(function(canvas) {

        canvas.toBlob(function(blob) {
            navigator.clipboard.write([new ClipboardItem({
                'image/png': blob
            })]);
        });

    });

}

const subjects = [
    "английский",    // 210
    "биология",      // 306
    "география",     // 325
    "история",       // 214
    "информатика",   // 359
    "литература",    // 217
    "математика",    // 208
    "обж",           // 409
    "общество",      // 309
    "русский",       // 217
    "физика",        // 228
    "физра",         // зал
    "химия",         // 421
    "кл. час"
];

const rooms = [
    "210",    // английский
    "306",    // биология
    "325",    // география
    "214",    // история
    "359",    // информатика
    "217",    // литература
    "208",    // математика
    "409",    // обж
    "309",    // общество
    "217",    // русский
    "228",    // физика
    "зал",    // физра
    "421",    // химия
    "410/415"
];

numbers = ['1', '2', '3', '4', '5', '6', '7']

function rebuild(text) {
        let times = [
                "8:00 - 9:35",
                "9:45 - 11:20",
                "12:00 - 13:35",
                "13:45 - 15:20",
                "15:30 - 17:05",
                "17:15 - 18:50",
                "19:00 - 20:35",
        ];
            
    words = text.split(" ");

    let row_need, number, time, subject, room;
    let temp_table = "";
    let table = document.getElementById("table").innerHTML

    for (word of words) {
        if (word == '') continue;

        if (!isNaN(word)) {

            number = parseInt(word);

            // build row
            if (time != null && subject != null && number < 8) {
                temp_table += "<tr><td class='time'>" + (time ? time : "") + "<td class='subject'>" + (subject ? subject : "") + "</td>" + "<td class='room'>" + (subject ? (room ? room : rooms[subjects.indexOf(subject)]) : "")+ "</td></tr>";
                time = null; subject = null; room = null;
            }

            if (time == null) time = times[number - 1];
            else room = word
        }

        else {

            if (word == "сб") {
                subject = null;
                times = [
                    "8:00 - 9:35",
                    "9:45 - 11:20",
                    "11:30 - 13:05",
                    "13:15 - 14:50",
                    "15:00 - 16:35",
                    "16:35 - 18:20"
                ];
            }
            else {
                if (!(word == "с")) {
                    subject = word;

                    for (_ of subjects) {
                        if (_.toLowerCase().startsWith(word)) {
                            subject = _; break;
                        }
                    };
                }   
            }   
        }
        
    }

    if (time) temp_table += "<tr><td class='time'>" + time + "<td class='subject'>" + (subject ? subject : "") + "</td>" + "<td class='room' style='border-left: 0.5px solid black'>" + (subject ? (room ? room : (rooms[subjects.indexOf(subject)] ? rooms[subjects.indexOf(subject)] : "")) : "")+ "</td></tr>";
    document.getElementById("table").innerHTML = temp_table;
}