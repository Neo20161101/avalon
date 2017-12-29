// 组件：左侧导航条
var treeID = 0;
avalon.component('tree', {
    template:
        '<ul>' +
        '<li ms-for="el in ##tree">' +
        '<a ms-click="openSubTree(el,tree)" ms-attr="{href:el.NAV_URL,target:el.NAV_URL_TYPE} | target" class="btn btn-link" ms-class="el.NAV_CODE" role="button">' +
        '<i ms-class="[el.NAV_ICONURI] | NAV_ICONURI"></i>{{el.NAV_NAME}}' +
        '<span ms-class="changeIcon(el)" style="color: #ccc;position: absolute;right: 15px;top: 6px;"></span></a>' +
        '<div ms-visible="el.NAV_ENABLE" class="DropDown" ms-html="##renderSubTree(el)">' +
        '</div>' +
        '</li>' +
        '</ul>'
    ,
    defaults: {
        tree: [],
        NAV_PARENT_ID:"",
        renderSubTree: function (el) {
            return  el.CHILDREN.length ? '<wbr is="tree" ms-widget="{$id:\'tree_' + (++treeID) + '\', tree: el.CHILDREN}" />' : '';
        },
        onInit:function (e) {
            //console.log(e);

        },
        onReady:function (e) {
            //当其虚拟DOM构建完毕，它就生成其真实DOM，并用它插入到DOM树shihou
            var href = location.href+"#";
            var $this = this;
            var arr = LeftSidebarApp.gg;
            function recursion(arr) {
                avalon.each(arr,function (i,n) {
                    if ($this.NAV_PARENT_ID == n.ID){
                        n.NAV_ENABLE = true;
                    }
                    if(n.CHILDREN){
                        var arr2 = n.CHILDREN;
                        recursion(arr2)
                    }
                });
            }
            avalon.each($this.tree, function(index, el){
                //el.NAV_URL = false;
                var NAV_URL =el.NAV_URL+"#";
                if(href.indexOf(NAV_URL) != -1 && NAV_URL != "#" && NAV_URL !="##"){
                    el.NAV_CODE = "active";
                    $this.NAV_PARENT_ID = el.NAV_PARENT_ID;
                    recursion(arr);
                            //el.NAV_ENABLE = true;
                            // $("#LeftSidebar a").each(function () {
                            //     var ahref =$(this).attr("href")+"#";
                            //     if(href.indexOf(ahref) != -1 && ahref != "#" && ahref !="##"){
                            //         $(this).addClass('active');
                            //         //$(this).parents("div.DropDown").css("display","block");
                            //         //$(this).parents("div.DropDown").removeAttr("hidden");
                            //     }else {
                            //         $(this).removeClass('active');
                            //     }
                            // });
                            return false;
                }else {
                    //LeftSidebarApp.gg[index].NAV_ENABLE = false;

                }
            })
        },
        onViewChange:function (e) {
            var $this = this;
            var href = location.href+"#";
            //当这个组件或其子孙节点的某些属性值或文本内容发生变化，就会触发它;
            // var LeftSidebar = $("#LeftSidebar>ul");
            // LeftSidebar.on("click","li>a",function () {//左侧导航条点击事件
            //     $(this).siblings(".DropDown").slideToggle(100);
            //     $(this).parent().siblings().children(".DropDown").slideUp(100);
            //
            // });
        },
        openSubTree: function (el,tree) {
            if(el.NAV_ENABLE == false){
                avalon.each(tree, function(index, el){
                    el.NAV_ENABLE =false;
                })
            }
            el.NAV_ENABLE = !el.NAV_ENABLE;
            //el.NAV_ENABLE = !el.NAV_ENABLE;ms-click="openSubTree(tree,$event)"用来点击事件
        },
        changeIcon: function (el) {//用来显示有无展开的图标
            if(el.CHILDREN.length){
                return el.NAV_ENABLE ? 'icon-caret-down' : 'icon-caret-right';
            }

        }
    }
});