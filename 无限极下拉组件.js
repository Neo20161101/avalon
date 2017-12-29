avalon.component('DEPART_PARENTID',{//区域单位下拉框无限极组件
        template:'<label id="input-group" class="ALARM_TYPE">'+
        '<select id="main" class="DEPART_PARENTID">' +
        '<option value="1">请选择</option>' +
        '<option ms-for="el in ##DEPART_PARENTID_List" ms-attr="{value:el.ID+el.DEPART_LEVEL,id:el.DEPART_CODE}">{{el.DEPART_NAME}}</option>' +
        '</select>' +
        '</label>'
        ,
        defaults: {
            DEPART_PARENTID:"",
            DEPART_PARENTID_List:[],
            html:"",
            onInit:function () {
                var $this = this;
                var data = {
                    DEPART_LEVEL:1
                };
                $.post("/api/demo/Unit/UnitList",data,function (res) {//获取json数据
                    $this.DEPART_PARENTID_List = res.Content.DATA;
                });

            },
            onViewChange:function (e) {
                var $this = this;
                $("#input-group select.DEPART_PARENTID").on("change",function (e) {
                    qwer(e);
                })
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
    var n = getTarget(e).value.charAt(getTarget(e).value.length - 1);
    var $value = (getTarget(e).value.substr(0, getTarget(e).value.length - 1));
    var id = getTarget(e).options[getTarget(e).selectedIndex].id;
    id = id.replace(/0*$/g, "");
    var len = $input_group.children().length - 1;
    if (($value != "") && id != "") {
            if (len > 0) {
                for (var i = len; i >= parseInt(n); i--) {
                    parent.removeChild(child[i]);
                }
            }
            var data = {
                DEPART_LEVEL: ++n,
                DEPART_PARENTID: $value,
                DEPART_CODE: id
            };
            app.UNIT_ID_Search = $value;
            app.DEPART_CODE_Search = id;
            html += "<select class='DEPART_PARENTID' onchange='qwer(event);'>";
            $.post("/api/demo/Unit/UnitList", data, function (res) {
                var len = res.Content.DATA.length;
                if (len > 0) {
                    html += "<option value=" + res.Content.DATA[0].DEPART_LEVEL + ">请选择</option>";
                    for (var i = 0; i < len; i++) {
                        html += "<option id='" + res.Content.DATA[i].DEPART_CODE + "' value='" + res.Content.DATA[i].ID + res.Content.DATA[i].DEPART_LEVEL + "'>" + res.Content.DATA[i].DEPART_NAME + "</option>";
                    }
                    html += "</select>";
                    $input_group.append(html);
                }


            });
        } else {
            if (len > 0) {
                if(len<parseInt(getTarget(e).value)){

                    app.UNIT_ID_Search = $input_group.children()[len-1].value.substr(0, $input_group.children()[len-1].value.length - 1);
                    app.DEPART_CODE_Search = $input_group.children()[len-1].options[$input_group.children              ()[len-1].options.selectedIndex].id;
                }else {
                    for (var i = len; i >= parseInt(getTarget(e).value); i--) {
                        parent.removeChild(child[i]);
                    }
                    if(i>0){

                            app.UNIT_ID_Search = $input_group.children()[i-1].value.substr(0, $input_group.children()[i-1].value.length - 1);
                            app.DEPART_CODE_Search = $input_group.children()[i-1].options[$input_group.children              ()[i-1].options.selectedIndex].id.replace(/0*$/g, "");
                    }else {
                        app.UNIT_ID_Search = "";
                        app.DEPART_CODE_Search = "";
                    }

                }

            }else {
                app.UNIT_ID_Search = "";
                app.DEPART_CODE_Search = "";
            }
        }
    }