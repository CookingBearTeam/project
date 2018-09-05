/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 * 
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt To use it
 * on other terms please contact us at info@jeasyui.com
 * 
 */
(function($) {
	var _index = 0;
	function _show(_target) {
		var _filebox = $.data(_target, "filebox");
		var _fileboxOpt = _filebox.options;
		var id = "filebox_file_id_" + (++_index);
		$(_target).addClass("filebox-f").textbox(_fileboxOpt);
		$(_target).textbox("textbox").attr("readonly", "readonly");
		_filebox.filebox = $(_target).next().addClass("filebox");
		_filebox.filebox.find(".textbox-value").remove();
		_fileboxOpt.oldValue = "";
		var _fileInput = $("<input type=\"file\" class=\"textbox-value\">").appendTo(
				_filebox.filebox);
		_fileInput.attr("id", id).attr("name", $(_target).attr("textboxName") || "");
		_fileInput.change(function() {
			$(_target).filebox("setText", this.value);
			_fileboxOpt.onChange.call(_target, this.value, _fileboxOpt.oldValue);
			_fileboxOpt.oldValue = this.value;
		});
		var _button = $(_target).filebox("button");
		if (_button.length) {
			$("<label class=\"filebox-label\" for=\"" + id + "\"></label>")
					.appendTo(_button);
			if (_button.linkbutton("options").disabled) {
				_fileInput.attr("disabled", "disabled");
			} else {
				_fileInput.removeAttr("disabled");
			}
		}
	}
	;
	$.fn.filebox = function(_options, _param) {
		if (typeof _options == "string") {
			var _fileMethods = $.fn.filebox.methods[_options];
			if (_fileMethods) {
				return _fileMethods(this, _param);
			} else {
				return this.textbox(_options, _param);
			}
		}
		_options = _options || {};
		return this.each(function() {
			var _fileBoxData = $.data(this, "filebox");
			if (_fileBoxData) {
				$.extend(_fileBoxData.options, _options);
			} else {
				$.data(this, "filebox", {
					options : $.extend({}, $.fn.filebox.defaults, $.fn.filebox
							.parseOptions(this), _options)
				});
			}
			_show(this);
		});
	};
	$.fn.filebox.methods = {
		options : function(jq) {
			var _textboxOpt = jq.textbox("options");
			return $.extend($.data(jq[0], "filebox").options, {
				width : _textboxOpt.width,
				value : _textboxOpt.value,
				originalValue : _textboxOpt.originalValue,
				disabled : _textboxOpt.disabled,
				readonly : _textboxOpt.readonly
			});
		}
	};
	$.fn.filebox.parseOptions = function(_d) {
		return $.extend({}, $.fn.textbox.parseOptions(_d), {});
	};
	$.fn.filebox.defaults = $.extend({}, $.fn.textbox.defaults, {
		buttonIcon : null,
		buttonText : "Choose File",
		buttonAlign : "right",
		inputEvents : {}
	});
})(jQuery);
