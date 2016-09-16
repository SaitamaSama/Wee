/**
 * Created by lelouch on 15/9/16.
 */

if(typeof(jQuery) == "undefined" || typeof($) == "undefined") {
    throw new Error("It's a shame, but I depend on jQuery for the very existence of myself.");
}

$(function () {
    $(document).on("mousedown", "[data-ripple]", ripple.ripple);
    dialog.init();
});

var Animation = {
    animate: function (animationName, object, type) {
    var Callee = arguments.callee.caller.name;
    var DOMObject = object;
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    DOMObject.addClass("animated " + animationName).one(animationEnd, function () {
        DOMObject.removeClass("animated " + animationName);
        if(type == "remove") {
            DOMObject.hide();
        } else {
            DOMObject.show();
        }
    });
}
}

var ripple = {
    ripple: function(e) {
        var $self = $(this);
        if($self.is(".btn-disabled")) {
            return;
        }
        if($self.closest("[data-ripple]")) {
            e.stopPropagation();
        }
        var initPos = $self.css("position"),
            offs = $self.offset(),
            w = Math.min(this.offsetWidth, 160),
            h = Math.min(this.offsetHeight, 160),
            x = e.pageX - offs.left,
            y = e.pageY - offs.top,
            $ripple = $('<div/>', {class : "ripple",appendTo : $self });

        if(!initPos || initPos==="static") {
            $self.css({position:"relative"});
        }

        $('<div/>', {
            class : "rippleWave",
            css : {
                background: $self.data("ripple"),
                width: h,
                height: h,
                left: x - (h/2),
                top: y - (h/2)
            },
            appendTo : $ripple,
            one : {
                animationend : function(){
                    $ripple.remove();
                }
            }
        });
    }
};

var dialog = {
    init: function () {
        this.object = $("[data-dialog]");
        this.details = this.object.attr("data-dialog");
        this.message = this.details.message;
        this.acceptText = (typeof(this.details["accept-button-test"]) == "undefined") ? "Yes" : this.details["accept-button-text"];
        this.denyText = (typeof(this.details["deny-button-test"]) == "undefined") ? "No" : this.details["deny-button-text"];
        this.acceptAction = this.details["accept-action"];

        this.object.on("click", this.new);

        return this;
    },
    new: function () {
        this.dialog = $("<div class='dialog-overlay'>" +
            "</div>");
        $("body").css({overflow: "hidden"}).append(this.dialog);
        this.dialog.css({height: "100%"});
        Animation.animate("rollIn", this.dialog, "show");
    }
};