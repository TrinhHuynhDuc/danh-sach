window.onload = function(){
    innitFunction();
    loadData();
}
//số item đc checked
let numItemChecked = 0;
//mảng validate form thêm 
var validateFormThem = [];
// inport file thông báo lỗi, đang bị lỗi import nên khai báo tạm luôn ở đây
//import {err1} from "../resource/error.js";
const err = {
    VI: {
        1: "Tên danh hiệu thi đua không được để trống",
        2: "Mã danh hiệu thi đua không được để trống",
        3: "Đối tượng khen thưởng không được để trống",
        4: "Loại phong trào áp dụng không được để trống"
    },
    EN: {
        1: "The title of the competition title cannot be left blank",
        2: "Competition title code cannot be left blank",
        3: "Reward object cannot be empty",
        4: "Applicable movement type cannot be left blank"
    }
}
var data = [
    {
        num:1,
        name: "Lao động tiên tiến",
        code: "DH001",
        object: "Học sinh",
        level: "Huyện/xã",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:2,
        name: "Chiến sĩ thi đua cơ sở",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:3,
        name: "Danh hiệu A",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:4,
        name: "Danh hiệu B",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:5,
        name: "Danh hiệu C",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:6,
        name: "Danh hiệu D",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:7,
        name: "Danh hiệu E",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:8,
        name: "Danh hiệu F",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:9,
        name: "Danh hiệu G",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:10,
        name: "Danh hiệu H",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    },
    {
        num:11,
        name: "Danh hiệu I",
        code: "DH001",
        object: "Học sinh",
        level: "Trường",
        type: "Học tập",
        state: "Đang hoạt động"
    }
];
  
//khai báo ngôn ngữ
const lang = "VI";


/*
*hàm khởi tạo các sự kiện
*Trịnh Huỳnh Đức (17-3-2023)
*/
function innitFunction() {
    try{
        //------------------phần sự kiện lọc
        //click nut lọc
        document.getElementById("button-filter").addEventListener("click", function(){
            document.getElementById("popup-filter").style.display = "block";
        });
        //click đóng nút lọc
        document.getElementById("popup-filter__close").addEventListener("click", function(){
            document.getElementById("popup-filter").style.display = "none";
        });
        //click nút hủy lọc
        document.getElementById("popup__cancle").addEventListener("click", function(){
            document.getElementById("popup-filter").style.display = "none";
        });

        //--------------phần nút thêm
        //click nút thêm
        document.getElementById("button-add").addEventListener("click", function(){
            document.getElementById("popup-add").style.display = "block";//mở popup thêm
            document.querySelector('.overlay').style.display = "block";//mở lớp phủ lên
        })
        //click đóng popup thêm
        document.getElementById("popup-add__close").addEventListener("click", function(){
            document.getElementById("popup-add").style.display = "none";//đóng popup
            document.querySelector('.overlay').style.display = "none";//đóng lớp phủ
        })
        //click nút hủy popup thêm
        document.getElementById("popup-add-cancel").addEventListener("click", function(){
            document.getElementById("popup-add").style.display = "none";
            document.querySelector('.overlay').style.display = "none";//đóng lớp phủ
        })
        //click lưu và validate dữ liệu
        document.querySelector("#popup-add-save").addEventListener("click",clickSave);
        //click nút x đóng thông báo lỗi nhập liệu
        document.querySelector(".div-notify__exit i").addEventListener("click", function(){
            document.getElementById("notify-validate").style.display = "none";
        })
        //click nút đồng ý đóng thông báo lỗi nhập liệu
        document.getElementById("div-notify__ok").addEventListener("click", function(){
            document.getElementById("notify-validate").style.display = "none";
        })
        //sự kiện blur form thêm, mỗi input khi blur sẽ đc validate và hiện thông báo nếu chưa đúng
        document.getElementById("input-name").addEventListener("blur", onBlurInput);
        document.getElementById("input-code").addEventListener("blur", onBlurInput);
        let checkboxs =  document.querySelectorAll(".add__div2 input");//lấy các checkbox
        for (const check of checkboxs) {
            check.addEventListener("blur",function(){
                onBlurCheckBox(check);
            })
        }
        
        //-------------phần thao tác bảng
        //xử lý khi click item trong table, hiện menu các thao tác lên
        let checkBoxItems = document.querySelectorAll("tbody > tr input");
        for (const checkBox of checkBoxItems) {//với mỗi item trong bảng
            clickCheckBoxItem(checkBox);
        }
        //xử lý chọn/bỏ chọn tất cả
        document.querySelector("thead > tr input").addEventListener("change", function(){
            clickCheckBoxAll(this);
        });
        //click nút bỏ chọn
        document.getElementById("cancel-chose").addEventListener("click", clickCancelCheked)

        //------xử lý clik outside
        document.addEventListener('mousedown', function(event) {
            //click outside popup lọc
            var myElement = document.getElementById('popup-filter');
            if (!myElement.contains(event.target)) {
                // Phần tử được click không nằm trong phạm vi của popup
                myElement.style.display = "none";
            }
            //click out form thêm
            var myElement2 = document.getElementById('popup-add');
            var divErr = document.getElementById("notify-validate");//khối chứa lỗi khi validate form
            //check nếu click ngoài form và khôi báo lỗi không hiện lên
            if ((!myElement2.contains(event.target)) && (!divErr.contains(event.target))) {
                // Phần tử được click không nằm trong phạm vi của popup
                myElement2.style.display = "none";
                divErr.style.display = "none";
                document.querySelector('.overlay').style.display = "none";//đóng lớp phủ
            }
        });
        
    } catch (error) {

    }
}

