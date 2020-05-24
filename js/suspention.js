
$(function(){
    $.fn.extend({
        "suspensionTips": function (options) {
            var tips = {
                config : {
                    verticalMargin : 13, 
                    horizontalMargin: 13, 
                    position: 'top', 
                    sharpX : 23, 
                    sharpY : 20, 
                    width : 100,
                    positionClass : 'common-tips'
                },
                init : function (options) {
                    this.config.positionClass = 'common-tips'
                    this.config = $.extend({}, this.config, options);
                    var div = $("<div></div>");
                    div.addClass("common-tips-container common-tips-hide");
                    div.text(this.config.content);
                    div.attr("id","common-tips");
                    $(document.body).append(div);
                    div.css({
                        "width" : this.config.width + "px",
                    });
                    this.calcTop(div);
                    this.calcLeft(div);

                    div.addClass("common-tips-animation");
                    div.addClass(this.config.positionClass);
                    div.removeClass("common-tips-hide");
                },
                calcTop : function(tipsDiv){
                    var top = this.config.elementPosition.top - tipsDiv.outerHeight() - this.config.verticalMargin;
                    if(this.config.mousePosition.top < (tipsDiv.outerHeight() + this.config.verticalMargin) || this.config.position == "bottom"){
                        top = top + tipsDiv.outerHeight() + this.config.verticalMargin + this.config.elementHeight + this.config.verticalMargin;
                        this.config.positionClass += '-bottom';
                    }else{
                        this.config.positionClass += '-top';
                    }

                    if(this.config.position == "left" || this.config.position == "right"){
                        top = this.config.elementPosition.top + this.config.elementHeightHalf - this.config.sharpY;
                    }

                    tipsDiv.css("top", top);
                },
                calcLeft : function (tipsDiv) {
                    var left = 0;
                    var windowWidth = window.innerWidth;
                    var marginRight = windowWidth - this.config.mousePosition.left;
                    if(this.config.position == "top" || this.config.position == "bottom"){
                        if(marginRight < (tipsDiv.outerWidth() - this.config.sharpX)){
                            left = this.config.elementPosition.left - tipsDiv.outerWidth() + this.config.sharpX + this.config.elementWidthHalf;
                            this.config.positionClass += '-left';
                        }else{
                            left = this.config.elementPosition.left + this.config.elementWidthHalf - this.config.sharpX;
                            this.config.positionClass += '-right';
                        }
                    }else if(this.config.position == "left"){
                        if(this.config.mousePosition.left < tipsDiv.outerWidth()){
                            this.config.positionClass = "common-tips-right-right";
                            left = this.config.elementPosition.left + this.config.elementWidth + this.config.horizontalMargin;
                        }else{
                            this.config.positionClass = "common-tips-left-left";
                            left = this.config.elementPosition.left - tipsDiv.outerWidth() - this.config.horizontalMargin;
                        }
                    }else{
                        this.config.positionClass = "common-tips-right-right";
                        left = this.config.elementPosition.left + this.config.elementWidth + this.config.horizontalMargin;
                    }
                    tipsDiv.css("left", left);
                }
            }
            $(this).on("mouseover", function(e){
                var mousePosition = {
                    top : e.clientY - e.offsetY,
                    left : e.clientX - e.offsetX + $(this).outerWidth()/2
                };
                options.element=$(this);
                options.elementPosition= $(this).offset();
                options.elementWidth=$(this).outerWidth();
                options.elementWidthHalf=$(this).outerWidth()/2;
                options.elementHeight = $(this).outerHeight();
                options.elementHeightHalf = $(this).outerHeight()/2;
                options.mousePosition = mousePosition;
                tips.init(options);

            });
            $(this).on("mouseout", function(){
                $("#common-tips").addClass("common-tips-container-hide");
                document.getElementById("common-tips").addEventListener('webkitAnimationEnd', function () {
                   $("#common-tips").remove();
                }, false);
            });
        }
    });   
});

