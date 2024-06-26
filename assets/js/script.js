$(document).ready(function() {
    //Uploadfile
    $('#uploadBtn').click(function() {
        var fileInput = $('#fileInput')[0].files[0];
        if (fileInput) {
            var fileName = fileInput.name;
            var fileExtension = fileName.split('.').pop().toLowerCase();
            if (fileExtension !== 'xls' && fileExtension !== 'xlsx') {
                alert('Vui lòng chọn một tệp Excel (.xls hoặc .xlsx)');
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, {
                    type: 'array'
                });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                var jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    raw: true
                });
                addStudentsToLocalStorage(jsonData);
                console.log(jsonData);
            };
            reader.readAsArrayBuffer(fileInput);
        } else {
            alert('Vui lòng chọn một file Excel');
        }
    });

    function addStudentsToLocalStorage(studentsData) {
        var students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.concat(studentsData);
        localStorage.setItem('students', JSON.stringify(students));
        $('#studentModal').hide();
        $('#overlay').hide();
        showSuccessToast("Thêm thành công!");
        displayStudents();
    }
    //Toast
    function showSuccessToast(message) {
        toast({
            title: "Thành công!",
            message: message,
            type: "success",
            duration: 5000
        });
    }

    function showErrorToast(messageerror) {
        toast({
            title: "Thất bại!",
            message: messageerror,
            type: "error",
            duration: 5000
        });
    }

    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = $("#toast");
        if (main.length) {
            const toast = $("<div>");

            // Auto remove toast
            const autoRemoveId = setTimeout(function() {
                main.empty();
            }, duration + 1000);

            // Remove toast when clicked
            toast.on("click", ".toast__close", function(e) {
                e.preventDefault();
                clearTimeout(autoRemoveId);
                main.empty();
            });

            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.addClass("toast").addClass(`toast--${type}`);
            toast.css("animation", `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`);

            toast.html(`
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
          `);
            main.append(toast);
        }
    }
    var sampleStudents = [{
            studentId: 1,
            name: "Nguyễn Văn A",
            dob: "12/04/2024",
            gender: "Nam",
            courses: "Công nghệ thông tin",
            address: "123 Đường ABC, Quận XYZ, Thành phố HCM",
            phone: "0964644897",
            cmnd: "001202001003",
            consultant: "Nguyễn Huy Hoàng",
            hignschool: "THPT Phú Xuyên A",
            email: "hoangutc2002@gmail.com",
            lop: "CNTT2",
            khoanam: "2020-2024",
            sothich: "",
            hocbong: "",
            chungchi: "",
            clb: "Câu lạc bộ truyền thông"
        },
        {
            studentId: 2,
            name: "Trần Thị B",
            dob: "12/04/2024",
            gender: "Nam",
            courses: "Công nghệ thông tin",
            address: "456 Đường XYZ, Quận ABC, Thành phố Hà Nội",
            phone: "0964644897",
            cmnd: "001202001004",
            consultant: "Nguyễn Huy Hoàng",
            hignschool: "THPT Phú Xuyên A",
            email: "hoangutc2002@gmail.com",
            lop: "CNTT2",
            khoanam: "2020-2024",
            sothich: "",
            hocbong: "",
            chungchi: "",
            clb: "Câu lạc bộ truyền thông"
        },
        {
            studentId: 3,
            name: "Lê Văn C",
            dob: "12/04/2024",
            gender: "Nữ",
            courses: "Xây dựng",
            address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
            phone: "0964644897",
            cmnd: "001202001005",
            consultant: "Nguyễn Huy Hoàng",
            hignschool: "THPT Phú Xuyên A",
            email: "hoangutc2002@gmail.com",
            lop: "CNTT2",
            khoanam: "2020-2024",
            sothich: "",
            hocbong: "",
            chungchi: "",
            clb: "Câu lạc bộ truyền thông"
        },
        {
            studentId: 4,
            name: "Nguyễn Huy Hoàng",
            dob: "12/04/2024",
            gender: "Nam",
            courses: "Kinh tế",
            address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
            phone: "0964644897",
            cmnd: "001202001006",
            consultant: "Nguyễn Huy Hoàng",
            hignschool: "THPT Phú Xuyên A",
            email: "hoangutc2002@gmail.com",
            lop: "CNTT2",
            khoanam: "2020-2024",
            sothich: "",
            hocbong: "",
            chungchi: "",
            clb: "Câu lạc bộ truyền thông"
        },
        {
            studentId: 5,
            name: "Lê Quang Việt",
            dob: "12/04/2024",
            gender: "Nữ",
            courses: "Xây dựng",
            address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
            phone: "0964644897",
            cmnd: "001202001007",
            consultant: "Nguyễn Huy Hoàng",
            hignschool: "THPT Phú Xuyên A",
            email: "hoangutc2002@gmail.com",
            lop: "CNTT2",
            khoanam: "2020-2024",
            sothich: "",
            hocbong: "",
            chungchi: "",
            clb: "Câu lạc bộ truyền thông"
        },
        {
            studentId: 6,
            name: "Tạ Quang Lợi",
            dob: "12/04/2024",
            gender: "Nữ",
            courses: "Xây dựng",
            address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
            phone: "0964644897",
            cmnd: "001202001008",
            consultant: "Nguyễn Huy Hoàng",
            hignschool: "THPT Phú Xuyên A",
            email: "hoangutc2002@gmail.com",
            lop: "CNTT2",
            khoanam: "2020-2024",
            sothich: "",
            hocbong: "",
            chungchi: "",
            clb: "Câu lạc bộ truyền thông"
        }
    ];

    // Lấy danh sách sinh viên từ localStorage (nếu có)
    var students = JSON.parse(localStorage.getItem('students')) || [];

    // Thêm dữ liệu mẫu vào danh sách sinh viên (nếu danh sách trống)
    if (students.length === 0) {
        students = sampleStudents;
        localStorage.setItem('students', JSON.stringify(students));
    }
    //Kiểm tra xem mã sinh viên đã tồn tại hay chưa
    function isStudentExist(studentId) {
        var students = JSON.parse(localStorage.getItem('students')) || [];
        for (var i = 0; i < students.length; i++) {
            if (students[i].studentId === studentId) {
                return true;
            }
        }
        return false;
    }
    //Kiểm tra form xem người dùng đã nhập đủ dữ liệu
    function validateForm() {
        var isValid = true;

        // Xóa thông báo trước đó
        $('.error-message').remove();

        // Kiểm tra mã sinh viên
        var studentId = $('#studentId').val();
        if (studentId == '') {
            isValid = false;
            $('#studentId').parent().after('<div class="text-danger error-message">Vui lòng nhập mã sinh viên</div>');
        }

        // Kiểm tra tên
        var name = $('#name').val();
        if (name == '') {
            isValid = false;
            $('#name').parent().after('<div class="text-danger error-message">Vui lòng nhập họ và tên</div>');
        }

        // Kiểm tra ngày sinh
        var dob = $('#dob').val();
        if (dob == '') {
            isValid = false;
            $('#dob').parent().after('<div class="text-danger error-message">Vui lòng nhập ngày sinh</div>');
        }

        // Kiểm tra giới tính
        var gender = $('input[name="gender"]:checked').val();
        if (typeof gender === 'undefined') {
            isValid = false;
            $('#gender').after('<div class="text-danger error-message">Vui lòng chọn giới tính</div>');
        }

        // Kiểm tra khoa
        var courses = $('#courses').val();
        if (courses == '') {
            isValid = false;
            $('#courses').parent().after('<div class="text-danger error-message">Vui lòng chọn khoa</div>');
        }


        //Kiểm tra số điện thoại
        var phone = $('#phone').val();
        var phoneRegex = /^\d{10,11}$/;
        if (phone == '') {
            isValid = false;
            $('#phone').parent().after('<div class="text-danger error-message">Vui lòng nhập số điện thoại</div>');
        } else if (!phoneRegex.test(phone)) {
            isValid = false;
            $('#phone').parent().after('<div class="text-danger error-message">Vui lòng đúng định dạng số điện thoại</div>');
        }

        //Kiểm tra email
        var email = $('#email').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email == '') {
            isValid = false;
            $('#email').parent().after('<div class="text-danger error-message">Vui lòng nhập email</div>');
        } else if (!emailRegex.test(email)) {
            isValid = false;
            $('#email').parent().after('<div class="text-danger error-message">Vui lòng đúng định dạng email</div>');
        }
        //Kiểm tra CMND
        var cmnd = $('#cmnd').val();
        if (cmnd == '') {
            isValid = false;
            $('#cmnd').parent().after('<div class="text-danger error-message">Vui lòng nhập số cccd</div>');
        }
        //Kiểm tra cố vấn 
        var consultant = $('#consultant').val();
        if (consultant == '') {
            isValid = false;
            $('#consultant').parent().after('<div class="text-danger error-message">Vui lòng nhập cố vấn học tập</div>');
        }
        //Trường cấp 3
        var hignschool = $('#hignschool').val();
        if (hignschool == '') {
            isValid = false;
            $('#hignschool').parent().after('<div class="text-danger error-message">Vui lòng nhập trường cấp 3</div>');
        }
        //Lớp
        var lop = $('#classname').val();
        if (lop == '') {
            isValid = false;
            $('#classname').parent().after('<div class="text-danger error-message">Vui lòng nhập lớp</div>');
        }
        var khoanam = $('#khoa').val();
        if (khoanam == '') {
            isValid = false;
            $('#khoa').parent().after('<div class="text-danger error-message">Vui lòng chọn năm học</div>');
        }
        return isValid;
    }
    // Lưu thông tin sinh viên
    $('#saveBtn').click(function() {
        if (validateForm()) {
            var studentId = $('#studentId').val();
            var name = $('#name').val();
            var dob = $('#dob').val();
            var gender = $('input[name="gender"]:checked').val();
            var courses = $('#courses').val();
            var address = $('#address').val();
            var phone = $('#phone').val();
            var email = $('#email').val();
            var cmnd = $('#cmnd').val();
            var consultant = $('#consultant').val();
            var hignschool = $('#hignschool').val();
            var khoanam = $('#khoa').val();
            var lop = $('#classname').val();
            var clb = $('#clb').val();

            // Lặp qua tất cả các ô checkbox đã được chọn và lấy giá trị của chúng
            var chungchi = [];
            $('input[type=checkbox][name=chungchi]:checked').each(function() {
                chungchi.push($(this).val());
            });
            console.log("Checked values: ", chungchi);

            var sothich = [];
            $('input[type=checkbox][name=skill]:checked').each(function() {
                sothich.push($(this).val());
            });
            console.log("Checked values: ", sothich);

            var hocbong = [];
            $('input[type=checkbox][name=hocbong]:checked').each(function() {
                hocbong.push($(this).val());
            });
            console.log("Checked values: ", hocbong);
            // tạo đối tượng sinh viên
            var student = {
                studentId: studentId,
                name: name,
                dob: dob,
                gender: gender,
                courses: courses,
                address: address,
                phone: phone,
                email: email,
                cmnd: cmnd,
                consultant: consultant,
                hignschool: hignschool,
                khoanam: khoanam,
                lop: lop,
                clb: clb,
                chungchi: chungchi,
                sothich: sothich,
                hocbong: hocbong
            };
            console.log(student);

            // Lấy danh sách sinh viên
            var students = JSON.parse(localStorage.getItem('students')) || [];

            // Nếu sinh viên tồn tại, hãy cập nhật thông tin sinh viên; nếu không thì thêm học sinh mới

            if (isStudentExist(student.studentId) == true) {
                alert("Sinh viên đã tồn tại");
            } else {
                students.push(student);
            }
            // lưu sinh viên vào localStorage
            localStorage.setItem('students', JSON.stringify(students));

            // clear các trường trong form
            $('#studentForm')[0].reset();

            // hiển thị thôgn tin sinh viên
            displayStudents();

            // đóng modal
            $('#studentModal').hide();
            $('#overlay').hide();
            showSuccessToast("Thêm thành công!");
        }

    });

    // Function hiển thị tất cả các sinh viên
    function displayStudents() {
        // Clear list
        $('#studentList').empty();

        // Lấy ra các sinh viên
        var students = JSON.parse(localStorage.getItem('students')) || [];

        // Lặp lại từng học sinh và hiển thị nó trong danh sách
        var html = '';
        $.each(students, function(index, student) {

            html += '<tr class="">';
            html += '<td style="text-align: center;"><input type="checkbox" class="mobile-checkbox"></td>';
            html += '<td data-title="Mã sinh viên">' + student.studentId + '</td>';
            html += '<td data-title="Họ và tên">' + student.name + '</td>';
            html += '<td data-title="Ngày sinh">' + student.dob + '</td>';
            html += '<td data-title="Giới tính">' + student.gender + '</td>';
            html += '<td data-title="Khoa">' + student.courses + '</td>';
            html += '<td class="option">';
            html += '<button class="editBtn btn pd-xs mr-1" data-id="' + student.studentId + '"><i class="fa-solid fa-pen-to-square mr-1" style="color: #271756;"></i>Sửa</button>';
            html += '<button class="detailBtn btn pd-xs mr-1" data-id="' + student.studentId + '"><i class="fa-solid fa-eye fa-eye mr-1" style="color: #271756;"></i>Chi tiết</button>';
            html += '<button class="deleteBtn btn pd-xs" data-id="' + student.studentId + '"><i class="fa-sharp fa-solid fa-trash mr-1" style="color: #271756;"></i>Xóa</button>';
            html += '</td></tr>';
        });
        // Thêm chuỗi HTML vào DOM
        $('#studentList').append(html);
    }

    // Hiển thị sinh viên khi load page
    displayStudents();


    function FindStudent(studentId) {
        var students = JSON.parse(localStorage.getItem('students')) || [];
        for (let i = 0; i < students.length; i++) {
            if (students[i].studentId == studentId) {
                return students[i];
            }
        }
        return null;
    }
    // Function to edit student
    $(document).on('click', '.editBtn', function() {
        var studentId = $(this).data('id');
        var students = JSON.parse(localStorage.getItem('students'));
        var student = FindStudent(studentId);

        $('#studentId').val(student.studentId);
        $('#name').val(student.name);
        $('#dob').val(student.dob);
        $('input[name="gender"][value="' + student.gender + '"]').prop('checked', true);
        $('#courses').val(student.courses);
        $('#address').val(student.address);
        $('#phone').val(student.phone);
        $('#email').val(student.email);
        $('#cmnd').val(student.cmnd);
        $('#consultant').val(student.consultant);
        $('#hignschool').val(student.hignschool);
        $('#classname').val(student.lop);
        $('#khoa').val(student.khoanam);
        $('#clb').val(student.clb);

        $('input[type=checkbox][name=chungchi]').each(function() {
            var checkboxValue = $(this).val();
            // Kiểm tra xem giá trị của checkbox có tồn tại trong mảng dữ liệu không
            if (student.chungchi.includes(checkboxValue)) {
                // Nếu tồn tại, đặt thuộc tính checked của checkbox là true
                $(this).prop('checked', true);
            }
        });
        $('input[type=checkbox][name=skill]').each(function() {
            var checkboxValue = $(this).val();
            // Kiểm tra xem giá trị của checkbox có tồn tại trong mảng dữ liệu không
            if (student.sothich.includes(checkboxValue)) {
                // Nếu tồn tại, đặt thuộc tính checked của checkbox là true
                $(this).prop('checked', true);
            }
        });
        $('input[type=checkbox][name=hocbong]').each(function() {
            var checkboxValue = $(this).val();
            // Kiểm tra xem giá trị của checkbox có tồn tại trong mảng dữ liệu không
            if (student.hocbong.includes(checkboxValue)) {
                // Nếu tồn tại, đặt thuộc tính checked của checkbox là true
                $(this).prop('checked', true);
            }
        });
        $('#saveBtn').hide();
        $('#updateBtn').show();
        $('#resetBtn').hide();

        // Open modal
        $('#overlay').fadeIn(300);
        $('#studentModal').show();
    });

    $('#updateBtn').click(function() {
        var studentId = $('#studentId').val();
        var name = $('#name').val();
        var dob = $('#dob').val();
        var gender = $('input[name="gender"]:checked').val();
        var courses = $('#courses').val();
        var address = $('#address').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var cmnd = $('#cmnd').val();
        var consultant = $('#consultant').val();
        var hignschool = $('#hignschool').val();
        var khoanam = $('#khoa').val();
        var lop = $('#classname').val();
        var clb = $('#clb').val();

        // Lặp qua tất cả các ô checkbox đã được chọn và lấy giá trị của chúng
        var chungchi = [];
        $('input[type=checkbox][name=chungchi]:checked').each(function() {
            chungchi.push($(this).val());
        });
        console.log("Checked values: ", chungchi);

        var sothich = [];
        $('input[type=checkbox][name=skill]:checked').each(function() {
            sothich.push($(this).val());
        });
        console.log("Checked values: ", sothich);

        var hocbong = [];
        $('input[type=checkbox][name=hocbong]:checked').each(function() {
            hocbong.push($(this).val());
        });
        console.log("Checked values: ", hocbong);
        // tạo đối tượng sinh viên
        var student = {
            studentId: studentId,
            name: name,
            dob: dob,
            gender: gender,
            courses: courses,
            address: address,
            phone: phone,
            email: email,
            cmnd: cmnd,
            consultant: consultant,
            hignschool: hignschool,
            khoanam: khoanam,
            lop: lop,
            clb: clb,
            chungchi: chungchi,
            sothich: sothich,
            hocbong: hocbong
        };
        // Lấy danh sách sinh viên
        var students = JSON.parse(localStorage.getItem('students')) || [];
        var index = students.findIndex(function(student) {
            return student.studentId == studentId;
        });
        students[index] = student;


        // lưu sinh viên vào localStorage
        localStorage.setItem('students', JSON.stringify(students));

        // clear các trường trong form
        $('#studentForm')[0].reset();

        // hiển thị thôgn tin sinh viên
        displayStudents();

        // đóng modal
        $('#studentModal').hide();
        $('#overlay').hide();
        showSuccessToast("Sửa thành công!");
    });
    //Xoá cùng lúc nhiều sinh viên
    $('#deleteManyBtn').click(function() {
        // Lặp qua tất cả các ô checkbox trong bảng sinh viên
        if ($('#studentList input[type="checkbox"]:checked').length === 0) {
            //alert("Chọn sinh viên cần xoá");
            showErrorToast("Xoá thất bại! Vui lòng chọn sinh viên cần xoá!");
        } else {
            $('#studentList input[type="checkbox"]').each(function() {
                // Kiểm tra xem checkbox có được chọn không
                if ($(this).is(':checked')) {
                    // Nếu checkbox được chọn, lấy giá trị của thuộc tính data-id để xác định sinh viên cần xoá
                    var studentIdToDelete = $(this).closest('tr').find('.deleteBtn').data('id');
                    // Gọi hàm để xoá sinh viên từ localStorage hoặc từ danh sách hiển thị và cập nhật giao diện
                    deleteStudent(studentIdToDelete);
                }
            });
        }

    });

    function deleteStudent(studentId) {
        // Xoá sinh viên từ localStorage hoặc danh sách hiển thị tại đây
        var students = JSON.parse(localStorage.getItem('students'));

        // Function to confirm deletion
        var confirmDelete = confirm("Bạn có muốn xoá sinh viên có mã " + studentId);

        // If confirmed
        if (confirmDelete) {
            var index = students.findIndex(function(student) {
                return student.studentId == studentId;
            });
            // Remove student from array
            students.splice(index, 1);

            // Save updated students array to localStorage
            localStorage.setItem('students', JSON.stringify(students));

            // Display students
            displayStudents();
            showSuccessToast("Xoá thành công sinh viên có mã sinh viên: " + studentId);
        }
        // Cập nhật lại giao diện sau khi xoá
    }
    // Function xoá sinh viên
    $(document).on('click', '.deleteBtn', function() {
        var studentId = $(this).data('id');
        deleteStudent(studentId);
    });

    // Close modal when close button is clicked
    $('.close').click(function() {
        $('#studentForm')[0].reset();
        $('#studentModal').hide();
        $('#overlay').hide();
        $('.error-message').remove();
    });

    // Function to open modal for adding a new student
    $('#addStudentBtn').click(function() {
        $('#saveBtn').show();
        $('#resetBtn').show();
        $('#updateBtn').hide();
        // Clear form fields
        $('#studentForm')[0].reset();
        $('#studentId').val('');

        // Open modal
        $('#studentModal').show();
        $('#overlay').fadeIn(300);
    });

    // Function to reset form
    $('#resetBtn').click(function() {
        $('#studentForm')[0].reset();
        $('#studentId').val('');
    });

    //Hiện thị dấu * ở các trường bắt buộc phải nhập
    $(document).ready(function() {
        // Lặp qua tất cả các ô input bắt buộc trong form-group
        $('.required input[required]').each(function() {
            // Tạo một span chứa dấu * và thêm vào cuối thẻ div.form-group
            $(this).parent().append('<span class="required-asterisk">*</span>');
        });
        $('.required select[required]').each(function() {
            $(this).parent().append('<span class="required-asterisk">*</span>');
        });
    });
    //Test Search
    function testSearchStudents(keyword, selectedCourse, male) {
        var students = JSON.parse(localStorage.getItem('students')) || [];
        var searchResults = students;

        // Tạo ra một mảng các điều kiện tìm kiếm
        var conditions = [];

        // Thêm điều kiện tìm kiếm cho từ khóa nếu có giá trị
        if (keyword) {
            conditions.push(function(student) {
                return student.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    student.studentId.toString().toLowerCase().includes(keyword.toLowerCase());
            });
        }

        // Thêm điều kiện tìm kiếm cho khoa nếu có giá trị
        if (selectedCourse !== "") {
            conditions.push(function(student) {
                return student.courses === selectedCourse;
            });
        }

        //Thêm điều kiện tìm kiếm giới tính nếu có giá trị
        if (male !== "") {
            conditions.push(function(student) {
                return student.gender === male;
            });
        }
        // Nếu không có điều kiện tìm kiếm, hiển thị tất cả sinh viên
        if (conditions.length === 0) {
            displaySearchResults(students);
            return;
        }

        // Áp dụng các điều kiện tìm kiếm vào danh sách sinh viên
        searchResults = searchResults.filter(function(student) {
            return conditions.every(function(condition) {
                return condition(student);
            });
        });

        // Hiển thị kết quả tìm kiếm
        displaySearchResults(searchResults);
    }
    //Tìm kiếm sinh viên
    // function searchStudents(keyword, selectedCourse) {
    //     var students = JSON.parse(localStorage.getItem('students')) || [];
    //     // Lọc danh sách sinh viên dựa trên từ khóa tìm kiếm
    //     var searchResults = students;
    //     if (keyword != "" && selectedCourse != "") {
    //         searchResults = students.filter(function(student) {
    //             return (student.name.toLowerCase().includes(keyword.toLowerCase()) ||
    //                     student.studentId.toLowerCase().includes(keyword.toLowerCase())) &&
    //                 student.courses === selectedCourse;
    //         });
    //     } else if (keyword != "") {
    //         searchResults = students.filter(function(student) {
    //             return student.name.toLowerCase().includes(keyword.toLowerCase()) ||
    //                 student.studentId.toLowerCase().includes(keyword.toLowerCase());
    //         });
    //     } else if (selectedCourse != "") {
    //         searchResults = students.filter(function(student) {
    //             return student.courses === selectedCourse;
    //         });
    //     }

    //     // Hiển thị kết quả tìm kiếm
    //     displaySearchResults(searchResults);
    // }

    function displaySearchResults(results) {
        // Xóa nội dung hiện tại trong phần hiển thị kết quả
        $('#studentList').empty();
        var html = '';
        $.each(results, function(index, student) {
            html += '<tr class="">';
            html += '<td style="text-align: center;"><input type="checkbox" class="mobile-checkbox"></td>';
            html += '<td data-title="Mã sinh viên">' + student.studentId + '</td>';
            html += '<td data-title="Họ và tên">' + student.name + '</td>';
            html += '<td data-title="Ngày sinh">' + student.dob + '</td>';
            html += '<td data-title="Giới tính">' + student.gender + '</td>';
            html += '<td data-title="Khoa">' + student.courses + '</td>';
            html += '<td class="option">';
            html += '<button class="editBtn btn pd-xs mr-1" data-id="' + student.studentId + '"><i class="fa-solid fa-pen-to-square mr-1" style="color: #271756;"></i>Sửa</button>';
            html += '<button class="detailBtn btn pd-xs mr-1" data-id="' + student.studentId + '"><i class="fa-solid fa-eye fa-eye mr-1" style="color: #271756;"></i>Chi tiết</button>';
            html += '<button class="deleteBtn btn pd-xs" data-id="' + student.studentId + '"><i class="fa-sharp fa-solid fa-trash mr-1" style="color: #271756;"></i>Xóa</button>';
            html += '</td></tr>';
        });
        // Thêm chuỗi HTML vào DOM
        $('#studentList').append(html);
        $('#studentList').addClass('hide');

        // Sử dụng setTimeout để thêm lớp 'hide' sau một khoảng thời gian ngắn
        setTimeout(function() {
            $('#studentList').removeClass('hide');
        }, 200);
    }
    //Tìm kiếm khi ấn enter
    $('#custom-search-input input').keydown(function(event) {
        // Kiểm tra nếu mã phím là 13 (phím Enter)
        if (event.which === 13) {
            // Lấy giá trị của trường nhập liệu
            var searchText = $(this).val();
            var selectedCourse = $('#courses-search').val();
            var male = $('#male-search').val();
            // Gọi hàm thực hiện tìm kiếm với các tham số đã lấy được
            testSearchStudents(searchText, selectedCourse, male);
        }
    });

    // Tìm kiếm theo khao và giới tính
    $('#courses-search, #male-search').change(function() {
        // Lấy giá trị của lựa chọn mới
        var selectedCourse = $('#courses-search').val();
        var searchText = $('#custom-search-input input').val();
        var male = $('#male-search').val();
        // Thực hiện tìm kiếm sinh viên dựa trên lựa chọn mới
        testSearchStudents(searchText, selectedCourse, male);
    });

    // Function để tìm kiếm sinh viên dựa trên khoa
    function searchStudentsByCourse(course) {
        var students = JSON.parse(localStorage.getItem('students')) || [];
        var searchResults = [];

        // Lọc danh sách sinh viên dựa trên khoa
        if (course === "") {
            // Nếu không có khoa nào được chọn, hiển thị tất cả sinh viên
            searchResults = students;
        } else {
            searchResults = students.filter(function(student) {
                //return student.courses === course;
            });
        }

        // Hiển thị kết quả tìm kiếm
        displaySearchResults(searchResults);
    }

    $('.bars i').click(function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện lan truyền đến body
        $('#side').toggleClass('open'); // Thêm hoặc loại bỏ class 'open' để hiển thị hoặc ẩn menu
    });
    $(document).click(function(event) {
        if (!$(event.target).closest('#side').length && !$(event.target).is('#bars i')) {
            $('#side').removeClass('open'); // Khi click ra ngoài, loại bỏ class 'open' để ẩn menu
        }
    });

    //Date
    $("#dob").datepicker({
        dateFormat: "dd/mm/yy", // Định dạng ngày tháng
        changeMonth: true, // Cho phép chọn tháng
        changeYear: true, // Cho phép chọn năm
        yearRange: "-100:+0", // Phạm vi năm từ năm hiện tại trở lại 100 năm
        showButtonPanel: true, // Hiển thị nút chọn ngày hôm nay và đóng
        closeText: "Đóng", // Chữ hiển thị trên nút đóng
        currentText: "Hôm nay", // Chữ hiển thị trên nút hôm nay
        prevText: "&#x3c;Trước", // Chữ hiển thị trên nút trước
        nextText: "Tiếp&#x3e;", // Chữ hiển thị trên nút tiếp
        monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"], // Tên các tháng
        monthNamesShort: ["Th 1", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "Th 8", "Th 9", "Th 10", "Th 11", "Th 12"], // Tên ngắn của các tháng
        dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"], // Tên các ngày
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"], // Tên ngắn của các ngày
        dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"], // Tên viết tắt của các ngày
        isRTL: false, // Ngôn ngữ không phải là ngôn ngữ từ phải qua trái
        showMonthAfterYear: false, // Hiển thị tháng trước năm
        yearSuffix: "" // Hậu tố cho năm
    });

    //Chi tiết sinh viên
    // Function để hiển thị thông tin sinh viên trong modal
    function displayStudentDetailsModal(student) {
        $('#modalStudentId').text(student.studentId);
        $('#modalStudentName').text(student.name);
        $('#modalStudentDob').text(student.dob);
        $('#modalStudentGender').text(student.gender);
        $('#modalStudentCourses').text(student.courses);
        $('#modalStudentAddress').text(student.address);
        $('#modalStudentPhone').text(student.phone);
        $('#modalStudentCmnd').text(student.cmnd);
        $('#modalStudentConsultant').text(student.consultant);
        $('#modalStudentHignschool').text(student.hignschool);
        $('#modalStudentEmail').text(student.email);
        $('#modalStudentLop').text(student.lop);
        $('#modalStudentKhoa').text(student.khoanam);
        $('#modalStudentCLB').text(student.clb);

        if (student.chungchi.length > 0) {
            var stringChungChi;
            stringChungChi = student.chungchi.join(", ");
            $('#modalStudentTA').text(stringChungChi);
        } else {
            $('#modalStudentTA').text("Không");
        }
        if (student.sothich.length > 0) {
            var stringSoThich;
            stringSoThich = student.sothich.join(", ");
            $('#modalStudentST').text(stringSoThich);
        } else {
            $('#modalStudentST').text("Không");
        }
        if (student.hocbong.length > 0) {
            var stringHocBong;
            stringHocBong = student.hocbong.join(", ");
            $('#modalStudentHB').text(stringHocBong);
        } else {
            $('#modalStudentHB').text("Không");
        }
    }

    // Sự kiện khi một sinh viên được nhấp vào
    $(document).on('click', '.detailBtn', function() {
        // Lấy id của sinh viên từ thuộc tính data-id
        var studentId = $(this).data('id');
        // Tìm sinh viên trong danh sách theo id
        var student = FindStudent(studentId);
        // Hiển thị thông tin của sinh viên trong modal
        displayStudentDetailsModal(student);
        // Hiển thị modal
        $('#studentDetailModal').show();
        $('#overlay-detail').show();
    });

    $('#close-modal-detail').click(function() {
        $('#studentDetailModal').hide();
        $('#overlay-detail').hide();
    });

    //Nút search ở mobile
    $('#search-mobile-btn').click(function() {
        var searchText = $('#search-text').val();
        var selectedCourse = $('#courses-search').val();
        var male = $('#male-search').val();
        // Gọi hàm thực hiện tìm kiếm với các tham số đã lấy được
        testSearchStudents(searchText, selectedCourse, male);
    });

    $('#overlay-detail').on('click', function(event) {
        if ($(event.target).closest('#overlay-detail').length > 0) {
            $('#studentDetailModal').hide(); // Ẩn modal
            $(this).hide(); // Ẩn overlay
        }
    });

    $('.modal-content').on('click', function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click được lan truyền đến lớp overlay
    });

    $('#overlay').on('click', function(event) {
        if ($(event.target).closest('#overlay').length > 0) {
            $('#studentDetailModal').hide(); // Ẩn modal
            $(this).hide(); // Ẩn overlay
        }
    });

    $('.nav li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
});