/*
*hàm chọn mỗi item trong bảng
*Trịnh Huỳnh Đức (17-3-2023)
*/
function clickCheckBoxItem(checkBox){
    try {
        checkBox.addEventListener("change", function(){ 
            this.checked?numItemChecked++:numItemChecked--;
            document.querySelector("#table-menu b").innerHTML = numItemChecked;
            if(numItemChecked > 0)
                document.getElementById("table-menu").style.display = "flex";
            else
                document.getElementById("table-menu").style.display = "none";
        })
    } catch(err){
        console.log(err);
    }
}

/*
*hàm chọn tất cả item trong table
*Trịnh Huỳnh Đức (17-3-2023)
*/
function clickCheckBoxAll(checkedAll){
    try {
        //danh sách các item con
        var checkBoxItems = document.querySelectorAll("tbody > tr input");
        if(checkedAll.checked){//nếu click checked all
            for (const checkBox of checkBoxItems) {
                checkBox.checked = true;
            }
            //cập nhật lại số item checked
            numItemChecked = checkBoxItems.length;
            document.querySelector("#table-menu b").innerHTML = numItemChecked;
            //hiển thị thanh menu xử lý bảng
            document.getElementById("table-menu").style.display = "flex";
        }
        else{//nếu bỏ checked all
            for (const checkBox of checkBoxItems) {
                checkBox.checked = false;
            }
            //cập nhật lại số item checked
            numItemChecked = 0;
            //ẩn thanh menu xử lý bảng
            document.getElementById("table-menu").style.display = "none";
        }
    } catch(err){
        console.log(err);
    }
}

/*
*hàm bỏ chọn tất cả item trong bảng
*Trịnh Huỳnh Đức (17-3-2023)
*/
function clickCancelCheked(){
    try {
        var checkBoxItems = document.querySelectorAll("tbody > tr input");
        for (const checkBox of checkBoxItems) {//với mỗi item trong bảng
            checkBox.checked = false;
        }
        //bỏ chọn cả nút check all trong trường hợp đang chọn tất cả
        document.querySelector("thead > tr input").checked = false;
        //set số item chọn về 0 và ẩn thanh menu
        numItemChecked = 0;
        document.getElementById("table-menu").style.display = "none";
    } catch(err){
        console.log(err);
    } 
}

/*
*hàm khi click nút lưu và validate form
*Trịnh Huỳnh Đức (17-3-2023)
*/
function clickSave(){
    try {
        //ban đầu cho validateFormThem về rỗng
        validateFormThem = [];
        //lấy các phần tử input ra
        let name = document.getElementById("input-name");
        let code = document.getElementById("input-code");
        let checkbox1 = document.getElementById("add__checkbox1");
        let checkbox2 = document.getElementById("add__checkbox2");
        let checkbox3 = document.getElementById("add__checkbox3");
        let checkbox4 = document.getElementById("add__checkbox4");
        //kiem tra đã điền chưa
        if((name.value == "") || (name.value == null)){
            validateFormThem.push(err[lang][1]);
            name.nextElementSibling.style.display="block";
        }    
        if((code.value == "") || (code.value == null)){
            validateFormThem.push(err[lang][2]);
            code.nextElementSibling.style.display="block";
        }    
        //kiểm tra checkbox
        if((checkbox1.checked==false) && (checkbox2.checked==false)){
            validateFormThem.push(err[lang][3]);
            document.querySelector("#div-add__checkbox1 .err-null").style.display="block";
        }
        if((checkbox3.checked==false) && (checkbox4.checked==false)){
            validateFormThem.push(err[lang][4]);
            document.querySelector("#div-add__checkbox2 .err-null").style.display="block";
        }
        //kiểm tra nếu có lỗi điền form thì hiện thông báo lên
        if(validateFormThem.length > 0){
            //lấy các lỗi đưa vào thông báo
            var notify = document.getElementById("notify-validate");
            var divErr = document.getElementById("div-list-err");//khối chứa các li lỗi
            //cho khối chứa các lôic về rỗng
            divErr.innerHTML = "";
            for (const err of validateFormThem) {
                // Tạo một thẻ li mới
                var newLi = document.createElement("li");
                // Thêm nội dung vào thẻ li
                newLi.innerHTML = err;
                // Thêm thẻ span vào trong div
                divErr.appendChild(newLi);
            }
            notify.style.display = "block";
        }
    }
    catch(err) {
        console.log(err);
    }
}

