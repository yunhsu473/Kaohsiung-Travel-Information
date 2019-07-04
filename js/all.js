(function () {
    var xhr = new XMLHttpRequest();
    xhr.open(
        'get',
        'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',
        true
    );
    xhr.send(null);
    xhr.onload = function () {
        var loader = document.querySelector('.loader');
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('成功讀取資料');
            xhrData();
        } else {
            loader.style.display = 'block';
            console.log('資料錯誤!!');
        }
    };

    function xhrData() {
        var dataStr = JSON.parse(xhr.responseText);
        var data = dataStr.result.records;

        // var btnZone = document.querySelector('.hot-zone');
        // var infoContent = document.querySelector('.info');
        // var zoneTitleName = document.querySelector('.zone-name');
        // var pagination = document.querySelector('.pagination');
        // var pageNumber = document.querySelector('#pageNum');
        // var selection = document.querySelector('#zone');

        // var selectList = [];
        // for (var i = 0; i < data.length; i++) {
        //     var selectZone = data[i].Zone;
        //     selectList.push(selectZone);
        // }


        //DOM
        const selectDistrict = document.querySelector('#selectDistrict');
        const content = document.querySelector('.content');
        const btns = document.querySelectorAll('.btn');
        const showSpot = document.querySelector('.showSpot');
        const dataLen = data.length;

        //監聽
        selectDistrict.addEventListener('change', updateList);

        //把需要的值抓出來
        let district = [];
        for (let i = 0; i < dataLen; i++) {
            district.push(data[i].Zone);
        }

        //挑掉重複的
        //.filter為過濾並且回傳新的array
        let result = district.filter((element, index, array) => {
            return array.indexOf(element) === index;
        })
        console.log(result);

        //將選項帶入select選單裡
        for (let i = 0; i < result.length; i++) {
            const opt = document.createElement('option');
            opt.textContent = result[i];
            selectDistrict.appendChild(opt);
        }

        //熱門地區
        btns.forEach(btn => btn.addEventListener('click', updateList));

        //渲染畫面
        function updateList(e) {
            const selectZone = e.target.value;
            let str = '';
            for (let i = 0; i < data.length; i++) {
                if (selectZone == data[i].Zone) {
                    str += `<div class="card"> 
                <div class = "cardTopImg" style = "background-image: url('${data[i].Picture1}')">
                <p class = "spotName" > ${data[i].Name} </p> 
                <p class = "spotZone" > ${data[i].Zone} </p>
                </div>
                <div class = "cardInfor" >
                <p> <i class="fas fa-clock" style = "color: #8A82CC" > </i>    ${data[i].Opentime}</p>
                <p> <i class="fas fa-map-marker-alt" style = "color: #F5A623"> </i>    ${data[i].Add}</p>
                <p> <i class = "fas fa-mobile-alt" style = "color: #559AC8"> </i>    ${data[i].Tel}</p>
                <p style = "float: right"> <i class = "fas fa-tag" style = "color: #F5D005"> </i>    ${data[i].Ticketinfo}</p>
                </div></div>`;
                }
            }
            content.innerHTML = str;
            showSpot.innerHTML = selectZone;
        }
    }
})();

// //DOM
// const selectDistrict = document.querySelector('#selectDistrict');
// const content = document.querySelector('.content');
// const btns = document.querySelectorAll('.btn');
// const showSpot = document.querySelector('.showSpot');
// const dataLen = data.length;

// //監聽
// selectDistrict.addEventListener('change', updateList);

// //把需要的值抓出來
// let district = [];
// for (let i = 0; i < dataLen; i++) {
//     district.push(data[i].Zone);
// }

// //挑掉重複的
// //.filter為過濾並且回傳新的array
// let result = district.filter((element, index, array) => {
//     return array.indexOf(element) === index;
// })
// console.log(result);

// //將選項帶入select選單裡
// for (let i = 0; i < result.length; i++) {
//     const opt = document.createElement('option');
//     opt.textContent = result[i];
//     selectDistrict.appendChild(opt);
// }

// //熱門地區
// btns.forEach(btn => btn.addEventListener('click', updateList));

// //渲染畫面
// function updateList(e) {
//     const selectZone = e.target.value;
//     let str = '';
//     for (let i = 0; i < data.length; i++) {
//         if (selectZone == data[i].Zone) {
//             str += `<div class="card"> 
//                 <div class = "cardTopImg" style = "background-image: url('${data[i].Picture1}')">
//                 <p class = "spotName" > ${data[i].Name} </p> 
//                 <p class = "spotZone" > ${data[i].Zone} </p>
//                 </div>
//                 <div class = "cardInfor" >
//                 <p> <i class="fas fa-clock" style = "color: #8A82CC" > </i>    ${data[i].Opentime}</p>
//                 <p> <i class="fas fa-map-marker-alt" style = "color: #F5A623"> </i>    ${data[i].Add}</p>
//                 <p> <i class = "fas fa-mobile-alt" style = "color: #559AC8"> </i>    ${data[i].Tel}</p>
//                 <p style = "float: right"> <i class = "fas fa-tag" style = "color: #F5D005"> </i>    ${data[i].Ticketinfo}</p>
//                 </div></div>`;
//         }
//     }
//     content.innerHTML = str;
//     showSpot.innerHTML = selectZone;
// }