avalon.component('DEPART_PARENTID',{
    template:'<label id="input-group" class="ALARM_TYPE">'+
    '<select class="DEPART_PARENTID" ms-attr="{disabled:##toggleReadonly}">' +
    '<option value="0">请选择</option>' +
    '<option ms-for="el in ##DEPART_PARENTID_List" ms-attr="{value:el.ID,id:el.DEPART_LEVEL}">{{el.DEPART_NAME}}</option>' +
    '</select>' +
    '</label>'
    ,
    defaults: {
        DEPART_PARENTID:"",
        DEPART_PARENTID_List:[],
        html:"",
        toggleReadonly:false,
        onInit:function () {
            var $this = this;
            // var data = {
            //     DEPART_PARENTID:""
            // };
            $.post("/Api/WebMgr/Departmentmgr/GetSubDepartment",function (res) {
                $this.DEPART_PARENTID_List = res.Content;
            });
        },
        onReady:function () {},
        onViewChange:function () {
            $("#input-group select.DEPART_PARENTID").on("change",function (e) {
                var $this = $(this),arr = $this.parent().children(),len = $this.next().length;
                if(len>0){
                    avalon.each(arr,function (i,n) {
                        if(i>0){n.remove();}
                    })
                }
                qwer(e);
            });

        }
    }
});//区域单位下拉框无限极组件


function getTarget(e) {
    return e.target || e.srcElement;
}
function qwer(e) {
    e = e || window.event;
    var html = "";
    var $input_group = $("#input-group");
    var parent=document.getElementById("input-group");
    var child=parent.getElementsByTagName("select");

    //var n = getTarget(e).options[getTarget(e).selectedIndex].id;
    //var $value = getTarget(e).value;
    var $value = getTarget(e).value;
    var id = getTarget(e).options[getTarget(e).selectedIndex].id;
    // id = id.replace(/0*$/g, "");
    var len = $input_group.children().length - 1;
    if (($value != "") && (id != "")) {
        if (len > 1) {

            for (var i = len; i >= parseInt(id)+1; i--) {
                parent.removeChild(child[i]);
            }
        }
        var data = {
            DEPART_PARENTID: $value
        };
        app.DEPART_PARENTID_Search = $value;
        //NursingModal.DEPART_CODE_Search = id;
        html += "<select onchange='qwer(event);'>";
        $.post("/Api/WebMgr/Departmentmgr/GetSubDepartment", data, function (res) {
            var len = res.Content.length;
            if (len > 0) {
                html += "<option value=" + res.Content[0].DEPART_LEVEL + ">请选择</option>";
                for (var i = 0; i < len; i++) {
                    html += "<option id='" + res.Content[i].DEPART_LEVEL + "' value='" + res.Content[i].ID+ "'>" + res.Content[i].DEPART_NAME + "</option>";
                }
                html += "</select>";
                $input_group.append(html);
            }


        });
    } else {
            if(len<parseInt(getTarget(e).value)){
                //console.log("1:",getTarget(e).nextSibling);
                //console.log("1:",getTarget(e).value);
                //console.log("1:",$value);
                app.DEPART_PARENTID_Search = $input_group.children()[$value-1].value;
                // app.DEPART_CODE_Search = $input_group.children()[len-1].options[$input_group.children              ()[len-1].options.selectedIndex].id;
            }else if(len>parseInt(getTarget(e).value)){
                for (var j = len; j > parseInt(getTarget(e).value); j--) {
                    parent.removeChild(child[j]);
                }
                app.DEPART_PARENTID_Search = $input_group.children()[$value-1].value;
                //console.log("2:",getTarget(e).nextSibling);
                //console.log("2:",child);
                //console.log("2:",getTarget(e).value);
                //console.log("2:",$input_group.children()[$value-1]);
                //console.log("2:",len)


            }else {
                if($input_group.children()[$value-1]){
                    app.DEPART_PARENTID_Search = $input_group.children()[$value-1].value;
                }else {
                    app.DEPART_PARENTID_Search = "";
                }
                //console.log("3:",$input_group.children()[$value-1]);

            }


    }
}//区域单位下拉框无限极组件调用函数