/**khi blur input thì check input đã nhập chưa
 * THD-20-3
 */
function onBlurInput(){
    //kiem tra đã điền chưa
    if((this.value == "") || (this.value == null)){
        //lấy thẻ lỗi và hiển thị lên
        this.nextElementSibling.style.display="block";
        this.classList.add("err-input");
    }
    else{
        this.nextElementSibling.style.display="none";
        this.classList.remove("err-input");
    }  
}

/**
 * khi blur qua checkbox
 * @param {*} check 
 * THD-20-3
 */
function onBlurCheckBox(check){
    try{
        let checkbox1 = document.getElementById("add__checkbox1");
        let checkbox2 = document.getElementById("add__checkbox2");
        let checkbox3 = document.getElementById("add__checkbox3");
        let checkbox4 = document.getElementById("add__checkbox4");
        if(check.checked){//nếu đc checked
            if(check==checkbox1 || check==checkbox2)
            document.querySelector("#div-add__checkbox1 .err-null").style.display="none";
            else
            document.querySelector("#div-add__checkbox2 .err-null").style.display="none";
        }
        else{//nếu ko checked
            if((check==checkbox1) && (checkbox2.checked==false))
            document.querySelector("#div-add__checkbox1 .err-null").style.display="block";
            else if((check==checkbox2) && (checkbox1.checked==false))
            document.querySelector("#div-add__checkbox1 .err-null").style.display="block";
            else if((check==checkbox3) && (checkbox4.checked==false))
            document.querySelector("#div-add__checkbox2 .err-null").style.display="block";
            else if((check==checkbox4) && (checkbox3.checked==false))
            document.querySelector("#div-add__checkbox2 .err-null").style.display="block";
        }
    } catch(err){
        console.log(err);
    }
}
/*
*hàm load data
*Trịnh Huỳnh Đức (17-3-2023)
*/
function loadData() {
   
    //lấy data từ api (hiện tại dang dùng fake data)
    try {
        //gọi api
        // // Tạo đối tượng http
        // var xhttp = new XMLHttpRequest();
        // // Đặt phương thức và URL cho yêu cầu
        // xhttp.open("GET", "https://apidemo.laptrinhweb.edu.vn/api/v1/Departments", true);
        // // Xử lý phản hồi từ server
        // xhttp.onload = function() {
        // if (this.readyState == 4 && this.status == 200) {
        //     var data = JSON.parse(this.responseText);
        //     // xử lý dữ liệu trả về
        //     console.log(data);
        // }
        // };
        // // Gửi yêu cầu đến server
        // xhttp.send();

        //đọc dl và hiển thị
        console.log(data);
        let body = document.querySelector("table tbody");
        for (const row of data) {
            let tr = createRowTable(row);
            body.appendChild(tr);
        }
        //xử lý lỗi nếu có
    } catch(err) {
        console.log(err);
    }

    //lấy số lượng bản ghi để hiển thị lên màn hình
    var checkBoxItems = document.querySelectorAll("tbody > tr input");
    document.getElementById("num-record").innerHTML = checkBoxItems.length;
    document.getElementById("num-record1").innerHTML = checkBoxItems.length;
    //gọi lại hàm khởi taoj sự kiện
    innitFunction();
}

/**
 * hàm tạo một thẻ tr, dựa vào 1 phần tử object
 * @param {*} row 
 * @returns tr
 */
function createRowTable(row){
    try {
        //tạo các thẻ tr, lấy ds thẻ th
        let tr = document.createElement("tr"); 
        const ths = document.querySelectorAll("thead td");
        for (const th of ths) {
            let modal = th.getAttribute("modal-name");
            let td = document.createElement("td");
            if(modal == "num"){
                //tạo thẻ input
                let inputCheck = document.createElement("input");
                inputCheck.setAttribute("type", "checkbox");
                td.appendChild(inputCheck);
            }
            else if(modal == "state"){
                let divState = document.createElement("div");
                divState.classList.add("trang__thai");
                td.append(divState)
                td.innerHTML += row[modal];
            }
            else{
                td.innerHTML = row[modal];
            }
            tr.append(td);
        }
        return tr;
    } catch(err) {
        console.log(err);
    }
}