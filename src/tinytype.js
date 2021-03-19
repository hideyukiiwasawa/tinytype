var _tinytype = {
	start: function(_opt){

		var count = -1;
		var line  = 0;
		var blink_count = 0;

		var line_num = _opt.line.length;
		for(var i=0 ; i < line_num; i++){
			var el = document.querySelector(_opt.line[i].selector);
			_opt.line[i].text = el.textContent;
		}

		var interval = function(){
			var interval_id = setInterval(function(){

				var el = document.querySelector(_opt.line[line].selector);
				el.style.visibility = "visible";

				// -- blink
				if (count == -1){
					if (el.innerHTML !== '<i></i>'){
						el.innerHTML = '<i></i>';
					}else{
						el.innerHTML = "　";
					}

					blink_count++;
					if (blink_count >= _opt.blink * 2){
						count = 0;
					}
				}

				// -- type
				if (count >= 0){
					count++;

					if (count > _opt.line[line].text.length){
						// -- １行終了
						el.textContent = _opt.line[line].text;
						count = -1;
						blink_count = 0;
						line++;
						clearInterval(interval_id);
						if (line == line_num){
							_opt.callback();
						}else{
							interval(); // 次の行へ
						}
					}else{
						// -- １文字追加
						var txt  = _opt.line[line].text.substr(0, count);
						var html = '<i>' + txt.slice(-1) + '</i>';
						html = txt.slice(0, -1) + html;
						el.innerHTML = html;
					}

				}

			}, _opt.line[line].speed);
		}

		interval();

	}
}