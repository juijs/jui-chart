jui.define("chart.vector", [], function() {
    var Vector = function(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;

        this.add = function(numberOrVector) {
            if(numberOrVector instanceof Vector) {
                return new Vector(this.x + numberOrVector.x, this.y + numberOrVector.y, this.z + numberOrVector.z);
            }

            return new Vector(this.x + numberOrVector, this.y + numberOrVector, this.z + numberOrVector);
        }

        this.subtract = function(numberOrVector) {
            if(numberOrVector instanceof Vector) {
                return new Vector(this.x - numberOrVector.x, this.y - numberOrVector.y, this.z - numberOrVector.z);
            }

            return new Vector(this.x - numberOrVector, this.y - numberOrVector, this.z - numberOrVector);
        }

        this.multiply = function(numberOrVector) {
            if(numberOrVector instanceof Vector) {
                return new Vector(this.x * numberOrVector.x, this.y * numberOrVector.y, this.z * numberOrVector.z);
            }

            return new Vector(this.x * numberOrVector, this.y * numberOrVector, this.z * numberOrVector);
        }

        this.dotProduct = function(vector) {
            var value = this.x * vector.x + this.y * vector.y + this.z * vector.z;
            return Math.acos(value / (this.getMagnitude() * vector.getMagnitude()))
        }

        this.crossProduct = function(vector) {
            return new Vector(
                this.y * vector.z - this.z * vector.y,
                this.z * vector.x - this.x * vector.z,
                this.x * vector.y - this.y * vector.x
            );
        }

        this.normalize = function() {
            var mag = this.getMagnitude();

            this.x /= mag;
            this.y /= mag;
            this.z /= mag;
        }

        this.getMagnitude = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
    }

    return Vector;
});
jui.define("chart.draw", [ "util.base" ], function(_) {
    /**
     * @class chart.draw
     * @alias Draw
     * @requires util.base
     * @requires jquery
     *
     */
	var Draw = function() {

        /**
         * @method drawBefore
         *
         * run before draw object
         *
         */

        /**
         * @method draw
         *
         * draw object
         *
         * @return {Object}
         *
         */

        /**
         * @method drawAfter
         *
         * run after draw object
         */

        /**
         * @method drawAnimate
         *
         * implements animate code after draw object
         */

		/**
		 * @method render
         *
         * 모든 Draw 객체는  render 함수를 통해서 그려진다.
		 * 
		 */
		this.render = function() {
            if(!_.typeCheck("function", this.draw)) {
                throw new Error("JUI_CRITICAL_ERR: 'draw' method must be implemented");
            }

            // Call drawBefore method
            if(_.typeCheck("function", this.drawBefore)) {
                this.drawBefore();
            }

            // Call draw method (All)
			var obj = this.draw();

            // Call drawAnimate method
            if(_.typeCheck("function", this.drawAnimate)) {
                var draw = this.grid || this.brush || this.widget || this.map;

                if(draw.animate !== false) {
                    this.drawAnimate(obj);
                }
            }

            // Call drawAfter method
            if(_.typeCheck("function", this.drawAfter)) {
                this.drawAfter(obj);
            }

            return obj;
		}

        /**
         * @method format
         * Get a default format callback of draw object.
         *
         * @return {Function}
         */
        this.format = function() {
            var draw = this.grid || this.brush || this.widget,
                callback = draw.format || this.chart.format;

            return callback.apply(this.chart, arguments);
        }

        /**
         * @method balloonPoints
         *
         * 말풍선 그리그 메소드
         *
         * @param {String} type
         * @param {Number} w
         * @param {Number} h
         * @param {Number} anchor
         * @return {String}
         */
        this.balloonPoints = function(type, w, h, anchor) {
            var points = [];

            if(type == "top") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ (w / 2) + (anchor / 2), h ].join(","));
                points.push([ (w / 2), h + anchor ].join(","));
                points.push([ (w / 2) - (anchor / 2), h ].join(","))
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            } else if(type == "bottom") {
                points.push([ 0, anchor ].join(","));
                points.push([ (w / 2) - (anchor / 2), anchor ].join(","));
                points.push([ (w / 2), 0 ].join(","));
                points.push([ (w / 2) + (anchor / 2), anchor ].join(","));
                points.push([ w, anchor ].join(","));
                points.push([ w, anchor + h ].join(","))
                points.push([ 0, anchor + h ].join(","));
                points.push([ 0, anchor ].join(","));
            } else if(type == "left") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, (h / 2) - (anchor / 2) ].join(","));
                points.push([ w + anchor, (h / 2) ].join(","));
                points.push([ w, (h / 2) + (anchor / 2) ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            } else if(type == "right") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, (h / 2) + (anchor / 2) ].join(","));
                points.push([ 0 - anchor, (h / 2) ].join(","));
                points.push([ 0, (h / 2) - (anchor / 2) ].join(","));
                points.push([ 0, 0 ].join(","));
            } else {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            }

            return points.join(" ");
        }

        /**
         * @method on
         *
         * chart.on() 을 쉽게 사용 할 수 있게 해주는 유틸리티 함수
         *
         * @param {String} type event name
         * @param {Function} callback
         * @return {*}
         */
        this.on = function(type, callback) {
            var self = this;

            return this.chart.on(type, function() {
                if(_.startsWith(type, "axis.") && _.typeCheck("integer", self.axis.index)) {
                    var axis = self.chart.axis(self.axis.index),
                        e = arguments[0];

                    if (_.typeCheck("object", axis)) {
                        if (arguments[1] == self.axis.index) {
                            callback.apply(self, [ e ]);
                        }
                    }
                } else {
                    callback.apply(self, arguments);
                }
            }, "render");
        }

        this.calculate3d = function() {
            var w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                r = this.axis.degree,
                p = this.axis.perspective,
                list = arguments;

            if(!_.typeCheck("integer", r.x)) r.x = 0;
            if(!_.typeCheck("integer", r.y)) r.y = 0;
            if(!_.typeCheck("integer", r.z)) r.z = 0;

            for(var i = 0; i < list.length; i++) {
                list[i].perspective = p;
                list[i].rotate(Math.max(w, h, d), r, x + (w/2), y + (h/2), d/2);
            }
        }
	}

    Draw.setup = function() {
        return {
            /** @cfg {String} [type=null] Specifies the type of a widget/brush/grid to be added.*/
            type: null,
            /** @cfg {Boolean} [animate=false] Run the animation effect.*/
            animate: false
        }
    }

	return Draw;
});

jui.define("chart.axis", [ "util.base" ], function(_) {

    /**
     * @class chart.axis
     *
     * Axis 를 관리하는 클래스
     *
     * * x 축
     * * y 축
     * * area { x, y, width, height}
     * * data Axis 에 적용될 데이타
     *
     */
    var Axis = function(chart, originAxis, cloneAxis) {
        var self = this,
            map = null;
        var _area = {},
            _padding = {},
            _clipId = "",
            _clipPath = null,
            _clipRectId = "",
            _clipRect = null;

        function calculatePanel(a, padding) {
            a.x = getRate(a.x, chart.area('width'));
            a.y = getRate(a.y, chart.area('height'));
            a.width = getRate(a.width, chart.area('width'));
            a.height = getRate(a.height, chart.area('height'));

            a.x2 = a.x + a.width;
            a.y2 = a.y + a.height;
            
            // 패딩 개념 추가 
            a.x += padding.left || 0;
            a.y += padding.top || 0;
            
            a.x2 -= padding.right || 0;
            a.y2 -= padding.bottom || 0;
            
            a.width = a.x2 - a.x;
            a.height = a.y2 - a.y;

            return a;
        }

        function getRate(value, max) {
            if(_.typeCheck("string", value) && value.indexOf("%") > -1) {
                return max * (parseFloat(value.replace("%", "")) /100);
            }

            return value;
        }

        function drawGridType(axis, k) {
            if((k == "x" || k == "y" || k == "z") && !_.typeCheck("object", axis[k]))
                return null;

            // 축 위치 설정
            axis[k] = axis[k]  || {};

            if (k == "x") {
                axis[k].orient = axis[k].orient == "top" ? "top" : "bottom";
            } else if (k == "y") {
                axis[k].orient = axis[k].orient == "right" ? "right" : "left";
            } else if (k == "z") {
                axis[k].orient = "center";
            } else if (k == "c") {
                axis[k].type = axis[k].type || "panel";
                axis[k].orient = "custom";
            }

            axis[k].type = axis[k].type || "block";
            var Grid = jui.include("chart.grid." + axis[k].type);

            // 그리드 기본 옵션과 사용자 옵션을 합침
            jui.defineOptions(Grid, axis[k]);

            // 엑시스 기본 프로퍼티 정의
            var obj = new Grid(chart, axis, axis[k]);
            obj.chart = chart;
            obj.axis = axis;
            obj.grid = axis[k];
            obj.svg = chart.svg;

            var elem = obj.render();

            // 그리드 별 위치 선정하기 (z축이 없을 때)
            if(!self.isFull3D()) {
                if (axis[k].orient == "left") {
                    elem.root.translate(chart.area("x") + self.area("x") - axis[k].dist, chart.area("y"));
                } else if (axis[k].orient == "right") {
                    elem.root.translate(chart.area("x") + self.area("x2") + axis[k].dist, chart.area("y"));
                } else if (axis[k].orient == "bottom") {
                    elem.root.translate(chart.area("x"), chart.area("y") + self.area("y2") + axis[k].dist);
                } else if (axis[k].orient == "top") {
                    elem.root.translate(chart.area("x"), chart.area("y") + self.area("y") - axis[k].dist);
                } else {
                    if (elem.root) elem.root.translate(chart.area("x") + self.area("x"), chart.area("y") + self.area("y"));
                }
            }

            elem.scale.type = axis[k].type;
            elem.scale.root = elem.root;

            return elem.scale;
        }

        function drawMapType(axis, k) {
            if(k == "map" && !_.typeCheck("object", axis[k])) return null;

            // 축 위치 설정
            axis[k] = axis[k]  || {};

            var Map = jui.include("chart.map");

            // 맵 기본 옵션과 사용자 옵션을 합침
            jui.defineOptions(Map, axis[k]);

            // 맵 객체는 한번만 생성함
            if(map == null) {
                map = new Map(chart, axis, axis[k]);
            }

            // 맵 기본 프로퍼티 설정
            map.chart = chart;
            map.axis = axis;
            map.map = axis[k];
            map.svg = chart.svg;

            // 그리드 별 위치 선정하기
            var elem = map.render();
            elem.root.translate(chart.area("x") + self.area("x"), chart.area("y") + self.area("y"));
            elem.scale.type = axis[k].type;
            elem.scale.root = elem.root;
            
            return elem.scale;
        }
        
        function setScreen(pNo) {
            var dataList = self.origin,
                limit = self.buffer,
                maxPage = Math.ceil(dataList.length / limit);

            // 최소 & 최대 페이지 설정
            if(pNo < 1) {
                self.page = 1;
            } else {
                self.page = (pNo > maxPage) ? maxPage : pNo;
            }

            self.start = (self.page - 1) * limit, self.end = self.start + limit;

            // 마지막 페이지 처리
            if(self.end > dataList.length) {
                self.start = dataList.length - limit;
                self.end = dataList.length;
            }

            if(self.end <= dataList.length) {
                self.start = (self.start < 0) ? 0 : self.start;
                self.data = dataList.slice(self.start, self.end);

                if(dataList.length > 0) self.page++;
            }
        }

        function setZoom(start, end) {
            var dataList = self.origin;

            self.end = (end > dataList.length) ? dataList.length : end;
            self.start = (start < 0) ? 0 : start;
            self.data = dataList.slice(self.start, self.end);
        }

        function createClipPath() {
            // clippath with x, y
            if (_clipPath) {
                _clipPath.remove();
                _clipPath = null;
            }

            _clipId = _.createId("clip-id-");

            _clipPath = chart.svg.clipPath({
                id: _clipId
            }, function() {
                chart.svg.rect({
                    x: _area.x,
                    y: _area.y,
                    width: _area.width,
                    height: _area.height
                });
            });
            chart.appendDefs(_clipPath);

            // clippath without x, y
            if (_clipRect) {
                _clipRect.remove();
                _clipRect = null;
            }

            _clipRectId = _.createId("clip-rect-id-");

            _clipRect = chart.svg.clipPath({
                id: _clipRectId
            }, function() {
                chart.svg.rect({
                    x: 0,
                    y: 0,
                    width: _area.width,
                    height: _area.height
                });
            });

            chart.appendDefs(_clipRect);
        }

        function checkAxisPoint(e) {
            var top = self.area("y"),
                left = self.area("x");

            if((e.chartY > top && e.chartY < top + self.area("height")) &&
                (e.chartX > left && e.chartX < left + self.area("width"))) {

                e.axisX = e.chartX - left;
                e.axisY = e.chartY - top;

                return true;
            }

            return false;
        }

        function setAxisMouseEvent() {
            var isMouseOver = false,
                index = cloneAxis.index;

            chart.on("chart.mousemove", function(e) {
                if(checkAxisPoint(e)) {
                    if(!isMouseOver) {
                        chart.emit("axis.mouseover", [ e, index ]);
                        isMouseOver = true;
                    }
                } else {
                    if(isMouseOver) {
                        chart.emit("axis.mouseout", [ e, index ]);
                        isMouseOver = false;
                    }
                }

                if(checkAxisPoint(e)) {
                    chart.emit("axis.mousemove", [e, index]);
                }
            });

            chart.on("bg.mousemove", function(e) {
                if(!checkAxisPoint(e) && isMouseOver) {
                    chart.emit("axis.mouseout", [ e, index ]);
                    isMouseOver = false;
                }
            });

            chart.on("chart.mousedown", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.mousedown", [ e, index ]);
            });

            chart.on("chart.mouseup", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.mouseup", [ e, index ]);
            });

            chart.on("chart.click", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.click", [ e, index ]);
            });

            chart.on("chart.dbclick", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.dbclick", [ e, index ]);
            });

            chart.on("chart.rclick", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.rclick", [ e, index ]);
            });

            chart.on("chart.mousewheel", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.mousewheel", [ e, index ]);
            });
        }

        function drawAxisBackground() {
            var bw = chart.theme("axisBorderWidth"),
                lr = _padding.left + _padding.right,
                tb = _padding.top + _padding.bottom;

            var bg = chart.svg.rect({
                rx: chart.theme("axisBorderRadius"),
                ry: chart.theme("axisBorderRadius"),
                fill: chart.theme("axisBackgroundColor"),
                "fill-opacity": chart.theme("axisBackgroundOpacity"),
                stroke: chart.theme("axisBorderColor"),
                "stroke-width": bw,
                width: _area.width + lr - bw,
                height: _area.height + tb - bw,
                x: _area.x - _padding.left,
                y: _area.y - _padding.top
            });

            bg.translate(chart.area("x"), chart.area("y"));

            return bg;
        }

        function init() {
            _.extend(self, {
                data : cloneAxis.data,
                origin : cloneAxis.origin,
                buffer : cloneAxis.buffer,
                shift : cloneAxis.shift,
                index : cloneAxis.index,
                page : cloneAxis.page,
                start : cloneAxis.start,
                end : cloneAxis.end,
                degree : cloneAxis.degree,
                depth : cloneAxis.depth,
                perspective : cloneAxis.perspective
            });

            // 원본 데이터 설정
            self.origin = self.data;

            // 페이지 초기화
            if(self.start > 0 || self.end > 0) {
                setZoom(self.start, self.end);
            } else {
                setScreen(self.page);
            }

            // 엑시스 이벤트 설정
            setAxisMouseEvent();

            // Grid 및 Area 설정
            self.reload(cloneAxis);
        }
        
        /**
         * @method getValue
         *
         * 특정 필드의 값을 맵핑해서 가지고 온다.
         *
         * @param {Object} data row data
         * @param {String} fieldString 필드 이름
         * @param {String/Number/Boolean/Object} [defaultValue=''] 기본값
         * @return {Mixed}
         */
        this.getValue = function(data, fieldString, defaultValue) {
            var value = data[cloneAxis.keymap[fieldString]];
            if (!_.typeCheck("undefined", value)) {
                return value;
            }

            value = data[fieldString];
            if (!_.typeCheck("undefined", value)) {
                return value;
            }
            
            return defaultValue;
        }

        /**
         * @method reload
         * 
         * Axis 의 x,y,z 축을 다시 생성한다. 
         * * * 
         * @param {Object} options
         */
        this.reload = function(options) {
            var area = chart.area();

            _.extend(this, {
                x : options.x,
                y : options.y,
                z : options.z,
                c : options.c,
                map : options.map
            });

            // 패딩 옵션 설정
            if(_.typeCheck("integer", options.padding)) {
                _padding = { left: options.padding, right: options.padding, bottom: options.padding, top: options.padding };
            } else {
                _padding = options.padding;
            }

            _area = calculatePanel(_.extend(options.area, {
                x: 0, y: 0 , width: area.width, height: area.height
            }, true), _padding);

            // 클립 패스 설정
            createClipPath();

            this.root = drawAxisBackground();
            this.x = drawGridType(this, "x");
            this.y = drawGridType(this, "y");
            this.z = drawGridType(this, "z");
            this.c = drawGridType(this, "c");
            this.map = drawMapType(this, "map");
        }

        /**
         * @method area
         *
         * Axis 의 표시 영역을 리턴한다. 
         *  
         * @param {"x"/"y"/"width"/'height"/null} key  area's key
         * @return {Number/Object} key 가 있으면 해당 key 의 value 를 리턴한다. 없으면 전체 area 객체를 리턴한다.
         */
        this.area = function(key) {
            return _.typeCheck("undefined", _area[key]) ? _area : _area[key];
        }

        /**
         * Gets the top, bottom, left and right margin values.
         *
         * @param {"top"/"left"/"bottom"/"right"} key
         * @return {Number/Object}
         */
        this.padding = function(key) {
            return _.typeCheck("undefined", _padding[key]) ? _padding : _padding[key];
        }

        /**
         * @method get
         *
         * Axis 의 옵션 정보를 리턴한다.
         *
         * @param key
         */
        this.get = function(type) {
            var obj = {
                area: _area,
                padding: _padding,
                clipId: _clipId,
                clipRectId : _clipRectId
            };

            return obj[type] || cloneAxis[type];
        }

        /**
         * @method set
         *
         * axis의 주요 프로퍼티를 업데이트한다.
         *
         * @param {"x"/"y"/"c"/"map"/"degree"/"padding"} type
         * @param {Object} grid
         */
        this.set = function(type, value, isReset) {
            if(_.typeCheck("object", value)) {
                if (isReset === true) {
                    originAxis[type] = _.deepClone(value);
                    cloneAxis[type] = _.deepClone(value);
                } else {
                    _.extend(originAxis[type], value);
                    _.extend(cloneAxis[type], value);
                }
            } else {
                originAxis[type] = value;
                cloneAxis[type] = value;
            }

            if(chart.isRender()) chart.render();
        }

        /**
         * @deprecated
         * @method updateGrid
         *
         * grid 정보를 업데이트 한다.
         *
         * @param {"x"/"y"/"c"/"map"} type
         * @param {Object} grid
         */
        this.updateGrid = this.set;

        /**
         * @method update 
         * 
         * data 를 업데이트 한다.
         *  
         * @param {Array} data
         */
        this.update = function(data) {
            this.origin = data;
            this.page = 1;
            this.start = 0;
            this.end = 0;

            this.screen(1);
        }

        /**
         * @method screen 
         * 
         * 화면상에 보여줄 데이타를 페이징한다.  
         *  
         * @param {Number} pNo 페이지 번호 
         */
        this.screen = function(pNo) {
            setScreen(pNo);

            if(this.end <= this.origin.length) {
                if(chart.isRender()) chart.render();
            }
        }

        /**
         * @method next 
         * 
         */
        this.next = function() {
            var dataList = this.origin,
                limit = this.buffer,
                step = this.shift;

            this.start += step;

            var isLimit = (this.start + limit > dataList.length);

            this.end = (isLimit) ? dataList.length : this.start + limit;
            this.start = (isLimit) ? dataList.length - limit : this.start;
            this.start = (this.start < 0) ? 0 : this.start;
            this.data = dataList.slice(this.start, this.end);

            if(chart.isRender()) chart.render();
        }

        /**
         * @method prev  
         */
        this.prev = function() {
            var dataList = this.origin,
                limit = this.buffer,
                step = this.shift;

            this.start -= step;

            var isLimit = (this.start < 0);

            this.end = (isLimit) ? limit : this.start + limit;
            this.start = (isLimit) ? 0 : this.start;
            this.data = dataList.slice(this.start, this.end);

            if(chart.isRender()) chart.render();
        }

        /**
         * @method zoom 
         * 
         * 특정 인덱스의 영역으로 데이타를 다시 맞춘다.
         *
         * @param {Number} start
         * @param {Number} end
         */
        this.zoom = function(start, end) {
            if(start == end) return;

            setZoom(start, end);
            if(chart.isRender()) chart.render();
        }

        this.isFull3D = function() {
            return !_.typeCheck([ "undefined", "null" ], this.z);
        }

        init();
    }

    Axis.setup = function() {

        /** @property {chart.grid.core} [x=null] Sets a grid on the X axis (see the grid tab). */
        /** @property {chart.grid.core} [y=null] Sets a grid on the Y axis (see the grid tab). */
        /** @property {chart.grid.core} [c=null] Sets a custom grid (see the grid tab). */
        /** @property {chart.map} [map=null] Sets a chart map. */
        /** @property {Array} [data=[]] Sets the row set data which constitute a chart. */
        /** @property {Integer} [buffer=10000] Limits the number of elements shown on a chart. */
        /** @property {Integer} [shift=1] Data shift count for the 'prev' or 'next' method of the chart builder. */
        /** @property {Array} [origin=[]] [For read only] Original data initially set. */
        /** @property {Integer} [page=1] [For read only] Page number of the data currently drawn. */
        /** @property {Integer} [start=0] [For read only] Start index of the data currently drawn. */
        /** @property {Integer} [end=0] [For read only] End index of the data currently drawn. */

        return {
            /** @cfg {Integer} [extend=null]  Configures the index of an applicable grid group when intending to use already configured axis options. */
            extend: null,

            /** @cfg {chart.grid.core} [x=null] Sets a grid on the X axis (see the grid tab). */
            x: null,
            /** @cfg {chart.grid.core} [y=null]  Sets a grid on the Y axis (see the grid tab). */
            y: null,
            /** @cfg {chart.grid.core} [z=null] Sets a grid on the Z axis (see the grid tab). */
            z: null,
            /** @cfg {chart.grid.core} [c=null] Sets a grid on the C axis (see the grid tab). */
            c: null,
            /** @cfg {chart.map.core} [map=null] Sets a map on the Map axis */
            map : null,
            /** @cfg {Array} [data=[]]  Sets the row set data which constitute a chart.  */
            data: [],
            /** @cfg {Array} [origin=[]]  [Fore read only] Original data initially set. */
            origin: [],
            /** @cfg {Object} [keymap={}] grid's data key map  */
            keymap: {},
            /** @cfg {Object} [area={}]  set area(x, y, width, height) of axis */
            area: {},
            /**
             * @cfg  {Object} padding axis padding
             * @cfg  {Number} [padding.top=0] axis's top padding
             * @cfg  {Number} [padding.bottom=0] axis's bottom padding
             * @cfg  {Number} [padding.left=0] axis's left padding
             * @cfg  {Number} [padding.right=0] axis's right padding
             */
            padding : {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            /** @cfg {Number} [buffer=10000] Limits the number of elements shown on a chart.  */
            buffer: 10000,
            /** @cfg {Number} [shift=1]  Data shift count for the 'prev' or 'next' method of the chart builder.  */
            shift: 1,

            /** @cfg {Number} [page=1]  Page number of the data currently drawn. */
            page: 1,
            /** @cfg {Number} [start=0] */
            start: 0,
            /** @cfg {Number} [end=0] */
            end: 0,
            /**
             * @cfg  {Object} Set degree of 3d chart
             * @cfg  {Number} [degree.x=0] axis's x-degree
             * @cfg  {Number} [degree.y=0] axis's y-degree
             * @cfg  {Number} [degree.z=0] axis's z-degree
             */
            degree: {
                x: 0,
                y: 0,
                z: 0
            },
            /** @cfg {Number} [depth=0]  Set depth of 3d chart  */
            depth: 0,
            /** @cfg {Number} [perspective=0.9]  Set perspective values in the 3d chart  */
            perspective: 0.9
        }
    }

    return Axis;
});

jui.define("chart.map", [ "util.base", "util.dom", "util.math", "util.svg" ], function(_, $, math, SVG) {
    /**
     * @class chart.grid.core
     * @extends chart.draw
     * @abstract
     */
    var Map = function() {
        var self = this;
        var pathData = {},
            pathGroup = null,
            pathIndex = {},
            pathScale = 1,
            pathX = 0,
            pathY = 0;

        function loadArray(data) {
            var children = [];

            for(var i = 0, len = data.length; i < len; i++) {
                if(_.typeCheck("object", data[i])) {
                    var style = {};

                    if(_.typeCheck("string", data[i].style)) {
                        style = getStyleObj(data[i].style);
                        delete data[i].style;
                    }

                    var elem = SVG.createObject({
                        type: (data[i].d != null) ? "path" : "polygon",
                        attr: data[i]
                    });

                    // Set styles
                    elem.attr(_.extend(style, {
                        fill: self.chart.theme("mapPathBackgroundColor"),
                        "fill-opacity": self.chart.theme("mapPathBackgroundOpacity"),
                        stroke: self.chart.theme("mapPathBorderColor"),
                        "stroke-width": self.chart.theme("mapPathBorderWidth"),
                        "stroke-opacity": self.chart.theme("mapPathBorderOpacity")
                    }));

                    children.push({
                        path: elem,
                        data: data[i]
                    });
                }
            }

            function getStyleObj(str) {
                var style = {},
                    list = str.split(";");

                for(var i = 0; i < list.length; i++) {
                    if(list[i].indexOf(":") != -1) {
                        var obj = list[i].split(":");

                        style[_.trim(obj[0])] = _.trim(obj[1]);
                    }
                }

                return style;
            }

            return children;
        }

        function getPathList(root) {
            if(!_.typeCheck("string", root.id)) return;

            var pathData = [],
                children = root.childNodes;

            for(var i = 0, len = children.length; i < len; i++) {
                var elem = children[i],
                    name = elem.nodeName.toLowerCase();

                if(elem.nodeType != 1) continue;

                if(name == "g") {
                    pathData = pathData.concat(getPathList(elem));
                } else if(name == "path" || name == "polygon") {
                    var obj = { group: root.id };

                    for(var key in elem.attributes) {
                        var attr = elem.attributes[key];

                        if(attr.specified && isLoadAttribute(attr.name)) {
                            obj[attr.name] = replaceXYValue(attr);
                        }
                    }

                    if(_.typeCheck("string", obj.id)) {
                        _.extend(obj, getDataById(obj.id));
                    }

                    pathData.push(obj);
                }
            }

            return pathData;
        }

        function loadPath(uri) {
            // 해당 URI의 데이터가 존재할 경우
            if(_.typeCheck("array", pathData[uri])) {
                return loadArray(pathData[uri]);
            }

            // 해당 URI의 데이터가 없을 경우
            pathData[uri] = [];

            _.ajax({
                url: uri,
                async: false,
                success: function(xhr) {
                    var xml = xhr.responseXML,
                        svg = xml.getElementsByTagName("svg"),
                        style = xml.getElementsByTagName("style");

                    if(svg.length != 1) return;
                    var children = svg[0].childNodes;

                    for(var i = 0, len = children.length; i < len; i++) {
                        var elem = children[i],
                            name = elem.nodeName.toLowerCase();

                        if(elem.nodeType != 1) continue;

                        if(name == "g") {
                            pathData[uri] = pathData[uri].concat(getPathList(elem));
                        } else if(name == "path" || name == "polygon") {
                            var obj = {};

                            for(var key in elem.attributes) {
                                var attr = elem.attributes[key];

                                if(attr.specified && isLoadAttribute(attr.name)) {
                                    obj[attr.name] = replaceXYValue(attr);
                                }
                            }

                            if(_.typeCheck("string", obj.id)) {
                                _.extend(obj, getDataById(obj.id));
                            }

                            pathData[uri].push(obj);
                        }
                    }

                    // 스타일 태그가 정의되어 있을 경우
                    for(var i = 0; i < style.length; i++) {
                        self.svg.root.element.appendChild(style[i]);
                    }
                },
                fail: function(xhr) {
                    throw new Error("JUI_CRITICAL_ERR: Failed to load resource");
                }
            });

            return loadArray(pathData[uri]);
        }

        function isLoadAttribute(name) {
            return (
                name == "group" || name == "id" || name == "title" || name == "x" || name == "y" ||
                name == "d" || name == "points" || name == "class" || name == "style"
            );
        }

        function replaceXYValue(attr) {
            if(attr.name == "x" || attr.name == "y") {
                return parseFloat(attr.value);
            }

            return attr.value;
        }

        function getDataById(id) {
            var list = self.axis.data;

            for(var i = 0; i < list.length; i++) {
                var dataId = self.axis.getValue(list[i], "id", null);

                if(dataId == id) {
                    return list[i];
                }
            }

            return null;
        }

        function makePathGroup() {
            var group = self.chart.svg.group(),
                list = loadPath(self.map.path);

            for(var i = 0, len = list.length; i < len; i++) {
                var path = list[i].path,
                    data = list[i].data;

                //addEvent(path, list[i]);
                group.append(path);

                if(_.typeCheck("string", data.id)) {
                    pathIndex[data.id] = list[i];
                }
            }

            return group;
        }

        function getScaleXY() { // 차후에 공통 함수로 변경해야 함
            var w = self.map.width,
                h = self.map.height,
                px = ((w * pathScale) - w) / 2,
                py = ((h * pathScale) - h) / 2;

            return {
                x: px + pathX,
                y: py + pathY
            }
        }

        function addEvent(elem, obj) {
            var chart = self.chart;

            elem.on("click", function(e) {
                setMouseEvent(e);
                chart.emit("map.click", [ obj, e ]);
            });

            elem.on("dblclick", function(e) {
                setMouseEvent(e);
                chart.emit("map.dblclick", [ obj, e ]);
            });

            elem.on("contextmenu", function(e) {
                setMouseEvent(e);
                chart.emit("map.rclick", [ obj, e ]);
                e.preventDefault();
            });

            elem.on("mouseover", function(e) {
                setMouseEvent(e);
                chart.emit("map.mouseover", [ obj, e ]);
            });

            elem.on("mouseout", function(e) {
                setMouseEvent(e);
                chart.emit("map.mouseout", [ obj, e ]);
            });

            elem.on("mousemove", function(e) {
                setMouseEvent(e);
                chart.emit("map.mousemove", [ obj, e ]);
            });

            elem.on("mousedown", function(e) {
                setMouseEvent(e);
                chart.emit("map.mousedown", [ obj, e ]);
            });

            elem.on("mouseup", function(e) {
                setMouseEvent(e);
                chart.emit("map.mouseup", [ obj, e ]);
            });

            function setMouseEvent(e) {
                var pos = $.offset(chart.root),
                    offsetX = e.pageX - pos.left,
                    offsetY = e.pageY - pos.top;

                e.bgX = offsetX;
                e.bgY = offsetY;
                e.chartX = offsetX - chart.padding("left");
                e.chartY = offsetY - chart.padding("top");
            }
        }

        this.scale = function(id) {
            if(!_.typeCheck("string", id)) return;

            var x = null,
                y = null,
                path = null,
                data = null,
                pxy = getScaleXY();

            if(_.typeCheck("object", pathIndex[id])) {
                path = pathIndex[id].path;
                data = pathIndex[id].data;

                if(data.x != null) {
                    var dx = self.axis.getValue(data, "dx", 0),
                        cx = parseFloat(data.x) + dx;
                    x = (cx * pathScale) - pxy.x;
                }

                if(data.y != null) {
                    var dy = self.axis.getValue(data, "dy", 0),
                        cy = parseFloat(data.y) + dy;
                    y = (cy * pathScale) - pxy.y;
                }
            }

            return {
                x: x,
                y: y,
                path: path,
                data: data
            }
        }

        this.scale.each = function(callback) {
            var self = this;

            for(var id in pathIndex) {
                callback.apply(self, [ id, pathIndex[id] ]);
            }
        }

        this.scale.size = function() {
            return {
                width: self.map.width,
                height: self.map.height
            }
        }

        this.scale.scale = function(scale) {
            if(!scale || scale < 0) return pathScale;

            pathScale = scale;
            pathGroup.scale(pathScale);
            this.view(pathX, pathY);

            return pathScale;
        }

        this.scale.view = function(x, y) {
            var xy = { x: pathX, y: pathY };

            if(!_.typeCheck("number", x) || !_.typeCheck("number", y))
                return xy;

            pathX = x;
            pathY = y;

            var pxy = getScaleXY();
            pathGroup.translate(-pxy.x, -pxy.y);

            return {
                x: pathX,
                y: pathY
            }
        }

        this.draw = function() {
            var root = this.chart.svg.group();

            pathScale = this.map.scale;
            pathX = this.map.viewX;
            pathY = this.map.viewY;
            pathGroup = makePathGroup();

            // pathGroup 루트에 추가
            root.append(pathGroup);

            if(this.map.scale != 1) {
                this.scale.scale(pathScale);
            }

            if(this.map.viewX != 0 || this.map.viewY != 0) {
                this.scale.view(pathX, pathY);
            }

            if(this.map.hide) {
                root.attr({ visibility: "hidden" });
            }

            return {
                root: root,
                scale: this.scale
            };
        }

        this.drawAfter = function(obj) {
            obj.root.attr({ "clip-path": "url(#" + this.axis.get("clipRectId") + ")" });

            // 모든 path가 그려진 이후에 이벤트 설정
            setTimeout(function() {
                self.scale.each(function(id, obj) {
                    addEvent(obj.path, obj);
                });
            }, 1);
        }
    }

    Map.setup = function() {
        /** @property {chart.builder} chart */
        /** @property {chart.axis} axis */
        /** @property {Object} map */

        return {
            scale: 1,
            viewX: 0,
            viewY: 0,

            /** @cfg {Boolean} [hide=false] Determines whether to display an applicable grid.  */
            hide: false,
            /** @cfg {String} [map=''] Set a map file's name */
            path: "",
            /** @cfg {Number} [width=-1] Set map's width */
            width: -1,
            /** @cfg {Number} [height=-1] Set map's height */
            height: -1
        };
    }

    /**
     * @event map_click
     * Event that occurs when clicking on the map area. (real name ``` map.click ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_dblclick
     * Event that occurs when double clicking on the map area. (real name ``` map.dblclick ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_rclick
     * Event that occurs when right clicking on the map area. (real name ``` map.rclick ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mouseover
     * Event that occurs when placing the mouse over the map area. (real name ``` map.mouseover ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mouseout
     * Event that occurs when moving the mouse out of the map area. (real name ``` map.mouseout ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mousemove
     * Event that occurs when moving the mouse over the map area. (real name ``` map.mousemove ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mousedown
     * Event that occurs when left clicking on the map area. (real name ``` map.mousedown ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mouseup
     * Event that occurs after left clicking on the map area. (real name ``` map.mouseup ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */

    return Map;
}, "chart.draw"); 
jui.defineUI("chart.builder", [ "util.base", "util.dom", "util.svg", "util.color", "chart.axis" ],
    function(_, $, SVGUtil, ColorUtil, Axis) {

    _.resize(function() {
        var call_list = jui.get("chart.builder");

        for(var i = 0; i < call_list.length; i++) {
            var ui_list = call_list[i];

            for(var j = 0; j < ui_list.length; j++) {
                ui_list[j].resize();
            }
        }
    }, 1000);

    /**
     * @class chart.builder
     *
     * Implements chart builder
     *
     * @extends core
     * @alias ChartBuilder
     * @requires util.base
     * @requires util.svg
     * @requires util.color
     * @requires chart.axis
     * @requires jquery
     *
     */
    var UI = function() {
        var _axis = [], _brush = [], _widget = [], _defs = null;
        var _padding, _area,  _theme, _hash = {};
        var _initialize = false, _options = null, _handler = { render: [], renderAll: [] }; // 리셋 대상 커스텀 이벤트 핸들러
        var _canvas = { main: null, sub: null }; // 캔버스 모드 전용

        function calculate(self) {
            var max = self.svg.size();

            var _chart = {
                width: max.width - (_padding.left + _padding.right),
                height: max.height - (_padding.top + _padding.bottom),
                x: _padding.left,
                y: _padding.top
            };

            // chart 크기가 마이너스일 경우 (엘리먼트가 hidden 상태)
            if(_chart.width < 0) _chart.width = 0;
            if(_chart.height < 0) _chart.height = 0;

            // _chart 영역 계산
            _chart.x2 = _chart.x + _chart.width;
            _chart.y2 = _chart.y + _chart.height;

            _area = _chart;
        }

        function drawBefore(self) {
            _brush = _.deepClone(_options.brush);
            _widget = _.deepClone(_options.widget);

            // defs 엘리먼트 생성
            _defs = self.svg.defs();

            // 해쉬 코드 초기화
            _hash = {};
        }

        function drawAxis(self) {
            
            // 엑시스 리스트 얻어오기
            var axisList = _.deepClone(_options.axis, { data : true, origin : true });

            for(var i = 0; i < axisList.length; i++) {
                jui.defineOptions(Axis, axisList[i]);

                // 엑시스 인덱스 설정
                axisList[i].index = i;

                if(!_axis[i]) {
                    _axis[i] = new Axis(self, _options.axis[i], axisList[i]);
                } else {
                    _axis[i].reload(axisList[i]);
                }
            }
        }

        function drawBrush(self) {
            var draws = _brush;

            if(draws != null) {
                for(var i = 0; i < draws.length; i++) {
                    var Obj = jui.include("chart.brush." + draws[i].type);

                    // 브러쉬 기본 옵션과 사용자 옵션을 합침
                    jui.defineOptions(Obj, draws[i]);
                    var axis = _axis[draws[i].axis];

                    // 타겟 프로퍼티 설정
                    if(!draws[i].target) {
                        var target = [];

                        if(axis) {
                            for(var key in axis.data[0]) {
                                target.push(key);
                            }
                        }

                        draws[i].target = target;
                    } else if(_.typeCheck("string", draws[i].target)) {
                        draws[i].target = [ draws[i].target ];
                    }

                    // 브러쉬 인덱스 설정
                    draws[i].index = i;

                    // 브러쉬 기본 프로퍼티 정의
                    var draw = new Obj(self, axis, draws[i]);
                    draw.chart = self;
                    draw.axis = axis;
                    draw.brush = draws[i];
                    draw.svg = self.svg;
                    draw.canvas = _canvas.main;

                    // 브러쉬 렌더링
                    draw.render();
                }
            }
        }

        function drawWidget(self, isAll) {
            var draws = _widget;

            if(draws != null) {
                for(var i = 0; i < draws.length; i++) {
                    var Obj = jui.include("chart.widget." + draws[i].type);

                    // 위젯 기본 옵션과 사용자 옵션을 합침
                    jui.defineOptions(Obj, draws[i]);

                    // 위젯 인덱스 설정
                    draws[i].index = i;

                    // 위젯 기본 프로퍼티 정의
                    var draw = new Obj(self, _axis[0], draws[i]);
                    draw.chart = self;
                    draw.axis = _axis[0];
                    draw.widget = draws[i];
                    draw.svg = self.svg;
                    draw.canvas = _canvas.sub;

                    // 위젯은 렌더 옵션이 false일 때, 최초 한번만 로드함 (연산 + 드로잉)
                    // 하지만 isAll이 true이면, 강제로 연산 및 드로잉을 함 (테마 변경 및 리사이징 시)
                    if(_initialize && !draw.isRender() && isAll !== true) {
                        return;
                    }

                    var elem = draw.render();
                    if(!draw.isRender()) {
                        self.svg.autoRender(elem, false);
                    }
                }
            }
        }

        function setCommonEvents(self, elem) {
            var isMouseOver = false;

            elem.on("click", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.click", [ e ]);
                } else {
                    self.emit("chart.click", [ e ]);
                }
            });

            elem.on("dblclick", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.dblclick", [ e ]);
                } else {
                    self.emit("chart.dblclick", [ e ]);
                }
            });

            elem.on("contextmenu", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.rclick", [ e ]);
                } else {
                    self.emit("chart.rclick", [ e ]);
                }

                e.preventDefault();
            });

            elem.on("mousemove", function(e) {
                if (!checkPosition(e)) {
                    if (isMouseOver) {
                        self.emit("chart.mouseout", [ e ]);
                        isMouseOver = false;
                    }

                    self.emit("bg.mousemove", [ e ]);
                } else {
                    if (isMouseOver) {
                        self.emit("chart.mousemove", [ e ]);
                    } else {
                        self.emit("chart.mouseover", [ e ]);
                        isMouseOver = true;
                    }
                }
            });

            elem.on("mousedown", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mousedown", [ e ]);
                } else {
                    self.emit("chart.mousedown", [ e ]);
                }
            });

            elem.on("mouseup", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mouseup", [ e ]);
                } else {
                    self.emit("chart.mouseup", [ e ]);
                }
            });

            elem.on("mouseover", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mouseover", [ e ]);
                }
            });

            elem.on("mouseout", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mouseout", [ e ]);
                }
            });

            elem.on("mousewheel", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mousewheel", [ e ]);
                } else {
                    self.emit("chart.mousewheel", [ e ]);
                }
            });

            function checkPosition(e) {
                var pos = $.offset(self.root),
                    offsetX = e.pageX - pos.left,
                    offsetY = e.pageY - pos.top;

                e.bgX = offsetX;
                e.bgY = offsetY;
                e.chartX = offsetX - self.padding("left");
                e.chartY = offsetY - self.padding("top");

                if(e.chartX < 0) return;
                if(e.chartX > self.area("width")) return;
                if(e.chartY < 0) return;
                if(e.chartY > self.area("height")) return;

                return true;
            }
        }

        function resetCustomEvent(self, isAll) {
            for(var i = 0; i < _handler.render.length; i++) {
                self.off(_handler.render[i]);
            }
            _handler.render = [];

            if(isAll === true) {
                for(var i = 0; i < _handler.renderAll.length; i++) {
                    self.off(_handler.renderAll[i]);
                }
                _handler.renderAll = [];
            }
        }

        function createGradient(obj, hashKey) {
            if(!_.typeCheck("undefined", hashKey) && _hash[hashKey]) {
                return "url(#" + _hash[hashKey] + ")";
            }

            var g = null,
                id = _.createId("gradient");

            obj.attr.id = id;

            g = SVGUtil.createObject(obj);

            _defs.append(g);

            if(!_.typeCheck("undefined", hashKey)) {
                _hash[hashKey] = id;
            }

            return "url(#" + id + ")";
        }
        
        function createPattern(obj) {
            if (_.typeCheck("string", obj)) {
                obj = obj.replace("url(#", "").replace(")", "");

                if(_hash[obj]) {
                    return "url(#" + obj + ")";
                }
                
                // already pattern id 
                if (obj.indexOf('pattern-') == -1) {
                    return false
                }

                var arr = obj.split("-"),
                    method = arr.pop();

                var pattern = jui.include("chart." + arr.join("."));
                
                if (!pattern) {
                    return false;
                }

                var patternElement = pattern[method];
                
                if (typeof patternElement == 'function') {
                    patternElement = patternElement.call(patternElement);
                }

                // json 객체를 svg element 로 변환
                if (patternElement.attr && !patternElement.attr.id) {
                    patternElement.attr.id = obj;
                }

                patternElement = SVGUtil.createObject(patternElement);

                _defs.append(patternElement);
                
                _hash[obj] = obj;
                
                return "url(#" + obj + ")";
                
            } else {
                obj.attr.id = obj.attr.id || _.createId('pattern-');

                if (_hash[obj.attr.id]) {
                    return "url(#" + obj.attr.id + ")";
                }                
                
                var patternElement = SVGUtil.createObject(obj);
                
                _defs.append(patternElement);
                
                _hash[obj.attr.id] = obj.attr.id;
                
                return "url(#" + obj.attr.id + ")";
            }
        }

        function createColor(color) {
            if(_.typeCheck("undefined", color)) {
                return "none";
            }

            if(_.typeCheck("object", color)) {
                
                if (color.type == "pattern") {
                    return createPattern(color);
                } else {
                    return createGradient(color);
                }
            }
            
            if (typeof color == "string") {
                var url = createPattern(color);
                if (url) {
                    return url; 
                }
            }

            var parsedColor = ColorUtil.parse(color);
            if(parsedColor == color)
                return color;

            return createGradient(parsedColor, color);
        }

        function setThemeStyle(theme) {
            var style = {};

            // 테마를 하나의 객체로 Merge
            if(_.typeCheck("string", theme)) {
                _.extend(style, jui.include("chart.theme." + theme));
                _.extend(style, _options.style);
            } else if(_.typeCheck("object", theme)) {
                _.extend(_theme, _options.style);
                _.extend(_theme, theme);
                _.extend(style, _theme);
            }

            // 최종 렌더링에 적용되는 객체
            _theme = style;
        }

        function setDefaultOptions(self) {
            // 일부 옵션을 제외하고 클론
            _options = _.deepClone(self.options, { data: true, bind: true });

            var padding = _options.padding;

            // 패딩 옵션 설정
            if(_.typeCheck("integer", padding)) {
                _padding = { left: padding, right: padding, bottom: padding, top: padding };
            } else {
                _padding = padding;
            }

            // UI 바인딩 설정 (차후에 변경, 현재는 첫번째 엑시스로 고정)
            if(_.typeCheck("object", _options.bind)) {
                self.bindUI(0, _options.bind);
            }

            // Draw 옵션 설정
            if(!_.typeCheck("array", _options.axis)) {
                _options.axis = [ _options.axis ];
            }

            if(!_.typeCheck("array", _options.brush)) {
                _options.brush = [ _options.brush ];
            }

            if(!_.typeCheck("array", _options.widget)) {
                _options.widget = [ _options.widget ];
            }

            // Axis 확장 설정
            for(var i = 0; i < _options.axis.length; i++) {
                var axis = _options.axis[i];
                _.extend(axis, _options.axis[axis.extend], true);
            }
        }

        function setVectorFontIcons() {
            var icon = _options.icon;
            if(!_.typeCheck([ "string", "array" ], icon.path)) return;

            var pathList = (_.typeCheck("string", icon.path)) ? [ icon.path ] : icon.path,
                urlList = [];

            for(var i = 0; i < pathList.length; i++) {
                var path = pathList[i],
                    url = "url(" + path + ") ";

                if (path.indexOf(".eot") != -1) {
                    url += "format('embedded-opentype')";
                } else if (path.indexOf(".woff") != -1) {
                    url += "format('woff')";
                } else if (path.indexOf(".ttf") != -1) {
                    url += "format('truetype')";
                } else if (path.indexOf(".svg") != -1) {
                    url += "format('svg')";
                }

                urlList.push(url);
            }

            var fontFace = "font-family: " + icon.type + "; font-weight: normal; font-style: normal; src: " + urlList.join(",");

            (function(rule) {
                var sheet = (function() {
                    var style = document.createElement("style");

                    style.appendChild(document.createTextNode(""));
                    document.head.appendChild(style);

                    return style.sheet;
                })();

                sheet.insertRule(rule, 0);
            })("@font-face {" + fontFace + "}");
        }

        function parseIconInText(self, text) {
            var regex = /{([^{}]+)}/g,
                result = text.match(regex);

            if(result != null) {
                for(var i = 0; i < result.length; i++) {
                    var key = result[i].substring(1, result[i].length - 1);
                    text = text.replace(result[i], self.icon(key));
                }
            }

            return text;
        }

        function getCanvasRealSize(self) {
            var size = self.svg.size();

            return {
                width : (_.typeCheck("integer", _options.width)) ? _options.width : size.width,
                height : (_.typeCheck("integer", _options.height)) ? _options.height : size.height
            }
        }

        function initRootStyles(root) {
            root.style.position = "relative";
            root.style.userSelect = "none";
            root.style.webkitUserSelect = "none";
            root.style.MozUserSelect = "none";
            root.setAttribute("unselectable", "on");
        }

        function initCanvasElement(self) {
            var size = getCanvasRealSize(self);

            for(var key in _canvas) {
                var elem = document.createElement("CANVAS");

                elem.setAttribute("width", size.width);
                elem.setAttribute("height", size.height);
                elem.style.position = "absolute";
                elem.style.left = "0px";
                elem.style.top = "0px";

                // Context 설정하기
                if (elem.getContext) {
                    _canvas[key] = elem.getContext("2d");
                    self.root.appendChild(elem);
                }

                // Widget 캔버스 이벤트 함수 정의
                if (key == "sub") {
                    elem.on = function(type, handler) {
                        var callback = function(e) {
                            if(typeof(handler) == "function") {
                                handler.call(this, e);
                            }
                        }

                        elem.addEventListener(type, callback, false);
                        return this;
                    }
                }
            }
        }

        function resetCanvasElement(self, type) {
            var size = getCanvasRealSize(self),
                context = _canvas[type];

            context.restore();
            context.clearRect(0, 0, size.width, size.height);
            context.save();

            if(type == "main") {
                context.translate(_area.x, _area.y);
            }
        }

        this.init = function() {
            // 기본 옵션 설정
            setDefaultOptions(this);

            // 차트 테마 설정 (+옵션 스타일)
            setThemeStyle(_options.theme);

            // 루트 엘리먼트 기본 스타일 설정
            initRootStyles(this.root);

            /** @property {chart.svg} svg Refers to an SVG utility object. */
            this.svg = new SVGUtil(this.root, {
                width: _options.width,
                height: _options.height,
                "buffered-rendering" : "dynamic"
            });

            // canvas 기본 객체 생성
            if(_options.canvas) {
                initCanvasElement(this);
                setCommonEvents(this, $.find(this.root, "CANVAS")[1]);
            } else {
                setCommonEvents(this, this.svg.root);
            }

            // 아이콘 폰트 설정
            setVectorFontIcons();

            // 차트 기본 렌더링
            this.render();
        }
        
        /**
         * @method get  
         *
         * Gets a named axis, brush, widget (type: axis, brush, widget, padding, area)
         *
         * @param {"axis"/"brush"/"widget"/"padding"/"area"} type
         * @param {String} key  Property name
         * @return {Mixed/Object}
         */
        this.get = function(type, key) {
            var obj = {
                axis: _axis,
                brush: _brush,
                widget: _widget,
                padding: _padding,
                area: _area
            };

            if(obj[type][key]) {
                return obj[type][key];
            }

            return obj[type] || obj;
        }

        /**
         * Gets the axis object of that index.
         *
         * @param {Number} key
         * @returns {Array/Object}
         */
        this.axis = function(key) {
            return (arguments.length == 0) ? _axis : _axis[key];
        }

        /**
         * Gets a calculated value for a chart area (type: width, height, x, y, x2, y2)).
         *
         * @param {String} key
         * @return {Number/Object}
         */
        this.area = function(key) {
            return _.typeCheck("undefined", _area[key]) ? _area : _area[key];
        }

        /**
         * Gets the top, bottom, left and right margin values.
         *
         * @param {"top"/"left"/"bottom"/"right"} key
         * @return {Number/Object}
         */
        this.padding = function(key) {
            return _.typeCheck("undefined", _padding[key]) ? _padding : _padding[key];
        }

        /**
         * Gets a color defined in the theme or the color set.
         *
         * @param {Number/String} key
         * @param {Array} colors
         * @param {Array} target
         * @return {String} Selected color string
         */
        this.color = function(key, colors) {
            var color = null;

            // 직접 색상을 추가할 경우 (+그라데이션, +필터)
            if(arguments.length == 1) {
                if(_.typeCheck("string", key)) {
                    color = key;
                } else if(_.typeCheck("integer", key)) {
                    color = nextColor(key);
                }
            } else {
                // 테마 & 브러쉬 옵션 컬러 설정
                if(_.typeCheck([ "array", "object" ], colors)) {
                    color = colors[key];

                    if(_.typeCheck("integer", color)) {
                        color = nextColor(color);
                    }
                } else {
                    color = nextColor();
                }
            }

            if(_hash[color]) {
                return "url(#" + _hash[color] + ")";
            }

            function nextColor(newIndex) {
                var c = _theme["colors"],
                    index = newIndex || key;

                return (index > c.length - 1) ? c[c.length - 1] : c[index];
            }

            return createColor(color);
        }

        /**
         * Gets the unicode string of the icon.
         *
         * @param {String} key  icon's alias
         */
        this.icon = function(key) {
            return jui.include("chart.icon." + _options.icon.type)[key];
        }

        /**
         * Creates a text element to which a theme is applied.
         *
         * Also it support icon string
         *
         * @param {Object} attr
         * @param {String|Function} textOrCallback
         */
        this.text = function(attr, textOrCallback) {
            if(_.typeCheck("string", textOrCallback)) {
                textOrCallback = parseIconInText(this, textOrCallback);
            } else if(_.typeCheck("undefined", textOrCallback)) {
                textOrCallback = "";
            }

            return this.svg.text(attr, textOrCallback);
        }

        /**
         * Creates a text element to which a theme is applied.
         *
         * Also it support icon string
         *
         * @param {Object} attr
         * @param {Array} texts
         * @param {Number} lineBreakRate
         */
        this.texts = function(attr, texts, lineBreakRate) {
            var g = this.svg.group();

            for(var i = 0; i < texts.length; i++) {
                if(_.typeCheck("string", texts[i])) {
                    var size = (attr["font-size"] || 10) * (lineBreakRate || 1);

                    g.append(this.svg.text(
                        _.extend({ y: i * size }, attr, true),
                        parseIconInText(this, texts[i])
                    ));
                }
            }

            return g;
        }

        /**
         * @method theme
         *
         * Gets a value for the theme element applied to the current chart.
         *
         * ```
         *      // get all theme property
         *      var theme = chart.theme();
         *      // get a part of theme
         *      var fontColor = chart.theme("fontColor");
         *      // get selected value of theme
         *      chart.theme(isSelected, "selectedFontColor", "fontColor");  // if isSelected is true, return 'selectedFontColor' else return 'fontColor'
         * ```
         */
        this.theme = function(key, value, value2) {
            if(arguments.length == 0) {
                return _theme;
            } else if(arguments.length == 1) {
                if(key.indexOf("Color") > -1 && _theme[key] != null) {
                    return createColor(_theme[key]);
                }

                return _theme[key];
            } else if(arguments.length == 3) {
                var val = (key) ? value : value2;

                if(val.indexOf("Color") > -1 && _theme[val] != null) {
                    return createColor(_theme[val]);
                }

                return _theme[val];
            }
        }

        /**
         * Returns a value from the format callback function of a defined option.
         *
         * @param {Function} format
         * @return {Mixed}
         */
        this.format = function() {
            if(arguments.length == 0) return;
            var callback = _options.format;

            if(_.typeCheck("function", callback)) {
                return callback.apply(this, arguments);
            }

            return arguments[0];
        }

        /**
         * @method bindUI 
         * 
         * Binds data used in a uix.table or the uix.xtable.
         *
         * @param {Number} axisIndex
         * @param {Object} uiObj
         */
        this.bindUI = function(axisIndex, uiObj) {
            var self = this;

            if(uiObj.module.type == "grid.table") {
                uiObj.callAfter("update", updateTable);
                uiObj.callAfter("sort", updateTable);
                uiObj.callAfter("append", updateTable);
                uiObj.callAfter("insert", updateTable);
                uiObj.callAfter("remove", updateTable);
            } else if(uiObj.module.type == "grid.xtable") {
                uiObj.callAfter("update", updateTable);
                uiObj.callAfter("sort", updateTable);
            }

            function updateTable() {
                self.axis(axisIndex).update(uiObj.listData());
            }
        }

        /**
         * @method on
         * 
         * A callback function defined as an on method is run when an emit method is called.
         *
         * @param {String} type Event's name
         * @param {Function} callback
         * @param {"render"/"renderAll"/undefined} resetType
         */
        this.on = function(type, callback, resetType) {
            if(!_.typeCheck("string", type)  || !_.typeCheck("function", callback)) return;

            this.event.push({ type: type.toLowerCase(), callback: callback  });

            // 브러쉬나 위젯에서 설정한 이벤트 핸들러만 추가
            if(resetType == "render" || resetType == "renderAll") {
                _handler[resetType].push(callback);
            }
        }

        /**
         * @method render 
         *
         * Renders all draw objects.
         *
         * @param {Boolean} isAll
         */
        this.render = function(isAll) {
            // SVG 메인 리셋
            this.svg.reset(isAll);

            // chart 이벤트 초기화 (삭제 대상)
            resetCustomEvent(this, isAll);

            // chart 영역 계산
            calculate(this);

            // Canvas 초기 설정
            if(this.options.canvas) {
                resetCanvasElement(this, "main");

                if(isAll) {
                    resetCanvasElement(this, "sub");
                }
            }

            // chart 관련된 요소 draw
            drawBefore(this);
            drawAxis(this);
            drawBrush(this);
            drawWidget(this, isAll);

            // SVG 기본 테마 설정
            this.svg.root.css({
                "font-family": this.theme("fontFamily") + "," + _options.icon.type,
                background: this.theme("backgroundColor")
            });

            // SVG 메인/서브 렌더링
            this.svg.render(isAll);

            // 커스텀 이벤트 발생
            this.emit("render", [ _initialize ]);

            // 초기화 및 렌더링 체크 설정
            _initialize = true;
        }

        /**
         * @method appendDefs
         *
         * Add the child element in defs tag.
         *
         * @param {chart.svg.element} elem
         */
        this.appendDefs = function(elem) {
            _defs.append(elem);
        }

        /**
         * @method addBrush 
         * 
         * Adds a brush and performs rendering again.
         *  
         * @param {Object} brush
         */
        this.addBrush = function(brush) {
            _options.brush.push(brush);
            if(this.isRender()) this.render();
        }

        /**
         * @method removeBrush 
         * 
         * Deletes the brush of a specified index and performs rendering again.
         * @param {Number} index
         */
        this.removeBrush = function(index) {
            _options.brush.splice(index, 1);
            if(this.isRender()) this.render();
        }

        /**
         * @method updateBrush 
         * Updates the brush of a specified index and performs rendering again.
         * @param {Number} index
         * @param {Object} brush
         * @param {Boolean} isReset
         */
        this.updateBrush = function(index, brush, isReset) {
            if(isReset === true) {
                _options.brush[index] = brush;
            } else {
                _.extend(_options.brush[index], brush);
            }

            if(this.isRender()) this.render();
        }

        /**
         * @method addWidget 
         * Adds a widget and performs rendering again.
         * 
         * @param {Object} widget
         */
        this.addWidget = function(widget) {
            _options.widget.push(widget);
            if(this.isRender()) this.render();
        }

        /**
         * @method removeWidget 
         * Deletes the widget of a specified index and performs rendering again.
         * @param {Number} index
         */
        this.removeWidget = function(index) {
            _options.widget.splice(index, 1);
            if(this.isRender()) this.render();
        }

        /**
         * @method updateWidget
         * Updates the widget of a specified index and performs rendering again
         * @param {Number} index
         * @param {Object} widget
         * @param {Boolean} isReset
         */
        this.updateWidget = function(index, widget, isReset) {
            if(isReset === true) {
                _options.widget[index] = widget;
            } else {
                _.extend(_options.widget[index], widget);
            }

            if(this.isRender()) this.render();
        }

        /**
         * Changes a chart to a specified theme and renders the chart again.
         *
         * @param {String/Object} theme
         */
        this.setTheme = function(theme) {
            setThemeStyle(theme);
            if(this.isRender()) this.render(true);
        }

        /**
         * Changes the size of a chart to the specified area and height then performs rendering.
         *
         * @param {Number} width
         * @param {Number} height
         */
        this.setSize = function(width, height) {
            if(arguments.length == 2) {
                _options.width = width;
                _options.height = height;
            }

            // Resize svg
            this.svg.size(_options.width, _options.height);

            // Resize canvas
            if(_options.canvas) {
                var list = $.find(this.root, "CANVAS"),
                    size = getCanvasRealSize(this);

                for(var i = 0; i < list.length; i++) {
                    list[i].setAttribute("width", size.width);
                    list[i].setAttribute("height", size.height);
                }
            }

            if(this.isRender()) this.render(true);
        }

        /**
         * Returns true if the horizontal or vertical size of the chart is 100%.
         *
         * @return {Boolean}
         */
        this.isFullSize = function() {
            if(_options.width == "100%" || _options.height == "100%")
                return true;

            return true;
        }

        /**
         * Resize the chart to fit the screen width.
         *
         */
        this.resize = function() {
            if(this.isFullSize()) {
                this.setSize();
            }

            if(!this.isRender()) {
                this.render(true);
            }
        }

        /**
         * Returns the values of rendering options and, if the rendering option is false, does not render the chart again when a method is called.
         *
         * @return {Boolean}
         */
        this.isRender = function() {
            return (!_initialize) ? true : _options.render;
        }
    }

    UI.setup = function() {
        return {
            /** @cfg  {String/Number} [width="100%"] chart width */ 
            width: "100%",
            /** @cfg  {String/Number} [height="100%"] chart height */
            height: "100%",
            /** 
             * @cfg  {Object} padding chart padding 
             * @cfg  {Number} [padding.top=50] chart padding 
             * @cfg  {Number} [padding.bottom=50] chart padding
             * @cfg  {Number} [padding.left=50] chart padding
             * @cfg  {Number} [padding.right=50] chart padding
             */
            padding: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            },

            /** @cfg  {String} [theme=jennifer] chart theme  */
            theme: "jennifer",
            /** @cfg  {Object} style chart custom theme  */
            style: {},
            /** @cfg {Array} brush Determines a brush to be added to a chart. */
            brush: [],
            /** @cfg {Array} widget Determines a widget to be added to a chart. */
            widget: [],
            /** @cfg {Array} [axis=[]] Determines a axis to be added to a chart. */
            axis: [],

            /** @cfg {Object} [bind=null] Sets a component objects to be bind.*/
            bind: null,
            /** @cfg {Function} [format=null] Sets a format callback function to be used in a grid/brush/widget. */
            format: null,
            /** @cfg {Boolean} [render=true] Does not render a chart when a rendering-related method is called with false (although the render method is not included). */
            render: true,

            /**
             * @cfg {Object} icon Icon-related settings available in the chart.
             * @cfg {String} [icon.type="jennifer"]
             * @cfg {String} [icon.path=null]
             */
            icon: {
                type: "jennifer",
                path: null
            },

            /** @cfg {Boolean} [canvas=false] */
            canvas: false
        }
    }

    /**
     * @event chart_click
     * Event that occurs when clicking on the chart area. (real name ``` chart.click ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_dblclick
     * Event that occurs when double clicking on the chart area. (real name ``` chart.dblclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_rclick
     * Event that occurs when right clicking on the chart area. (real name ``` chart.rclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mouseover
     * Event that occurs when placing the mouse over the chart area. (real name ``` chart.mouseover ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mouseout
     * Event that occurs when moving the mouse out of the chart area. (real name ``` chart.mouseout ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mousemove
     * Event that occurs when moving the mouse over the chart area. (real name ``` chart.mousemove ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mousedown
     * Event that occurs when left clicking on the chart area. (real name ``` chart.mousedown ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mouseup
     * Event that occurs after left clicking on the chart area. (real name ``` chart.mouseup ```)
     * @param {jQueryEvent} e The event object.
     */

    /**
     * @event bg_click
     * Event that occurs when clicking on the chart margin. (real name ``` bg.click ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_dblclick
     * Event that occurs when double clicking on the chart margin. (real name ``` bg.dblclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_rclick
     * Event that occurs when right clicking on the chart margin. (real name ``` bg.rclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mouseover
     * Event that occurs when placing the mouse over the chart margin. (real name ``` bg.mouseover ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mouseout
     * Event that occurs when moving the mouse out of the chart margin. (real name ``` bg.mouseout ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mousemove
     * Event that occurs when moving the mouse over the chart margin. (real name ``` bg.mousemove ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mousedown
     * Event that occurs when left clicking on the chart margin. (real name ``` bg.mousedown ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mouseup
     * Event that occurs after left clicking on the chart margin. (real name ``` bg.mouseup ```)
     * @param {jQueryEvent} e The event object.
     */

    return UI;
}, "core");

jui.define("chart.theme.jennifer", [], function() {

    /**
     * @class chart.theme.jennifer
     * Jennifer Theme
     * @singleton
     */
    var themeColors = [
        "#7977C2",
        "#7BBAE7",
        "#FFC000",
        "#FF7800",
        "#87BB66",
        "#1DA8A0",
        "#929292",
        "#555D69",
        "#0298D5",
        "#FA5559",
        "#F5A397",
        "#06D9B6",
        "#C6A9D9",
        "#6E6AFC",
        "#E3E766",
        "#C57BC3",
        "#DF328B",
        "#96D7EB",
        "#839CB5",
        "#9228E4"
    ];

    return {
        fontFamily : "arial,Tahoma,verdana",
    	backgroundColor : "#fff",
        colors : themeColors,

        // Axis styles
        axisBackgroundColor : "#fff",
        axisBackgroundOpacity : 0,
        axisBorderColor : "#fff",
        axisBorderWidth : 0,
        axisBorderRadius : 0,

        // Grid styles
        gridXFontSize : 11,
        gridYFontSize : 11,
        gridZFontSize : 10,
        gridCFontSize : 11,
    	gridXFontColor : "#333",
        gridYFontColor : "#333",
        gridZFontColor : "#333",
        gridCFontColor : "#333",
        gridXFontWeight : "normal",
        gridYFontWeight : "normal",
        gridZFontWeight : "normal",
        gridCFontWeight : "normal",
        gridXAxisBorderColor : "#bfbfbf",
        gridYAxisBorderColor : "#bfbfbf",
        gridZAxisBorderColor : "#bfbfbf",
        gridXAxisBorderWidth : 2,
        gridYAxisBorderWidth : 2,
        gridZAxisBorderWidth : 2,

        // Full 3D 전용 테마
        gridFaceBackgroundColor: "#dcdcdc",
        gridFaceBackgroundOpacity: 0.3,

    	gridActiveFontColor : "#ff7800",
        gridActiveBorderColor : "#ff7800",
        gridActiveBorderWidth : 1,
        gridPatternColor : "#ababab",
        gridPatternOpacity : 0.1,
        gridBorderColor : "#ebebeb",
    	gridBorderWidth : 1,
        gridBorderDashArray : "none",
        gridBorderOpacity : 1,
        gridTickBorderSize : 3,
        gridTickBorderWidth : 1.5,
        gridTickPadding : 5,

        // Brush styles
        tooltipPointRadius : 5, // common
        tooltipPointBorderWidth : 1, // common
        tooltipPointFontWeight : "bold", // common
        tooltipPointFontSize : 11,
        tooltipPointFontColor : "#333",
        barFontSize : 11,
        barFontColor : "#333",
        barBorderColor : "none",
        barBorderWidth : 0,
        barBorderOpacity : 0,
        barBorderRadius : 3,
        barPointBorderColor : "#fff",
        barDisableBackgroundOpacity : 0.4,
    	gaugeBackgroundColor : "#ececec",
        gaugeArrowColor : "#666666",
        gaugeFontColor : "#666666",
        gaugeFontSize : 20,
        gaugeFontWeight : "bold",
        gaugeTitleFontSize : 12,
        gaugeTitleFontWeight : "normal",
        gaugeTitleFontColor : "#333",
        bargaugeBackgroundColor : "#ececec",
        bargaugeFontSize : 11,
        bargaugeFontColor : "#333333",
    	pieBorderColor : "#ececec",
        pieBorderWidth : 1,
        pieOuterFontSize : 11,
        pieOuterFontColor : "#333",
        pieOuterLineColor : "#a9a9a9",
        pieOuterLineSize : 8,
        pieOuterLineRate : 1.3,
        pieInnerFontSize : 11,
        pieInnerFontColor : "#333",
        pieActiveDistance : 5,
    	areaBackgroundOpacity : 0.5,
        areaSplitBackgroundColor : "#929292",
        bubbleBackgroundOpacity : 0.5,
        bubbleBorderWidth : 1,
        bubbleFontSize : 12,
        bubbleFontColor : "#fff",
        candlestickBorderColor : "#000",
        candlestickBackgroundColor : "#fff",
        candlestickInvertBorderColor : "#ff0000",
        candlestickInvertBackgroundColor : "#ff0000",
        ohlcBorderColor : "#000",
        ohlcInvertBorderColor : "#ff0000",
        ohlcBorderRadius : 5,
        lineBorderWidth : 2,
        lineBorderDashArray : "none",
        lineDisableBorderOpacity : 0.3,
        linePointBorderColor : "#fff",
        lineSplitBorderColor : null,
        lineSplitBorderOpacity : 0.5,
        pathBackgroundOpacity : 0.5,
        pathBorderWidth : 1,
        scatterBorderColor : "#fff",
        scatterBorderWidth : 1,
        scatterHoverColor : "#fff",
        waterfallBackgroundColor : "#87BB66",
        waterfallInvertBackgroundColor : "#FF7800",
        waterfallEdgeBackgroundColor : "#7BBAE7",
        waterfallLineColor : "#a9a9a9",
        waterfallLineDashArray : "0.9",
        focusBorderColor : "#FF7800",
        focusBorderWidth : 1,
        focusBackgroundColor : "#FF7800",
        focusBackgroundOpacity : 0.1,
        pinFontColor : "#FF7800",
        pinFontSize : 10,
        pinBorderColor : "#FF7800",
        pinBorderWidth : 0.7,
        topologyNodeRadius : 12.5,
        topologyNodeFontSize : 14,
        topologyNodeFontColor : "#fff",
        topologyNodeTitleFontSize : 11,
        topologyNodeTitleFontColor : "#333",
        topologyEdgeWidth : 1,
        topologyActiveEdgeWidth : 2,
        topologyHoverEdgeWidth : 2,
        topologyEdgeColor : "#b2b2b2",
        topologyActiveEdgeColor : "#905ed1",
        topologyHoverEdgeColor : "#d3bdeb",
        topologyEdgeFontSize : 10,
        topologyEdgeFontColor : "#666",
        topologyEdgePointRadius : 3,
        topologyEdgeOpacity : 1,
        topologyTooltipBackgroundColor : "#fff",
        topologyTooltipBorderColor : "#ccc",
        topologyTooltipFontSize : 11,
        topologyTooltipFontColor : "#333",

        timelineTitleFontSize: 11,
        timelineTitleFontColor: "#333",
        timelineColumnFontSize: 10,
        timelineColumnFontColor: "#333",
        timelineColumnBackgroundColor: "linear(top) #f9f9f9,1 #e9e9e9",
        timelineEvenRowBackgroundColor: "#fafafa",
        timelineOddRowBackgroundColor: "#f1f0f3",
        timelineActiveBarBackgroundColor: "#9262cf",
        timelineHoverBarBackgroundColor: null,
        timelineLayerBackgroundOpacity: 0.15,
        timelineActiveLayerBackgroundColor: "#A75CFF",
        timelineActiveLayerBorderColor: "#caa4f5",
        timelineHoverLayerBackgroundColor: "#DEC2FF",
        timelineHoverLayerBorderColor: "#caa4f5",
        timelineVerticalLineColor: "#c9c9c9",
        timelineHorizontalLineColor: "#d2d2d2",

        hudColumnGridPointRadius: 7,
        hudColumnGridPointBorderColor: "#868686",
        hudColumnGridPointBorderWidth: 2,
        hudColumnGridFontColor: "#868686",
        hudColumnGridFontSize: 12,
        hudColumnGridFontWeight: "normal",
        hudColumnLeftBackgroundColor: "#3C3C3C",
        hudColumnRightBackgroundColor: "#838383",
        hudBarGridFontColor: "#868686",
        hudBarGridFontSize: 16,
        hudBarGridLineColor: "#868686",
        hudBarGridLineWidth: 1,
        hudBarGridLineOpacity: 0.8,
        hudBarGridBackgroundColor: "#868686",
        hudBarGridBackgroundOpacity: 0.5,
        hudBarTextLineColor: "#B2A6A6",
        hudBarTextLineWidth: 1.5,
        hudBarTextLinePadding: 12,
        hudBarTextLineFontColor: "#868686",
        hudBarTextLineFontSize: 13,
        hudBarBackgroundOpacity: 0.6,
        hudBarTopBackgroundColor: "#bbb",
        hudBarBottomBackgroundColor: "#3C3C3C",

        heatmapBackgroundColor: "#fff",
        heatmapBackgroundOpacity: 1,
        heatmapHoverBackgroundOpacity: 0.2,
        heatmapBorderColor: "#000",
        heatmapBorderWidth: 0.5,
        heatmapBorderOpacity: 1,
        heatmapFontSize: 11,
        heatmapFontColor: "#000",

        pyramidLineColor: "#fff",
        pyramidLineWidth: 1,
        pyramidTextLineColor: "#a9a9a9",
        pyramidTextLineWidth: 1,
        pyramidTextLineSize: 30,
        pyramidTextFontSize: 10,
        pyramidTextFontColor: "#333",

        // Widget styles
        titleFontColor : "#333",
        titleFontSize : 13,
        titleFontWeight : "normal",
        legendFontColor : "#333",
        legendFontSize : 12,
        legendSwitchCircleColor : "#fff",
        legendSwitchDisableColor : "#c8c8c8",
        tooltipFontColor : "#333",
        tooltipFontSize : 12,
        tooltipBackgroundColor : "#fff",
        tooltipBackgroundOpacity : 0.7,
        tooltipBorderColor : null,
        tooltipBorderWidth : 2,
        tooltipLineColor : null,
        tooltipLineWidth : 0.7,
        scrollBackgroundSize : 7,
        scrollBackgroundColor : "#dcdcdc",
        scrollThumbBackgroundColor : "#b2b2b2",
        scrollThumbBorderColor : "#9f9fa4",
        zoomBackgroundColor : "#ff0000",
        zoomFocusColor : "#808080",
        zoomScrollBackgroundSize : 45,
        zoomScrollButtonImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAA7VmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMi0yM1QyMjoxMDowOSswOTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDItMjNUMjI6MTA6MDkrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZjEyZjk2NS02OTgxLTQxZTktYTU3Ny0zMmMwMDg2NjBhMjM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjNlNTQzMi0xYWJkLTExNzktYjc1Ny1lYmNlZjk1ZGNmOGE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjMjgwNGJmNi0zZTI5LTQ4NTQtOGRhMi05MjAyMDVkNDAzMDY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzI4MDRiZjYtM2UyOS00ODU0LThkYTItOTIwMjA1ZDQwMzA2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWYxMmY5NjUtNjk4MS00MWU5LWE1NzctMzJjMDA4NjYwYTIzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkxNzEzNDYtMTllNS0xMTc5LTg1YjUtZjAwOGZkMGY4OTgyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDozNWYyZjJkMC0xNmY3LTQ1YjktYjI3MS0zY2VkNTgwZmNjNmE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFwcGxlIFJHQjwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+32DD9QAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AABkYElEQVR4AQBQZK+bAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP////8BAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQAAAAAAAAABAAAAAAAAAAEAAAABAAAAAAAAAAIAAAABAAAAAQAAAAJ5eXkLaGhoNw8PDykFBQUmBQUFJAEBARgCAgILAQEBDQEBAQz////0////8/7+/vX9/f3p+vr63fb29tzt7e3WiYmJzKKiovYAAAD/AAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAD/AAAAAAEBAQAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wAAAAABAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAACAAAAAnR0dEy8/Pzhfv7+8X////5/////////////////////////////////////////////////////////////////////////////////v7++vf398jr6+uKtLS0OgAAABMAAAASAAAAEAAAAA4AAAAMAAAACwAAAAkAAAAIAAAABgAAAAUAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAABgAAAAifn58Y8vLydPv7+8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+dHi4uJ8ampqJAAAABQAAAASAAAAEAAAAA0AAAALAAAACgAAAAgAAAAGAAAABQAAAAQAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAADAAAABAAAAAYAAAAItra2HPT09In+/v7x/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f398ujo6JB5eXkqAAAAFQAAABMAAAAQAAAADgAAAAwAAAAJAAAACAAAAAYAAAAEAAAAAwAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAAB2ZmZg/z8/OA/v7+9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v715eXliTMzMx4AAAAWAAAAEwAAABAAAAAOAAAACwAAAAkAAAAHAAAABQAAAAQAAAADAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAADAAAABAAAAAYAAAAI5+fnS/39/dr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+d7Dw8NZAAAAGQAAABYAAAASAAAADwAAAAwAAAAKAAAACAAAAAYAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAMAAAAFAAAABmJiYg329vaT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+6OjonCgoKCAAAAAYAAAAFQAAABEAAAAOAAAACwAAAAgAAAAGAAAABQAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAACAAAABAAAAAUAAAAHzc3NKfv7+8z///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29tGMjIw8AAAAGwAAABcAAAATAAAADwAAAAwAAAAJAAAABwAAAAUAAAAEAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAEAAAABQAAAAfc3Nw7/v7+6f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vsp6enTgAAAB0AAAAYAAAAFAAAABAAAAANAAAACgAAAAcAAAAFAAAABAAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAQAAAAFAAAAB+fn50r+/v7z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f399La2tl4AAAAfAAAAGgAAABUAAAARAAAADQAAAAoAAAAHAAAABQAAAAQAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAABAAAAAUAAAAH5+fnSf////n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vqzs7NeAAAAIAAAABsAAAAWAAAAEgAAAA4AAAAKAAAABwAAAAUAAAAEAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAALc3NwzHR0dsAEBAQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQMjIyNFISEhybGxsesAAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAsjIyCMsLCy5AQEBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIGLCwsRv///73CwsLyAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAGgICAEv39/dD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T09NgwMDAwAAAAIgAAABwAAAAWAAAAEQAAAA0AAAAJAAAABgAAAAQAAAADAAAAAgAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAC9/f3kwgICGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj4+OqHh4efwAAAPkAAAD6AAAA+gAAAPsAAAD8AAAA/AAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAALk5ORECAgIYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR1VqqqqPgAAAAYAAAAFAAAABQAAAAQAAAADAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAAEAAAAB2lpaRH9/f3b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9vb24CMjIzMAAAAmAAAAHwAAABgAAAATAAAADgAAAAoAAAAHAAAABAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAGAAAACfPz84H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PT05UAAAArAAAAJAAAAB0AAAAXAAAAEQAAAAwAAAAJAAAABgAAAAQAAAACAwAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAADsrKyGSwsLKUBAQEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFCzY2Ni01dXV9QAAAP8AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAD9fX1iwoKCmsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb29unJiYmiAAAAPkAAAD4AAAA+QAAAPoAAAD8AAAA+wAAAP0AAAD+BAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAKXl5cSCQkJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiJQPz8/m8HBwesAAAD9AAAA/QAAAP4AAAD+AAAAAwAAAP8AAAD/AgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAJXV1deAQEBCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJiIiIUAAAAAQAAAAEAAAABAAAAAMAAAADAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAINDQ1fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tTgAAAAUAAAAFAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAABAAAAAc/Pzy4EBAQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLIICAgCkAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAiEhIVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE9PT0IAAAAEAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQoKCkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fHzgAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAChISEDwUFBS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECUyMjIOAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAEAAAAAAAAAAQAAAAEAAAABVVVVNQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQJlZWUsAAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABERERJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJychAAAAAwAAAAMAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAACCAgIJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxceAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAABBgYGJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUFBQdAAAAAwAAAAMAAAACAAAAAwAAAAIAAAABAgAAAAEAAAABAAAAAQAAAAEAAAABAgICFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgRAAAAAgAAAAIAAAACAAAAAQAAAAEAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABAgICDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQKAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAAAAAABAgICDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYKAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAAAQEBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAB////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35AAAAAQAAAAIAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAAA////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v77AAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAB/f397wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5+fn0AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz85wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAA9/f33QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OTlAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP8AAAD/5+fn2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXjAAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAgAAAAAAAAAAAAAA/wAAAAAAAAD/l5eXzwAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////6enp7aAAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAD/AAAAAAAAAP8AAAAAoqKi8vf399UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3t7d/X19f1AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAAAAAAA/wAAAAAAAAD/AAAA/+/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2M4AAAD+AAAA/gAAAP8AAAD+AAAA/wAAAP4AAAD/AgAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/8TExLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqMYAAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ldXV9X5+fndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw5JWVld4AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD+AgAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP7i4uKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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/QAAAP0AAAD9AAAA/AAAAPwAAAD8AAAA+wAAAPwAAAD7AAAA/AAAAPwAAAD8AAAA/AAAAP0AAAD9AAAA/gAAAP4AAAD/AAAA/gAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/gAAAAEAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/QAAAP0AAAAEAAAABAAAAPwAAAAEAAAABAAAAAQAAAADAAAAAwAAAAIAAAADAAAAAgAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP0AAAD+AAAA/QAAAP0AAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/QAAAPwAAAD9AAAA/QAAAP0AAAD+AAAA/wAAAP4AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAABAAAA/wAAAAAAAAD+AAAAAQAAAAAAAAAAAAAA/wAAAP4AAAD+AAAAAwAAAP4AAAD9AAAA/QAAAPwAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAIAAAABAAAAAQAAAAIAAAAAAAAAAAAAAAEAAAD/AAAAAAAAAAAAAAD+AAAA/wAAAP8AAAD+AAAA/gAAAP0AAAD9AAAA/gAAAPwAAAD9AAAA/QAAAPwAAAD9AAAA/AAAAP0AAAD8AAAA/QAAAP0AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAAAAAAAAAAAAP4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4AAAADAAAA/QAAAAMAAAD8AAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAAAAAgAAAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP4AAAD+AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD+AAAA/QAAAP4AAAD+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAMAAAACAAAAAgAAAAMAAAACAAAAAwAAAAIAAAADAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/QAAAP4AAAD9AAAA/gAAAP4AAAD9AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAACAAAAAQAAAP0AAAADAAAA/QAAAAIAAAACAAAAAgAAAAIAAAABAAAAAgAAAAEAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA//+C+dbJggW+VAAAAABJRU5ErkJggg==",
        zoomScrollButtonSize : 18,
        zoomScrollAreaBackgroundColor : "#fff",
        zoomScrollAreaBackgroundOpacity : 0.7,
        zoomScrollAreaBorderColor : "#d4d4d4",
        zoomScrollAreaBorderWidth : 1,
        zoomScrollAreaBorderRadius : 3,
        zoomScrollGridFontSize : 10,
        zoomScrollGridTickPadding : 4,
        zoomScrollBrushAreaBackgroundOpacity : 0.7,
        zoomScrollBrushLineBorderWidth : 1,
        crossBorderColor : "#a9a9a9",
        crossBorderWidth : 1,
        crossBorderOpacity : 0.8,
        crossBalloonFontSize : 11,
        crossBalloonFontColor : "#fff",
        crossBalloonBackgroundColor : "#000",
        crossBalloonBackgroundOpacity : 0.5,
        dragSelectBackgroundColor : "#7BBAE7",
        dragSelectBackgroundOpacity : 0.3,
        dragSelectBorderColor : "#7BBAE7",
        dragSelectBorderWidth : 1,

        // Map Common
        mapPathBackgroundColor : "#67B7DC",
        mapPathBackgroundOpacity : 1,
        mapPathBorderColor : "#fff",
        mapPathBorderWidth : 1,
        mapPathBorderOpacity : 1,
        // Map Brushes
        mapBubbleBackgroundOpacity : 0.5,
        mapBubbleBorderWidth : 1,
        mapBubbleFontSize : 11,
        mapBubbleFontColor : "#fff",
        mapSelectorHoverColor : "#5a73db",
        mapSelectorActiveColor : "#CC0000",
        mapFlightRouteAirportSmallColor : "#CC0000",
        mapFlightRouteAirportLargeColor : "#000",
        mapFlightRouteAirportBorderWidth : 2,
        mapFlightRouteAirportRadius : 8,
        mapFlightRouteLineColor : "#ff0000",
        mapFlightRouteLineWidth : 1,
        mapWeatherBackgroundColor : "#fff",
        mapWeatherBorderColor : "#a9a9a9",
        mapWeatherFontSize : 11,
        mapWeatherTitleFontColor : "#666",
        mapWeatherInfoFontColor : "#ff0000",
        mapCompareBubbleMaxLineColor : "#fff",
        mapCompareBubbleMaxLineDashArray : "2,2",
        mapCompareBubbleMaxBorderColor : "#fff",
        mapCompareBubbleMaxFontSize : 36,
        mapCompareBubbleMaxFontColor : "#fff",
        mapCompareBubbleMinBorderColor : "#ffff00",
        mapCompareBubbleMinFontSize : 24,
        mapCompareBubbleMinFontColor : "#000",
        // Map Widgets
        mapControlButtonColor : "#3994e2",
        mapControlLeftButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI9poMcdXpOKTujw0pGjAgA7",
        mapControlRightButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI8JycvonomSKhksxBqbAgA7",
        mapControlTopButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pCmvd2IkzUYqw27yfAgA7",
        mapControlBottomButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pyw37TDxTUhhq0q2fAgA7",
        mapControlHomeButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAAAAAAAAACH5BAUAAAEALAAAAAALAAsAAAIZjI8ZoAffIERzMVMxm+9KvIBh6Imb2aVMAQA7",
        mapControlUpButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAISjI8ZoMhtHpQH2HsV1TD29SkFADs=",
        mapControlDownButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIMjI+py+0BopSv2qsKADs=",
        mapControlScrollColor : "#000",
        mapControlScrollLineColor : "#fff",
        mapMinimapBackgroundColor : "transparent",
        mapMinimapBorderColor : "transparent",
        mapMinimapBorderWidth : 1,
        mapMinimapPathBackgroundColor : "#67B7DC",
        mapMinimapPathBackgroundOpacity : 0.5,
        mapMinimapPathBorderColor : "#67B7DC",
        mapMinimapPathBorderWidth : 0.5,
        mapMinimapPathBorderOpacity : 0.1,
        mapMinimapDragBackgroundColor : "#7CC7C3",
        mapMinimapDragBackgroundOpacity : 0.3,
        mapMinimapDragBorderColor : "#56B4AF",
        mapMinimapDragBorderWidth : 1,


        // Polygon Brushes
        polygonColumnBackgroundOpacity: 0.6,
        polygonColumnBorderOpacity: 0.5,
        polygonScatterRadialOpacity: 0.7,
        polygonScatterBackgroundOpacity: 0.8,
        polygonLineBackgroundOpacity: 0.6,
        polygonLineBorderOpacity: 0.7
    }
});
jui.define("chart.theme.gradient", [], function() {
    var themeColors = [
        "linear(top) #9694e0,0.9 #7977C2",
        "linear(top) #a1d6fc,0.9 #7BBAE7",
        "linear(top) #ffd556,0.9 #ffc000",
        "linear(top) #ff9d46,0.9 #ff7800",
        "linear(top) #9cd37a,0.9 #87bb66",
        "linear(top) #3bb9b2,0.9 #1da8a0",
        "linear(top) #b3b3b3,0.9 #929292",
        "linear(top) #67717f,0.9 #555d69",
        "linear(top) #16b5f6,0.9 #0298d5",
        "linear(top) #ff686c,0.9 #fa5559",
        "linear(top) #fbbbb1,0.9 #f5a397",
        "linear(top) #3aedcf,0.9 #06d9b6",
        "linear(top) #d8c2e7,0.9 #c6a9d9",
        "linear(top) #8a87ff,0.9 #6e6afc",
        "linear(top) #eef18c,0.9 #e3e768",
        "linear(top) #ee52a2,0.9 #df328b",
        "linear(top) #b6e5f4,0.9 #96d7eb",
        "linear(top) #93aec8,0.9 #839cb5",
        "linear(top) #b76fef,0.9 #9228e4"
    ];

    return {
        backgroundColor : "#fff",
        fontFamily : "arial,Tahoma,verdana",
        colors : themeColors,

        // Axis styles
        axisBackgroundColor : "#fff",
        axisBackgroundOpacity : 0,
        axisBorderColor : "#fff",
        axisBorderWidth : 0,
        axisBorderRadius : 0,

        // Grid styles
        gridXFontSize : 11,
        gridYFontSize : 11,
        gridZFontSize : 10,
        gridCFontSize : 11,
        gridXFontColor : "#666",
        gridYFontColor : "#666",
        gridZFontColor : "#666",
        gridCFontColor : "#666",
        gridXFontWeight : "normal",
        gridYFontWeight : "normal",
        gridZFontWeight : "normal",
        gridCFontWeight : "normal",
        gridXAxisBorderColor : "#efefef",
        gridYAxisBorderColor : "#efefef",
        gridZAxisBorderColor : "#efefef",
        gridXAxisBorderWidth : 2,
        gridYAxisBorderWidth : 2,
        gridZAxisBorderWidth : 2,

        // Full 3D 전용 테마
        gridFaceBackgroundColor: "#dcdcdc",
        gridFaceBackgroundOpacity: 0.3,

        gridActiveFontColor : "#ff7800",
        gridActiveBorderColor : "#ff7800",
        gridActiveBorderWidth : 1,
        gridPatternColor : "#ababab",
        gridPatternOpacity : 0.1,
        gridBorderColor : "#efefef",
        gridBorderWidth : 1,
        gridBorderDashArray : "none",
        gridBorderOpacity : 1,
        gridTickBorderSize : 3,
        gridTickBorderWidth : 1.5,
        gridTickPadding : 5,

        // Brush styles
        tooltipPointRadius : 5, // common
        tooltipPointBorderWidth : 1, // common
        tooltipPointFontWeight : "bold", // common
        tooltipPointFontColor : "#333",
        barFontSize : 11,
        barFontColor : "#333",
        barBorderColor : "none",
        barBorderWidth : 0,
        barBorderOpacity : 0,
        barBorderRadius : 3,
        barActiveBackgroundColor : "linear(top) #3aedcf,0.9 #06d9b6",
        barPointBorderColor : "#fff",
        barDisableBackgroundOpacity : 0.4,
        gaugeBackgroundColor : "#ececec",
        gaugeArrowColor : "#666666",
        gaugeFontColor : "#666666",
        gaugeFontSize : 20,
        gaugeFontWeight : "bold",
        gaugeTitleFontSize : 12,
        gaugeTitleFontWeight : "normal",
        gaugeTitleFontColor : "#333",
        bargaugeBackgroundColor : "#ececec",
        bargaugeFontSize : 11,
        bargaugeFontColor : "#333333",
        pieBorderColor : "#fff",
        pieBorderWidth : 1,
        pieOuterFontSize : 11,
        pieOuterFontColor : "#333",
        pieOuterLineColor : "#a9a9a9",
        pieOuterLineSize : 8,
        pieOuterLineRate : 1.3,
        pieInnerFontSize : 11,
        pieInnerFontColor : "#333",
        pieActiveDistance : 5,
        areaBackgroundOpacity : 0.4,
        areaSplitBackgroundColor : "linear(top) #b3b3b3,0.9 #929292",
        bubbleBackgroundOpacity : 0.5,
        bubbleBorderWidth : 1,
        bubbleFontSize : 12,
        bubbleFontColor : "#fff",
        candlestickBorderColor : "#000",
        candlestickBackgroundColor : "linear(top) #fff",
        candlestickInvertBorderColor : "#ff0000",
        candlestickInvertBackgroundColor : "linear(top) #ff0000",
        ohlcBorderColor : "#14be9d",
        ohlcInvertBorderColor : "#ff4848",
        ohlcBorderRadius : 5,
        lineBorderWidth : 2,
        lineBorderDashArray : "none",
        lineDisableBorderOpacity : 0.3,
        linePointBorderColor : "#fff",
        lineSplitBorderColor : null,
        lineSplitBorderOpacity : 0.5,
        pathBackgroundOpacity : 0.5,
        pathBorderWidth : 1,
        scatterBorderColor : "#fff",
        scatterBorderWidth : 2,
        scatterHoverColor : "#fff",
        waterfallBackgroundColor : "linear(top) #9cd37a,0.9 #87bb66",
        waterfallInvertBackgroundColor : "linear(top) #ff9d46,0.9 #ff7800",
        waterfallEdgeBackgroundColor : "linear(top) #a1d6fc,0.9 #7BBAE7",
        waterfallLineColor : "#a9a9a9",
        waterfallLineDashArray : "0.9",
        focusBorderColor : "#FF7800",
        focusBorderWidth : 1,
        focusBackgroundColor : "#FF7800",
        focusBackgroundOpacity : 0.1,
        pinFontColor : "#FF7800",
        pinFontSize : 10,
        pinBorderColor : "#FF7800",
        pinBorderWidth : 0.7,

        topologyNodeRadius : 12.5,
        topologyNodeFontSize : 14,
        topologyNodeFontColor : "#fff",
        topologyNodeTitleFontSize : 11,
        topologyNodeTitleFontColor : "#333",
        topologyEdgeWidth : 1,
        topologyActiveEdgeWidth : 2,
        topologyHoverEdgeWidth : 2,
        topologyEdgeColor : "#b2b2b2",
        topologyActiveEdgeColor : "#905ed1",
        topologyHoverEdgeColor : "#d3bdeb",
        topologyEdgeFontSize : 10,
        topologyEdgeFontColor : "#666",
        topologyEdgePointRadius : 3,
        topologyEdgeOpacity : 1,
        topologyTooltipBackgroundColor : "#fff",
        topologyTooltipBorderColor : "#ccc",
        topologyTooltipFontSize : 11,
        topologyTooltipFontColor : "#333",

        timelineTitleFontSize: 11,
        timelineTitleFontColor: "#333",
        timelineColumnFontSize: 10,
        timelineColumnFontColor: "#333",
        timelineColumnBackgroundColor: "linear(top) #f9f9f9,1 #e9e9e9",
        timelineEvenRowBackgroundColor: "#fafafa",
        timelineOddRowBackgroundColor: "#f1f0f3",
        timelineActiveBarBackgroundColor: "#9262cf",
        timelineHoverBarBackgroundColor: null,
        timelineLayerBackgroundOpacity: 0.15,
        timelineActiveLayerBackgroundColor: "#A75CFF",
        timelineActiveLayerBorderColor: "#caa4f5",
        timelineHoverLayerBackgroundColor: "#DEC2FF",
        timelineHoverLayerBorderColor: "#caa4f5",
        timelineVerticalLineColor: "#c9c9c9",
        timelineHorizontalLineColor: "#d2d2d2",

        hudColumnGridPointRadius: 7,
        hudColumnGridPointBorderColor: "#868686",
        hudColumnGridPointBorderWidth: 2,
        hudColumnGridFontColor: "#868686",
        hudColumnGridFontSize: 12,
        hudColumnGridFontWeight: "normal",
        hudColumnLeftBackgroundColor: "#3C3C3C",
        hudColumnRightBackgroundColor: "#838383",
        hudBarGridFontColor: "#868686",
        hudBarGridFontSize: 16,
        hudBarGridLineColor: "#868686",
        hudBarGridLineWidth: 1,
        hudBarGridLineOpacity: 0.8,
        hudBarGridBackgroundColor: "#868686",
        hudBarGridBackgroundOpacity: 0.5,
        hudBarTextLineColor: "#B2A6A6",
        hudBarTextLineWidth: 1.5,
        hudBarTextLinePadding: 12,
        hudBarTextLineFontColor: "#868686",
        hudBarTextLineFontSize: 13,
        hudBarBackgroundOpacity: 0.6,
        hudBarTopBackgroundColor: "#bbb",
        hudBarBottomBackgroundColor: "#3C3C3C",

        heatmapBackgroundColor: "#fff",
        heatmapBackgroundOpacity: 1,
        heatmapHoverBackgroundOpacity: 0.2,
        heatmapBorderColor: "#000",
        heatmapBorderWidth: 0.5,
        heatmapBorderOpacity: 1,
        heatmapFontSize: 11,
        heatmapFontColor: "#000",

        pyramidLineColor: "#fff",
        pyramidLineWidth: 1,
        pyramidTextLineColor: "#a9a9a9",
        pyramidTextLineWidth: 1,
        pyramidTextLineSize: 30,
        pyramidTextFontSize: 10,
        pyramidTextFontColor: "#333",

        // widget styles
        titleFontColor : "#333",
        titleFontSize : 13,
        titleFontWeight : "normal",
        legendFontColor : "#666",
        legendFontSize : 12,
        legendSwitchCircleColor : "#fff",
        legendSwitchDisableColor : "#c8c8c8",
        tooltipFontColor : "#333",
        tooltipFontSize : 12,
        tooltipBackgroundColor : "#fff",
        tooltipBorderColor : null,
        tooltipBorderWidth : 2,
        tooltipBackgroundOpacity : 1,
        tooltipLineColor : null,
        tooltipLineWidth : 1,
        scrollBackgroundSize : 7,
        scrollBackgroundColor : "#dcdcdc",
        scrollThumbBackgroundColor : "#b2b2b2",
        scrollThumbBorderColor : "#9f9fa4",
        zoomBackgroundColor : "#ff0000",
        zoomFocusColor : "#808080",
        zoomScrollBackgroundSize : 45,
        zoomScrollButtonImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAA7VmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMi0yM1QyMjoxMDowOSswOTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDItMjNUMjI6MTA6MDkrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZjEyZjk2NS02OTgxLTQxZTktYTU3Ny0zMmMwMDg2NjBhMjM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjNlNTQzMi0xYWJkLTExNzktYjc1Ny1lYmNlZjk1ZGNmOGE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjMjgwNGJmNi0zZTI5LTQ4NTQtOGRhMi05MjAyMDVkNDAzMDY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzI4MDRiZjYtM2UyOS00ODU0LThkYTItOTIwMjA1ZDQwMzA2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWYxMmY5NjUtNjk4MS00MWU5LWE1NzctMzJjMDA4NjYwYTIzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkxNzEzNDYtMTllNS0xMTc5LTg1YjUtZjAwOGZkMGY4OTgyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDozNWYyZjJkMC0xNmY3LTQ1YjktYjI3MS0zY2VkNTgwZmNjNmE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFwcGxlIFJHQjwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+32DD9QAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AABkYElEQVR4AQBQZK+bAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP////8BAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQAAAAAAAAABAAAAAAAAAAEAAAABAAAAAAAAAAIAAAABAAAAAQAAAAJ5eXkLaGhoNw8PDykFBQUmBQUFJAEBARgCAgILAQEBDQEBAQz////0////8/7+/vX9/f3p+vr63fb29tzt7e3WiYmJzKKiovYAAAD/AAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAD/AAAAAAEBAQAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wAAAAABAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAACAAAAAnR0dEy8/Pzhfv7+8X////5/////////////////////////////////////////////////////////////////////////////////v7++vf398jr6+uKtLS0OgAAABMAAAASAAAAEAAAAA4AAAAMAAAACwAAAAkAAAAIAAAABgAAAAUAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAABgAAAAifn58Y8vLydPv7+8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+dHi4uJ8ampqJAAAABQAAAASAAAAEAAAAA0AAAALAAAACgAAAAgAAAAGAAAABQAAAAQAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAADAAAABAAAAAYAAAAItra2HPT09In+/v7x/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f398ujo6JB5eXkqAAAAFQAAABMAAAAQAAAADgAAAAwAAAAJAAAACAAAAAYAAAAEAAAAAwAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAAB2ZmZg/z8/OA/v7+9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v715eXliTMzMx4AAAAWAAAAEwAAABAAAAAOAAAACwAAAAkAAAAHAAAABQAAAAQAAAADAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAADAAAABAAAAAYAAAAI5+fnS/39/dr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+d7Dw8NZAAAAGQAAABYAAAASAAAADwAAAAwAAAAKAAAACAAAAAYAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAMAAAAFAAAABmJiYg329vaT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+6OjonCgoKCAAAAAYAAAAFQAAABEAAAAOAAAACwAAAAgAAAAGAAAABQAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAACAAAABAAAAAUAAAAHzc3NKfv7+8z///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29tGMjIw8AAAAGwAAABcAAAATAAAADwAAAAwAAAAJAAAABwAAAAUAAAAEAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAEAAAABQAAAAfc3Nw7/v7+6f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vsp6enTgAAAB0AAAAYAAAAFAAAABAAAAANAAAACgAAAAcAAAAFAAAABAAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAQAAAAFAAAAB+fn50r+/v7z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f399La2tl4AAAAfAAAAGgAAABUAAAARAAAADQAAAAoAAAAHAAAABQAAAAQAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAABAAAAAUAAAAH5+fnSf////n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vqzs7NeAAAAIAAAABsAAAAWAAAAEgAAAA4AAAAKAAAABwAAAAUAAAAEAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAALc3NwzHR0dsAEBAQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQMjIyNFISEhybGxsesAAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAsjIyCMsLCy5AQEBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIGLCwsRv///73CwsLyAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAGgICAEv39/dD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T09NgwMDAwAAAAIgAAABwAAAAWAAAAEQAAAA0AAAAJAAAABgAAAAQAAAADAAAAAgAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAC9/f3kwgICGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj4+OqHh4efwAAAPkAAAD6AAAA+gAAAPsAAAD8AAAA/AAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAALk5ORECAgIYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR1VqqqqPgAAAAYAAAAFAAAABQAAAAQAAAADAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAAEAAAAB2lpaRH9/f3b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9vb24CMjIzMAAAAmAAAAHwAAABgAAAATAAAADgAAAAoAAAAHAAAABAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAGAAAACfPz84H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PT05UAAAArAAAAJAAAAB0AAAAXAAAAEQAAAAwAAAAJAAAABgAAAAQAAAACAwAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAADsrKyGSwsLKUBAQEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFCzY2Ni01dXV9QAAAP8AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAD9fX1iwoKCmsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb29unJiYmiAAAAPkAAAD4AAAA+QAAAPoAAAD8AAAA+wAAAP0AAAD+BAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAKXl5cSCQkJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiJQPz8/m8HBwesAAAD9AAAA/QAAAP4AAAD+AAAAAwAAAP8AAAD/AgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAJXV1deAQEBCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJiIiIUAAAAAQAAAAEAAAABAAAAAMAAAADAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAINDQ1fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tTgAAAAUAAAAFAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAABAAAAAc/Pzy4EBAQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLIICAgCkAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAiEhIVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE9PT0IAAAAEAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQoKCkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fHzgAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAChISEDwUFBS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECUyMjIOAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAEAAAAAAAAAAQAAAAEAAAABVVVVNQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQJlZWUsAAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABERERJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJychAAAAAwAAAAMAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAACCAgIJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxceAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAABBgYGJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUFBQdAAAAAwAAAAMAAAACAAAAAwAAAAIAAAABAgAAAAEAAAABAAAAAQAAAAEAAAABAgICFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgRAAAAAgAAAAIAAAACAAAAAQAAAAEAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABAgICDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQKAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAAAAAABAgICDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYKAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAAAQEBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAB////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35AAAAAQAAAAIAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAAA////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v77AAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAB/f397wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5+fn0AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz85wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAA9/f33QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OTlAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP8AAAD/5+fn2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXjAAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAgAAAAAAAAAAAAAA/wAAAAAAAAD/l5eXzwAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////6enp7aAAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAD/AAAAAAAAAP8AAAAAoqKi8vf399UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3t7d/X19f1AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAAAAAAA/wAAAAAAAAD/AAAA/+/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2M4AAAD+AAAA/gAAAP8AAAD+AAAA/wAAAP4AAAD/AgAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/8TExLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqMYAAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ldXV9X5+fndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw5JWVld4AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD+AgAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP7i4uKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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/QAAAP0AAAD9AAAA/AAAAPwAAAD8AAAA+wAAAPwAAAD7AAAA/AAAAPwAAAD8AAAA/AAAAP0AAAD9AAAA/gAAAP4AAAD/AAAA/gAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/gAAAAEAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/QAAAP0AAAAEAAAABAAAAPwAAAAEAAAABAAAAAQAAAADAAAAAwAAAAIAAAADAAAAAgAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP0AAAD+AAAA/QAAAP0AAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/QAAAPwAAAD9AAAA/QAAAP0AAAD+AAAA/wAAAP4AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAABAAAA/wAAAAAAAAD+AAAAAQAAAAAAAAAAAAAA/wAAAP4AAAD+AAAAAwAAAP4AAAD9AAAA/QAAAPwAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAIAAAABAAAAAQAAAAIAAAAAAAAAAAAAAAEAAAD/AAAAAAAAAAAAAAD+AAAA/wAAAP8AAAD+AAAA/gAAAP0AAAD9AAAA/gAAAPwAAAD9AAAA/QAAAPwAAAD9AAAA/AAAAP0AAAD8AAAA/QAAAP0AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAAAAAAAAAAAAP4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4AAAADAAAA/QAAAAMAAAD8AAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAAAAAgAAAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP4AAAD+AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD+AAAA/QAAAP4AAAD+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAMAAAACAAAAAgAAAAMAAAACAAAAAwAAAAIAAAADAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/QAAAP4AAAD9AAAA/gAAAP4AAAD9AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAACAAAAAQAAAP0AAAADAAAA/QAAAAIAAAACAAAAAgAAAAIAAAABAAAAAgAAAAEAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA//+C+dbJggW+VAAAAABJRU5ErkJggg==",
        zoomScrollButtonSize : 18,
        zoomScrollAreaBackgroundColor : "#fff",
        zoomScrollAreaBackgroundOpacity : 0.7,
        zoomScrollAreaBorderColor : "#d4d4d4",
        zoomScrollAreaBorderWidth : 1,
        zoomScrollAreaBorderRadius : 3,
        zoomScrollGridFontSize : 10,
        zoomScrollGridTickPadding : 4,
        zoomScrollBrushAreaBackgroundOpacity : 0.7,
        zoomScrollBrushLineBorderWidth : 1,
        crossBorderColor : "#a9a9a9",
        crossBorderWidth : 1,
        crossBorderOpacity : 0.8,
        crossBalloonFontSize : 11,
        crossBalloonFontColor : "#fff",
        crossBalloonBackgroundColor : "#000",
        crossBalloonBackgroundOpacity : 0.8,
        dragSelectBackgroundColor : "#7BBAE7",
        dragSelectBackgroundOpacity : 0.3,
        dragSelectBorderColor : "#7BBAE7",
        dragSelectBorderWidth : 1,

        // Map Common
        mapPathBackgroundColor : "#67B7DC",
        mapPathBackgroundOpacity : 1,
        mapPathBorderColor : "#fff",
        mapPathBorderWidth : 1,
        mapPathBorderOpacity : 1,
        // Map Brushes
        mapBubbleBackgroundOpacity : 0.5,
        mapBubbleBorderWidth : 1,
        mapBubbleFontSize : 11,
        mapBubbleFontColor : "#fff",
        mapSelectorHoverColor : "#5a73db",
        mapSelectorActiveColor : "#CC0000",
        mapFlightRouteAirportSmallColor : "#CC0000",
        mapFlightRouteAirportLargeColor : "#000",
        mapFlightRouteAirportBorderWidth : 2,
        mapFlightRouteAirportRadius : 8,
        mapFlightRouteLineColor : "#ff0000",
        mapFlightRouteLineWidth : 1,
        mapWeatherBackgroundColor : "#fff",
        mapWeatherBorderColor : "#a9a9a9",
        mapWeatherFontSize : 11,
        mapWeatherTitleFontColor : "#666",
        mapWeatherInfoFontColor : "#ff0000",
        mapCompareBubbleMaxLineColor : "#fff",
        mapCompareBubbleMaxLineDashArray : "2,2",
        mapCompareBubbleMaxBorderColor : "#fff",
        mapCompareBubbleMaxFontSize : 36,
        mapCompareBubbleMaxFontColor : "#fff",
        mapCompareBubbleMinBorderColor : "#ffff00",
        mapCompareBubbleMinFontSize : 24,
        mapCompareBubbleMinFontColor : "#000",
        // Map Widgets
        mapControlButtonColor : "#3994e2",
        mapControlLeftButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI9poMcdXpOKTujw0pGjAgA7",
        mapControlRightButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI8JycvonomSKhksxBqbAgA7",
        mapControlTopButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pCmvd2IkzUYqw27yfAgA7",
        mapControlBottomButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pyw37TDxTUhhq0q2fAgA7",
        mapControlHomeButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAAAAAAAAACH5BAUAAAEALAAAAAALAAsAAAIZjI8ZoAffIERzMVMxm+9KvIBh6Imb2aVMAQA7",
        mapControlUpButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAISjI8ZoMhtHpQH2HsV1TD29SkFADs=",
        mapControlDownButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIMjI+py+0BopSv2qsKADs=",
        mapControlScrollColor : "#000",
        mapControlScrollLineColor : "#fff",
        mapMinimapBackgroundColor : "transparent",
        mapMinimapBorderColor : "transparent",
        mapMinimapBorderWidth : 1,
        mapMinimapPathBackgroundColor : "#67B7DC",
        mapMinimapPathBackgroundOpacity : 0.5,
        mapMinimapPathBorderColor : "#67B7DC",
        mapMinimapPathBorderWidth : 0.5,
        mapMinimapPathBorderOpacity : 0.1,
        mapMinimapDragBackgroundColor : "#7CC7C3",
        mapMinimapDragBackgroundOpacity : 0.3,
        mapMinimapDragBorderColor : "#56B4AF",
        mapMinimapDragBorderWidth : 1,

        // Polygon Brushes
        polygonColumnBackgroundOpacity: 0.6,
        polygonColumnBorderOpacity: 0.5,
        polygonScatterRadialOpacity: 0.7,
        polygonScatterBackgroundOpacity: 0.8,
        polygonLineBackgroundOpacity: 0.6,
        polygonLineBorderOpacity: 0.7
    }
});
jui.define("chart.theme.dark", [], function() {
    var themeColors = [
        "#12f2e8",
        "#26f67c",
        "#e9f819",
        "#b78bf9",
        "#f94590",
        "#8bccf9",
        "#9228e4",
        "#06d9b6",
        "#fc6d65",
        "#f199ff",
        "#c8f21d",
        "#16a6e5",
        "#00ba60",
        "#91f2a1",
        "#fc9765",
        "#f21d4f"
    ];

    return {
        fontFamily : "arial,Tahoma,verdana",
    	backgroundColor : "#222222",
        colors : themeColors,

        // Axis styles
        axisBackgroundColor : "#222222",
        axisBackgroundOpacity : 0,
        axisBorderColor : "#222222",
        axisBorderWidth : 0,
        axisBorderRadius : 0,

        // Grid styles
        gridXFontSize : 11,
        gridYFontSize : 11,
        gridZFontSize : 10,
        gridCFontSize : 11,
        gridXFontColor : "#868686",
        gridYFontColor : "#868686",
        gridZFontColor : "#868686",
        gridCFontColor : "#868686",
        gridXFontWeight : "normal",
        gridYFontWeight : "normal",
        gridZFontWeight : "normal",
        gridCFontWeight : "normal",
        gridXAxisBorderColor : "#464646",
        gridYAxisBorderColor : "#464646",
        gridZAxisBorderColor : "#464646",
        gridXAxisBorderWidth : 2,
        gridYAxisBorderWidth : 2,
        gridZAxisBorderWidth : 2,

        // Full 3D 전용 테마
        gridFaceBackgroundColor: "#dcdcdc",
        gridFaceBackgroundOpacity: 0.3,

    	gridActiveFontColor : "#ff762d",
        gridActiveBorderColor : "#ff7800",
        gridActiveBorderWidth : 1,
        gridPatternColor : "#ababab",
        gridPatternOpacity : 0.1,
        gridBorderColor : "#868686",
        gridBorderWidth : 1,
        gridBorderDashArray : "none",
        gridBorderOpacity : 1,
        gridTickBorderSize : 3,
        gridTickBorderWidth : 1.5,
        gridTickPadding : 5,

        // Brush styles
        tooltipPointRadius : 5, // common
        tooltipPointBorderWidth : 1, // common
        tooltipPointFontWeight : "bold", // common
        tooltipPointFontSize : 11,
        tooltipPointFontColor : "#868686",
        barFontSize : 11,
        barFontColor : "#868686",
        barBorderColor : "none",
        barBorderWidth : 0,
        barBorderOpacity : 0,
        barBorderRadius : 3,
        barActiveBackgroundColor : "#fc6d65",
        barPointBorderColor : "#fff",
        barDisableBackgroundOpacity : 0.4,
    	gaugeBackgroundColor : "#3e3e3e",
        gaugeArrowColor : "#a6a6a6",
        gaugeFontColor : "#c5c5c5",
        gaugeFontSize : 20,
        gaugeFontWeight : "bold",
        gaugeTitleFontSize : 12,
        gaugeTitleFontWeight : "normal",
        gaugeTitleFontColor : "#c5c5c5",
        bargaugeBackgroundColor : "#3e3e3e",
        bargaugeFontSize : 11,
        bargaugeFontColor : "#c5c5c5",
    	pieBorderColor : "#232323",
        pieBorderWidth : 1,
        pieOuterFontSize : 11,
        pieOuterFontColor : "#868686",
        pieOuterLineColor : "#a9a9a9",
        pieOuterLineSize : 8,
        pieOuterLineRate : 1.3,
        pieInnerFontSize : 11,
        pieInnerFontColor : "#868686",
        pieActiveDistance : 5,
        areaBackgroundOpacity : 0.5,
        areaSplitBackgroundColor : "#ebebeb",
        bubbleBackgroundOpacity : 0.5,
        bubbleBorderWidth : 1,
        bubbleFontSize : 12,
        bubbleFontColor : "#868686",
        candlestickBorderColor : "#14be9d",
        candlestickBackgroundColor : "#14be9d",
        candlestickInvertBorderColor : "#ff4848",
        candlestickInvertBackgroundColor : "#ff4848",
        ohlcBorderColor : "#14be9d",
        ohlcInvertBorderColor : "#ff4848",
        ohlcBorderRadius : 5,
        lineBorderWidth : 2,
        lineBorderDashArray : "none",
        lineDisableBorderOpacity : 0.3,
        linePointBorderColor : "#fff",
        lineSplitBorderColor : null,
        lineSplitBorderOpacity : 0.5,
        pathBackgroundOpacity : 0.2,
        pathBorderWidth : 1,
        scatterBorderColor : "none",
        scatterBorderWidth : 1,
        scatterHoverColor : "#222222",
        waterfallBackgroundColor : "#26f67c",
        waterfallInvertBackgroundColor : "#f94590",
        waterfallEdgeBackgroundColor : "#8bccf9",
        waterfallLineColor : "#a9a9a9",
        waterfallLineDashArray : "0.9",
        focusBorderColor : "#FF7800",
        focusBorderWidth : 1,
        focusBackgroundColor : "#FF7800",
        focusBackgroundOpacity : 0.1,
        pinFontColor : "#FF7800",
        pinFontSize : 10,
        pinBorderColor : "#FF7800",
        pinBorderWidth : 0.7,

        topologyNodeRadius : 12.5,
        topologyNodeFontSize : 14,
        topologyNodeFontColor : "#c5c5c5",
        topologyNodeTitleFontSize : 11,
        topologyNodeTitleFontColor : "#c5c5c5",
        topologyEdgeWidth : 1,
        topologyActiveEdgeWidth : 2,
        topologyHoverEdgeWidth : 2,
        topologyEdgeColor : "#b2b2b2",
        topologyActiveEdgeColor : "#905ed1",
        topologyHoverEdgeColor : "#d3bdeb",
        topologyEdgeFontSize : 10,
        topologyEdgeFontColor : "#c5c5c5",
        topologyEdgePointRadius : 3,
        topologyEdgeOpacity : 1,
        topologyTooltipBackgroundColor : "#222222",
        topologyTooltipBorderColor : "#ccc",
        topologyTooltipFontSize : 11,
        topologyTooltipFontColor : "#c5c5c5",

        timelineTitleFontSize: 11,
        timelineTitleFontColor: "#c5c5c5",
        timelineColumnFontSize: 10,
        timelineColumnFontColor: "#c5c5c5",
        timelineColumnBackgroundColor: "linear(top) #3f3f3f,1 #343434",
        timelineEvenRowBackgroundColor: "#1c1c1c",
        timelineOddRowBackgroundColor: "#2f2f2f",
        timelineActiveBarBackgroundColor: "#6f32ba",
        timelineHoverBarBackgroundColor: null,
        timelineLayerBackgroundOpacity: 0.1,
        timelineActiveLayerBackgroundColor: "#7F5FA4",
        timelineActiveLayerBorderColor: "#7f5fa4",
        timelineHoverLayerBackgroundColor: "#7F5FA4",
        timelineHoverLayerBorderColor: "#7f5fa4",
        timelineVerticalLineColor: "#4d4d4d",
        timelineHorizontalLineColor: "#404040",

        hudColumnGridPointRadius: 7,
        hudColumnGridPointBorderColor: "#868686",
        hudColumnGridPointBorderWidth: 2,
        hudColumnGridFontColor: "#868686",
        hudColumnGridFontSize: 12,
        hudColumnGridFontWeight: "normal",
        hudColumnLeftBackgroundColor: "#3C3C3C",
        hudColumnRightBackgroundColor: "#838383",
        hudBarGridFontColor: "#868686",
        hudBarGridFontSize: 16,
        hudBarGridLineColor: "#868686",
        hudBarGridLineWidth: 1,
        hudBarGridLineOpacity: 0.8,
        hudBarGridBackgroundColor: "#868686",
        hudBarGridBackgroundOpacity: 0.5,
        hudBarTextLineColor: "#B2A6A6",
        hudBarTextLineWidth: 1.5,
        hudBarTextLinePadding: 12,
        hudBarTextLineFontColor: "#868686",
        hudBarTextLineFontSize: 13,
        hudBarBackgroundOpacity: 0.6,
        hudBarTopBackgroundColor: "#bbb",
        hudBarBottomBackgroundColor: "#3C3C3C",

        heatmapBackgroundColor: "#222222",
        heatmapBackgroundOpacity: 1,
        heatmapHoverBackgroundOpacity: 0.2,
        heatmapBorderColor: "#fff",
        heatmapBorderWidth: 0.5,
        heatmapBorderOpacity: 1,
        heatmapFontSize: 11,
        heatmapFontColor: "#868686",

        pyramidLineColor: "#464646",
        pyramidLineWidth: 1,
        pyramidTextLineColor: "#B2A6A6",
        pyramidTextLineWidth: 1,
        pyramidTextLineSize: 30,
        pyramidTextFontSize: 10,
        pyramidTextFontColor: "#222",

        // widget styles
        titleFontColor : "#ffffff",
        titleFontSize : 14,
        titleFontWeight : "normal",
        legendFontColor : "#ffffff",
        legendFontSize : 11,
        legendSwitchCircleColor : "#fff",
        legendSwitchDisableColor : "#c8c8c8",
        tooltipFontColor : "#333333",
        tooltipFontSize : 12,
        tooltipBackgroundColor : "#fff",
        tooltipBackgroundOpacity : 1,
        tooltipBorderColor : null,
        tooltipBorderWidth : 2,
        tooltipLineColor : null,
        tooltipLineWidth : 1,
        scrollBackgroundSize : 7,
        scrollBackgroundColor : "#3e3e3e",
        scrollThumbBackgroundColor : "#666666",
        scrollThumbBorderColor : "#686868",
        zoomBackgroundColor : "#ff0000",
        zoomFocusColor : "#808080",
        zoomScrollBackgroundSize : 45,
        zoomScrollButtonImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAA7VmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMi0yM1QyMjoxMDowOSswOTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDItMjNUMjI6MTA6MDkrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZjEyZjk2NS02OTgxLTQxZTktYTU3Ny0zMmMwMDg2NjBhMjM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjNlNTQzMi0xYWJkLTExNzktYjc1Ny1lYmNlZjk1ZGNmOGE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjMjgwNGJmNi0zZTI5LTQ4NTQtOGRhMi05MjAyMDVkNDAzMDY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzI4MDRiZjYtM2UyOS00ODU0LThkYTItOTIwMjA1ZDQwMzA2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWYxMmY5NjUtNjk4MS00MWU5LWE1NzctMzJjMDA4NjYwYTIzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkxNzEzNDYtMTllNS0xMTc5LTg1YjUtZjAwOGZkMGY4OTgyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDozNWYyZjJkMC0xNmY3LTQ1YjktYjI3MS0zY2VkNTgwZmNjNmE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFwcGxlIFJHQjwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+32DD9QAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AABkYElEQVR4AQBQZK+bAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP////8BAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQAAAAAAAAABAAAAAAAAAAEAAAABAAAAAAAAAAIAAAABAAAAAQAAAAJ5eXkLaGhoNw8PDykFBQUmBQUFJAEBARgCAgILAQEBDQEBAQz////0////8/7+/vX9/f3p+vr63fb29tzt7e3WiYmJzKKiovYAAAD/AAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAD/AAAAAAEBAQAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wAAAAABAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAACAAAAAnR0dEy8/Pzhfv7+8X////5/////////////////////////////////////////////////////////////////////////////////v7++vf398jr6+uKtLS0OgAAABMAAAASAAAAEAAAAA4AAAAMAAAACwAAAAkAAAAIAAAABgAAAAUAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAABgAAAAifn58Y8vLydPv7+8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+dHi4uJ8ampqJAAAABQAAAASAAAAEAAAAA0AAAALAAAACgAAAAgAAAAGAAAABQAAAAQAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAADAAAABAAAAAYAAAAItra2HPT09In+/v7x/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f398ujo6JB5eXkqAAAAFQAAABMAAAAQAAAADgAAAAwAAAAJAAAACAAAAAYAAAAEAAAAAwAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAAB2ZmZg/z8/OA/v7+9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v715eXliTMzMx4AAAAWAAAAEwAAABAAAAAOAAAACwAAAAkAAAAHAAAABQAAAAQAAAADAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAADAAAABAAAAAYAAAAI5+fnS/39/dr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+d7Dw8NZAAAAGQAAABYAAAASAAAADwAAAAwAAAAKAAAACAAAAAYAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAMAAAAFAAAABmJiYg329vaT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+6OjonCgoKCAAAAAYAAAAFQAAABEAAAAOAAAACwAAAAgAAAAGAAAABQAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAACAAAABAAAAAUAAAAHzc3NKfv7+8z///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29tGMjIw8AAAAGwAAABcAAAATAAAADwAAAAwAAAAJAAAABwAAAAUAAAAEAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAEAAAABQAAAAfc3Nw7/v7+6f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vsp6enTgAAAB0AAAAYAAAAFAAAABAAAAANAAAACgAAAAcAAAAFAAAABAAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAQAAAAFAAAAB+fn50r+/v7z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f399La2tl4AAAAfAAAAGgAAABUAAAARAAAADQAAAAoAAAAHAAAABQAAAAQAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAABAAAAAUAAAAH5+fnSf////n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vqzs7NeAAAAIAAAABsAAAAWAAAAEgAAAA4AAAAKAAAABwAAAAUAAAAEAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAALc3NwzHR0dsAEBAQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQMjIyNFISEhybGxsesAAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAsjIyCMsLCy5AQEBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIGLCwsRv///73CwsLyAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAGgICAEv39/dD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T09NgwMDAwAAAAIgAAABwAAAAWAAAAEQAAAA0AAAAJAAAABgAAAAQAAAADAAAAAgAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAC9/f3kwgICGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj4+OqHh4efwAAAPkAAAD6AAAA+gAAAPsAAAD8AAAA/AAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAALk5ORECAgIYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR1VqqqqPgAAAAYAAAAFAAAABQAAAAQAAAADAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAAEAAAAB2lpaRH9/f3b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9vb24CMjIzMAAAAmAAAAHwAAABgAAAATAAAADgAAAAoAAAAHAAAABAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAGAAAACfPz84H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PT05UAAAArAAAAJAAAAB0AAAAXAAAAEQAAAAwAAAAJAAAABgAAAAQAAAACAwAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAADsrKyGSwsLKUBAQEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFCzY2Ni01dXV9QAAAP8AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAD9fX1iwoKCmsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb29unJiYmiAAAAPkAAAD4AAAA+QAAAPoAAAD8AAAA+wAAAP0AAAD+BAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAKXl5cSCQkJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiJQPz8/m8HBwesAAAD9AAAA/QAAAP4AAAD+AAAAAwAAAP8AAAD/AgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAJXV1deAQEBCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJiIiIUAAAAAQAAAAEAAAABAAAAAMAAAADAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAINDQ1fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tTgAAAAUAAAAFAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAABAAAAAc/Pzy4EBAQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLIICAgCkAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAiEhIVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE9PT0IAAAAEAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQoKCkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fHzgAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAChISEDwUFBS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECUyMjIOAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAEAAAAAAAAAAQAAAAEAAAABVVVVNQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQJlZWUsAAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABERERJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJychAAAAAwAAAAMAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAACCAgIJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxceAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAABBgYGJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUFBQdAAAAAwAAAAMAAAACAAAAAwAAAAIAAAABAgAAAAEAAAABAAAAAQAAAAEAAAABAgICFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgRAAAAAgAAAAIAAAACAAAAAQAAAAEAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABAgICDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQKAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAAAAAABAgICDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYKAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAAAQEBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAB////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35AAAAAQAAAAIAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAAA////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v77AAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAB/f397wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5+fn0AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz85wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAA9/f33QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OTlAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP8AAAD/5+fn2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXjAAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAgAAAAAAAAAAAAAA/wAAAAAAAAD/l5eXzwAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////6enp7aAAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAD/AAAAAAAAAP8AAAAAoqKi8vf399UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3t7d/X19f1AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAAAAAAA/wAAAAAAAAD/AAAA/+/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2M4AAAD+AAAA/gAAAP8AAAD+AAAA/wAAAP4AAAD/AgAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/8TExLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqMYAAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ldXV9X5+fndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw5JWVld4AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD+AgAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP7i4uKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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/QAAAP0AAAD9AAAA/AAAAPwAAAD8AAAA+wAAAPwAAAD7AAAA/AAAAPwAAAD8AAAA/AAAAP0AAAD9AAAA/gAAAP4AAAD/AAAA/gAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/gAAAAEAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/QAAAP0AAAAEAAAABAAAAPwAAAAEAAAABAAAAAQAAAADAAAAAwAAAAIAAAADAAAAAgAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP0AAAD+AAAA/QAAAP0AAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/QAAAPwAAAD9AAAA/QAAAP0AAAD+AAAA/wAAAP4AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAABAAAA/wAAAAAAAAD+AAAAAQAAAAAAAAAAAAAA/wAAAP4AAAD+AAAAAwAAAP4AAAD9AAAA/QAAAPwAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAIAAAABAAAAAQAAAAIAAAAAAAAAAAAAAAEAAAD/AAAAAAAAAAAAAAD+AAAA/wAAAP8AAAD+AAAA/gAAAP0AAAD9AAAA/gAAAPwAAAD9AAAA/QAAAPwAAAD9AAAA/AAAAP0AAAD8AAAA/QAAAP0AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAAAAAAAAAAAAP4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4AAAADAAAA/QAAAAMAAAD8AAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAAAAAgAAAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP4AAAD+AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD+AAAA/QAAAP4AAAD+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAMAAAACAAAAAgAAAAMAAAACAAAAAwAAAAIAAAADAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/QAAAP4AAAD9AAAA/gAAAP4AAAD9AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAACAAAAAQAAAP0AAAADAAAA/QAAAAIAAAACAAAAAgAAAAIAAAABAAAAAgAAAAEAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA//+C+dbJggW+VAAAAABJRU5ErkJggg==",
        zoomScrollButtonSize : 18,
        zoomScrollAreaBackgroundColor : "#fff",
        zoomScrollAreaBackgroundOpacity : 0.7,
        zoomScrollAreaBorderColor : "#d4d4d4",
        zoomScrollAreaBorderWidth : 1,
        zoomScrollAreaBorderRadius : 3,
        zoomScrollGridFontSize : 10,
        zoomScrollGridTickPadding : 4,
        zoomScrollBrushAreaBackgroundOpacity : 0.7,
        zoomScrollBrushLineBorderWidth : 1,
        crossBorderColor : "#a9a9a9",
        crossBorderWidth : 1,
        crossBorderOpacity : 0.8,
        crossBalloonFontSize : 11,
        crossBalloonFontColor : "#333",
        crossBalloonBackgroundColor : "#fff",
        crossBalloonBackgroundOpacity : 1,
        dragSelectBackgroundColor : "#7BBAE7",
        dragSelectBackgroundOpacity : 0.3,
        dragSelectBorderColor : "#7BBAE7",
        dragSelectBorderWidth : 1,

        // Map Common
        mapPathBackgroundColor : "#67B7DC",
        mapPathBackgroundOpacity : 1,
        mapPathBorderColor : "#fff",
        mapPathBorderWidth : 1,
        mapPathBorderOpacity : 1,
        // Map Brushes
        mapBubbleBackgroundOpacity : 0.5,
        mapBubbleBorderWidth : 1,
        mapBubbleFontSize : 11,
        mapBubbleFontColor : "#868686",
        mapSelectorHoverColor : "#5a73db",
        mapSelectorActiveColor : "#CC0000",
        mapFlightRouteAirportSmallColor : "#CC0000",
        mapFlightRouteAirportLargeColor : "#000",
        mapFlightRouteAirportBorderWidth : 2,
        mapFlightRouteAirportRadius : 8,
        mapFlightRouteLineColor : "#ff0000",
        mapFlightRouteLineWidth : 1,
        mapWeatherBackgroundColor : "#fff",
        mapWeatherBorderColor : "#a9a9a9",
        mapWeatherFontSize : 11,
        mapWeatherTitleFontColor : "#666",
        mapWeatherInfoFontColor : "#ff0000",
        mapCompareBubbleMaxLineColor : "#fff",
        mapCompareBubbleMaxLineDashArray : "2,2",
        mapCompareBubbleMaxBorderColor : "#fff",
        mapCompareBubbleMaxFontSize : 36,
        mapCompareBubbleMaxFontColor : "#fff",
        mapCompareBubbleMinBorderColor : "#ffff00",
        mapCompareBubbleMinFontSize : 24,
        mapCompareBubbleMinFontColor : "#000",
        // Map Widgets
        mapControlButtonColor : "#3994e2",
        mapControlLeftButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI9poMcdXpOKTujw0pGjAgA7",
        mapControlRightButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI8JycvonomSKhksxBqbAgA7",
        mapControlTopButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pCmvd2IkzUYqw27yfAgA7",
        mapControlBottomButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pyw37TDxTUhhq0q2fAgA7",
        mapControlHomeButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAAAAAAAAACH5BAUAAAEALAAAAAALAAsAAAIZjI8ZoAffIERzMVMxm+9KvIBh6Imb2aVMAQA7",
        mapControlUpButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAISjI8ZoMhtHpQH2HsV1TD29SkFADs=",
        mapControlDownButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIMjI+py+0BopSv2qsKADs=",
        mapControlScrollColor : "#000",
        mapControlScrollLineColor : "#fff",
        mapMinimapBackgroundColor : "transparent",
        mapMinimapBorderColor : "transparent",
        mapMinimapBorderWidth : 1,
        mapMinimapPathBackgroundColor : "#67B7DC",
        mapMinimapPathBackgroundOpacity : 0.5,
        mapMinimapPathBorderColor : "#67B7DC",
        mapMinimapPathBorderWidth : 0.5,
        mapMinimapPathBorderOpacity : 0.1,
        mapMinimapDragBackgroundColor : "#7CC7C3",
        mapMinimapDragBackgroundOpacity : 0.3,
        mapMinimapDragBorderColor : "#56B4AF",
        mapMinimapDragBorderWidth : 1,

        // Polygon Brushes
        polygonColumnBackgroundOpacity: 0.6,
        polygonColumnBorderOpacity: 0.5,
        polygonScatterRadialOpacity: 0.7,
        polygonScatterBackgroundOpacity: 0.8,
        polygonLineBackgroundOpacity: 0.6,
        polygonLineBorderOpacity: 0.7
    }
});
jui.define("chart.theme.pastel", [], function() {
	var themeColors = [
		"#73e9d2",
		"#fef92c",
		"#ff9248",
		"#b7eef6",
		"#08c4e0",
		"#ffb9ce",
		"#ffd4ba",
		"#14be9d",
		"#ebebeb",
		"#666666",
		"#cdbfe3",
		"#bee982",
		"#c22269"
	];

	return {
		fontFamily : "Caslon540BT-Regular,Times,New Roman,serif",
		backgroundColor : "#fff",
		colors : themeColors,

		// Axis styles
		axisBackgroundColor : "#fff",
		axisBackgroundOpacity : 0,
		axisBorderColor : "#fff",
		axisBorderWidth : 0,
		axisBorderRadius : 0,

		// Grid styles
		gridXFontSize : 11,
		gridYFontSize : 11,
		gridZFontSize : 10,
		gridCFontSize : 11,
		gridXFontColor : "#333",
		gridYFontColor : "#333",
		gridZFontColor : "#333",
		gridCFontColor : "#333",
		gridXFontWeight : "normal",
		gridYFontWeight : "normal",
		gridZFontWeight : "normal",
		gridCFontWeight : "normal",
		gridXAxisBorderColor : "#bfbfbf",
		gridYAxisBorderColor : "#bfbfbf",
		gridZAxisBorderColor : "#bfbfbf",
		gridXAxisBorderWidth : 2,
		gridYAxisBorderWidth : 2,
		gridZAxisBorderWidth : 2,

		// Full 3D 전용 테마
		gridFaceBackgroundColor: "#dcdcdc",
		gridFaceBackgroundOpacity: 0.3,

		gridActiveFontColor : "#ff7800",
		gridActiveBorderColor : "#ff7800",
		gridActiveBorderWidth : 1,
		gridPatternColor : "#ababab",
		gridPatternOpacity : 0.1,
		gridBorderColor : "#bfbfbf",
		gridBorderWidth : 1,
		gridBorderDashArray : "1, 3",
		gridBorderOpacity : 1,
		gridTickBorderSize : 3,
		gridTickBorderWidth : 1.5,
		gridTickPadding : 5,

		// Brush styles
		tooltipPointRadius : 5, // common
		tooltipPointBorderWidth : 1, // common
		tooltipPointFontWeight : "bold", // common
		tooltipPointFontSize : 11,
		tooltipPointFontColor : "#333",
		barFontSize : 11,
		barFontColor : "#333",
		barBorderColor : "none",
		barBorderWidth : 0,
		barBorderOpacity : 0,
		barBorderRadius : 3,
		barActiveBackgroundColor : "#ffb9ce",
		barPointBorderColor : "#ebebeb",
		barDisableBackgroundOpacity : 0.4,
		gaugeBackgroundColor : "#f5f5f5",
        gaugeArrowColor : "#808080",
		gaugeFontColor : "#666666",
        gaugeFontSize : 20,
        gaugeFontWeight : "bold",
        gaugeTitleFontSize : 12,
        gaugeTitleFontWeight : "normal",
        gaugeTitleFontColor : "#333",
        bargaugeBackgroundColor : "#f5f5f5",
        bargaugeFontSize : 11,
        bargaugeFontColor : "#333333",
		pieBorderColor : "#fff",
		pieBorderWidth : 1,
        pieOuterFontSize : 11,
		pieOuterFontColor : "#333",
        pieOuterLineColor : "#a9a9a9",
        pieOuterLineSize : 8,
        pieOuterLineRate : 1.3,
		pieInnerFontSize : 11,
		pieInnerFontColor : "#333",
        pieActiveDistance : 5,
		areaBackgroundOpacity : 0.4,
		areaSplitBackgroundColor : "#ebebeb",
		bubbleBackgroundOpacity : 0.5,
		bubbleBorderWidth : 1,
		bubbleFontSize : 12,
		bubbleFontColor : "#fff",
		candlestickBorderColor : "#14be9d",
		candlestickBackgroundColor : "#14be9d",
		candlestickInvertBorderColor : "#ff4848",
		candlestickInvertBackgroundColor : "#ff4848",
        ohlcBorderColor : "#14be9d",
        ohlcInvertBorderColor : "#ff4848",
        ohlcBorderRadius : 5,
		lineBorderWidth : 2,
        lineBorderDashArray : "none",
		lineDisableBorderOpacity : 0.3,
		linePointBorderColor : "#fff",
		lineSplitBorderColor : null,
		lineSplitBorderOpacity : 0.5,
		pathBackgroundOpacity : 0.5,
		pathBorderWidth : 1,
		scatterBorderColor : "#fff",
		scatterBorderWidth : 1,
		scatterHoverColor : "#fff",
		waterfallBackgroundColor : "#73e9d2",
		waterfallInvertBackgroundColor : "#ffb9ce",
		waterfallEdgeBackgroundColor : "#08c4e0",
		waterfallLineColor : "#a9a9a9",
		waterfallLineDashArray : "0.9",
		focusBorderColor : "#FF7800",
		focusBorderWidth : 1,
		focusBackgroundColor : "#FF7800",
		focusBackgroundOpacity : 0.1,
		pinFontColor : "#FF7800",
		pinFontSize : 10,
		pinBorderColor : "#FF7800",
		pinBorderWidth : 0.7,

        topologyNodeRadius : 12.5,
        topologyNodeFontSize : 14,
        topologyNodeFontColor : "#fff",
        topologyNodeTitleFontSize : 11,
        topologyNodeTitleFontColor : "#333",
		topologyEdgeWidth : 1,
		topologyActiveEdgeWidth : 2,
		topologyHoverEdgeWidth : 2,
        topologyEdgeColor : "#b2b2b2",
        topologyActiveEdgeColor : "#905ed1",
		topologyHoverEdgeColor : "#d3bdeb",
        topologyEdgeFontSize : 10,
        topologyEdgeFontColor : "#666",
        topologyEdgePointRadius : 3,
		topologyEdgeOpacity : 1,
        topologyTooltipBackgroundColor : "#fff",
        topologyTooltipBorderColor : "#ccc",
        topologyTooltipFontSize : 11,
        topologyTooltipFontColor : "#333",

		timelineTitleFontSize: 11,
		timelineTitleFontColor: "#333",
		timelineColumnFontSize: 10,
		timelineColumnFontColor: "#333",
		timelineColumnBackgroundColor: "linear(top) #f9f9f9,1 #e9e9e9",
		timelineEvenRowBackgroundColor: "#fafafa",
		timelineOddRowBackgroundColor: "#f1f0f3",
		timelineActiveBarBackgroundColor: "#9262cf",
		timelineHoverBarBackgroundColor: null,
		timelineLayerBackgroundOpacity: 0.15,
		timelineActiveLayerBackgroundColor: "#A75CFF",
		timelineActiveLayerBorderColor: "#caa4f5",
		timelineHoverLayerBackgroundColor: "#DEC2FF",
		timelineHoverLayerBorderColor: "#caa4f5",
		timelineVerticalLineColor: "#c9c9c9",
		timelineHorizontalLineColor: "#d2d2d2",

		hudColumnGridPointRadius: 7,
		hudColumnGridPointBorderColor: "#868686",
		hudColumnGridPointBorderWidth: 2,
		hudColumnGridFontColor: "#868686",
		hudColumnGridFontSize: 12,
		hudColumnGridFontWeight: "normal",
		hudColumnLeftBackgroundColor: "#3C3C3C",
		hudColumnRightBackgroundColor: "#838383",
		hudBarGridFontColor: "#868686",
		hudBarGridFontSize: 16,
		hudBarGridLineColor: "#868686",
		hudBarGridLineWidth: 1,
		hudBarGridLineOpacity: 0.8,
		hudBarGridBackgroundColor: "#868686",
		hudBarGridBackgroundOpacity: 0.5,
		hudBarTextLineColor: "#B2A6A6",
		hudBarTextLineWidth: 1.5,
		hudBarTextLinePadding: 12,
		hudBarTextLineFontColor: "#868686",
		hudBarTextLineFontSize: 13,
		hudBarBackgroundOpacity: 0.6,
		hudBarTopBackgroundColor: "#bbb",
		hudBarBottomBackgroundColor: "#3C3C3C",

		heatmapBackgroundColor: "#fff",
		heatmapBackgroundOpacity: 1,
		heatmapHoverBackgroundOpacity: 0.2,
		heatmapBorderColor: "#000",
		heatmapBorderWidth: 0.5,
		heatmapBorderOpacity: 1,
		heatmapFontSize: 11,
		heatmapFontColor: "#000",

		pyramidLineColor: "#fff",
		pyramidLineWidth: 1,
		pyramidTextLineColor: "#a9a9a9",
		pyramidTextLineWidth: 1,
		pyramidTextLineSize: 30,
		pyramidTextFontSize: 10,
		pyramidTextFontColor: "#333",

        // widget styles
        titleFontColor : "#333",
        titleFontSize : 18,
		titleFontWeight : "normal",
        legendFontColor : "#333",
        legendFontSize : 11,
		legendSwitchCircleColor : "#fff",
		legendSwitchDisableColor : "#c8c8c8",
        tooltipFontColor : "#fff",
        tooltipFontSize : 12,
        tooltipBackgroundColor : "#000",
		tooltipBackgroundOpacity : 0.7,
        tooltipBorderColor : null,
		tooltipBorderWidth : 2,
		tooltipLineColor : null,
		tooltipLineWidth : 1,
        scrollBackgroundSize : 7,
		scrollBackgroundColor :	"#f5f5f5",
		scrollThumbBackgroundColor : "#b2b2b2",
		scrollThumbBorderColor : "#9f9fa4",
		zoomBackgroundColor : "#ff0000",
		zoomFocusColor : "#808080",
		zoomScrollBackgroundSize : 45,
		zoomScrollButtonImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAA7VmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMi0yM1QyMjoxMDowOSswOTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDItMjNUMjI6MTA6MDkrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZjEyZjk2NS02OTgxLTQxZTktYTU3Ny0zMmMwMDg2NjBhMjM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjNlNTQzMi0xYWJkLTExNzktYjc1Ny1lYmNlZjk1ZGNmOGE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjMjgwNGJmNi0zZTI5LTQ4NTQtOGRhMi05MjAyMDVkNDAzMDY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzI4MDRiZjYtM2UyOS00ODU0LThkYTItOTIwMjA1ZDQwMzA2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWYxMmY5NjUtNjk4MS00MWU5LWE1NzctMzJjMDA4NjYwYTIzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkxNzEzNDYtMTllNS0xMTc5LTg1YjUtZjAwOGZkMGY4OTgyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDozNWYyZjJkMC0xNmY3LTQ1YjktYjI3MS0zY2VkNTgwZmNjNmE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFwcGxlIFJHQjwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+32DD9QAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AABkYElEQVR4AQBQZK+bAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP////8BAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQAAAAAAAAABAAAAAAAAAAEAAAABAAAAAAAAAAIAAAABAAAAAQAAAAJ5eXkLaGhoNw8PDykFBQUmBQUFJAEBARgCAgILAQEBDQEBAQz////0////8/7+/vX9/f3p+vr63fb29tzt7e3WiYmJzKKiovYAAAD/AAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAD/AAAAAAEBAQAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wAAAAABAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAACAAAAAnR0dEy8/Pzhfv7+8X////5/////////////////////////////////////////////////////////////////////////////////v7++vf398jr6+uKtLS0OgAAABMAAAASAAAAEAAAAA4AAAAMAAAACwAAAAkAAAAIAAAABgAAAAUAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAABgAAAAifn58Y8vLydPv7+8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+dHi4uJ8ampqJAAAABQAAAASAAAAEAAAAA0AAAALAAAACgAAAAgAAAAGAAAABQAAAAQAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAADAAAABAAAAAYAAAAItra2HPT09In+/v7x/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f398ujo6JB5eXkqAAAAFQAAABMAAAAQAAAADgAAAAwAAAAJAAAACAAAAAYAAAAEAAAAAwAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAAB2ZmZg/z8/OA/v7+9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v715eXliTMzMx4AAAAWAAAAEwAAABAAAAAOAAAACwAAAAkAAAAHAAAABQAAAAQAAAADAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAADAAAABAAAAAYAAAAI5+fnS/39/dr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+d7Dw8NZAAAAGQAAABYAAAASAAAADwAAAAwAAAAKAAAACAAAAAYAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAMAAAAFAAAABmJiYg329vaT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+6OjonCgoKCAAAAAYAAAAFQAAABEAAAAOAAAACwAAAAgAAAAGAAAABQAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAACAAAABAAAAAUAAAAHzc3NKfv7+8z///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29tGMjIw8AAAAGwAAABcAAAATAAAADwAAAAwAAAAJAAAABwAAAAUAAAAEAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAEAAAABQAAAAfc3Nw7/v7+6f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vsp6enTgAAAB0AAAAYAAAAFAAAABAAAAANAAAACgAAAAcAAAAFAAAABAAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAQAAAAFAAAAB+fn50r+/v7z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f399La2tl4AAAAfAAAAGgAAABUAAAARAAAADQAAAAoAAAAHAAAABQAAAAQAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAABAAAAAUAAAAH5+fnSf////n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vqzs7NeAAAAIAAAABsAAAAWAAAAEgAAAA4AAAAKAAAABwAAAAUAAAAEAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAALc3NwzHR0dsAEBAQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQMjIyNFISEhybGxsesAAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAsjIyCMsLCy5AQEBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIGLCwsRv///73CwsLyAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAGgICAEv39/dD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T09NgwMDAwAAAAIgAAABwAAAAWAAAAEQAAAA0AAAAJAAAABgAAAAQAAAADAAAAAgAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAC9/f3kwgICGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj4+OqHh4efwAAAPkAAAD6AAAA+gAAAPsAAAD8AAAA/AAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAALk5ORECAgIYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR1VqqqqPgAAAAYAAAAFAAAABQAAAAQAAAADAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAAEAAAAB2lpaRH9/f3b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9vb24CMjIzMAAAAmAAAAHwAAABgAAAATAAAADgAAAAoAAAAHAAAABAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAGAAAACfPz84H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PT05UAAAArAAAAJAAAAB0AAAAXAAAAEQAAAAwAAAAJAAAABgAAAAQAAAACAwAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAADsrKyGSwsLKUBAQEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFCzY2Ni01dXV9QAAAP8AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAD9fX1iwoKCmsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb29unJiYmiAAAAPkAAAD4AAAA+QAAAPoAAAD8AAAA+wAAAP0AAAD+BAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAKXl5cSCQkJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiJQPz8/m8HBwesAAAD9AAAA/QAAAP4AAAD+AAAAAwAAAP8AAAD/AgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAJXV1deAQEBCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJiIiIUAAAAAQAAAAEAAAABAAAAAMAAAADAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAINDQ1fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tTgAAAAUAAAAFAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAABAAAAAc/Pzy4EBAQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLIICAgCkAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAiEhIVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE9PT0IAAAAEAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQoKCkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fHzgAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAChISEDwUFBS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECUyMjIOAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAEAAAAAAAAAAQAAAAEAAAABVVVVNQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQJlZWUsAAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABERERJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJychAAAAAwAAAAMAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAACCAgIJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxceAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAABBgYGJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUFBQdAAAAAwAAAAMAAAACAAAAAwAAAAIAAAABAgAAAAEAAAABAAAAAQAAAAEAAAABAgICFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgRAAAAAgAAAAIAAAACAAAAAQAAAAEAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABAgICDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQKAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAAAAAABAgICDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYKAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAAAQEBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAB////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35AAAAAQAAAAIAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAAA////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v77AAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAB/f397wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5+fn0AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz85wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAA9/f33QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OTlAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP8AAAD/5+fn2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXjAAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAgAAAAAAAAAAAAAA/wAAAAAAAAD/l5eXzwAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////6enp7aAAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAD/AAAAAAAAAP8AAAAAoqKi8vf399UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3t7d/X19f1AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAAAAAAA/wAAAAAAAAD/AAAA/+/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2M4AAAD+AAAA/gAAAP8AAAD+AAAA/wAAAP4AAAD/AgAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/8TExLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqMYAAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ldXV9X5+fndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw5JWVld4AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD+AgAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP7i4uKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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/QAAAP0AAAD9AAAA/AAAAPwAAAD8AAAA+wAAAPwAAAD7AAAA/AAAAPwAAAD8AAAA/AAAAP0AAAD9AAAA/gAAAP4AAAD/AAAA/gAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/gAAAAEAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/QAAAP0AAAAEAAAABAAAAPwAAAAEAAAABAAAAAQAAAADAAAAAwAAAAIAAAADAAAAAgAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP0AAAD+AAAA/QAAAP0AAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/QAAAPwAAAD9AAAA/QAAAP0AAAD+AAAA/wAAAP4AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAABAAAA/wAAAAAAAAD+AAAAAQAAAAAAAAAAAAAA/wAAAP4AAAD+AAAAAwAAAP4AAAD9AAAA/QAAAPwAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAIAAAABAAAAAQAAAAIAAAAAAAAAAAAAAAEAAAD/AAAAAAAAAAAAAAD+AAAA/wAAAP8AAAD+AAAA/gAAAP0AAAD9AAAA/gAAAPwAAAD9AAAA/QAAAPwAAAD9AAAA/AAAAP0AAAD8AAAA/QAAAP0AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAAAAAAAAAAAAP4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4AAAADAAAA/QAAAAMAAAD8AAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAAAAAgAAAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP4AAAD+AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD+AAAA/QAAAP4AAAD+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAMAAAACAAAAAgAAAAMAAAACAAAAAwAAAAIAAAADAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/QAAAP4AAAD9AAAA/gAAAP4AAAD9AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAACAAAAAQAAAP0AAAADAAAA/QAAAAIAAAACAAAAAgAAAAIAAAABAAAAAgAAAAEAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA//+C+dbJggW+VAAAAABJRU5ErkJggg==",
		zoomScrollButtonSize : 18,
		zoomScrollAreaBackgroundColor : "#fff",
		zoomScrollAreaBackgroundOpacity : 0.7,
		zoomScrollAreaBorderColor : "#d4d4d4",
		zoomScrollAreaBorderWidth : 1,
		zoomScrollAreaBorderRadius : 3,
		zoomScrollGridFontSize : 10,
		zoomScrollGridTickPadding : 4,
		zoomScrollBrushAreaBackgroundOpacity : 0.7,
		zoomScrollBrushLineBorderWidth : 1,
		crossBorderColor : "#a9a9a9",
		crossBorderWidth : 1,
		crossBorderOpacity : 0.8,
		crossBalloonFontSize : 11,
		crossBalloonFontColor :	"#fff",
		crossBalloonBackgroundColor : "#000",
		crossBalloonBackgroundOpacity : 0.7,
		dragSelectBackgroundColor : "#7BBAE7",
		dragSelectBackgroundOpacity : 0.3,
		dragSelectBorderColor : "#7BBAE7",
		dragSelectBorderWidth : 1,

		// Map Common
		mapPathBackgroundColor : "#67B7DC",
		mapPathBackgroundOpacity : 1,
		mapPathBorderColor : "#fff",
		mapPathBorderWidth : 1,
		mapPathBorderOpacity : 1,
		// Map Brushes
		mapBubbleBackgroundOpacity : 0.5,
		mapBubbleBorderWidth : 1,
		mapBubbleFontSize : 11,
		mapBubbleFontColor : "#fff",
		mapSelectorHoverColor : "#5a73db",
		mapSelectorActiveColor : "#CC0000",
		mapFlightRouteAirportSmallColor : "#CC0000",
		mapFlightRouteAirportLargeColor : "#000",
		mapFlightRouteAirportBorderWidth : 2,
		mapFlightRouteAirportRadius : 8,
		mapFlightRouteLineColor : "#ff0000",
		mapFlightRouteLineWidth : 1,
		mapWeatherBackgroundColor : "#fff",
		mapWeatherBorderColor : "#a9a9a9",
		mapWeatherFontSize : 11,
		mapWeatherTitleFontColor : "#666",
		mapWeatherInfoFontColor : "#ff0000",
		mapCompareBubbleMaxLineColor : "#fff",
		mapCompareBubbleMaxLineDashArray : "2,2",
		mapCompareBubbleMaxBorderColor : "#fff",
		mapCompareBubbleMaxFontSize : 36,
		mapCompareBubbleMaxFontColor : "#fff",
		mapCompareBubbleMinBorderColor : "#ffff00",
		mapCompareBubbleMinFontSize : 24,
		mapCompareBubbleMinFontColor : "#000",
		// Map Widgets
		mapControlButtonColor : "#3994e2",
		mapControlLeftButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI9poMcdXpOKTujw0pGjAgA7",
		mapControlRightButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI8JycvonomSKhksxBqbAgA7",
		mapControlTopButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pCmvd2IkzUYqw27yfAgA7",
		mapControlBottomButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pyw37TDxTUhhq0q2fAgA7",
		mapControlHomeButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAAAAAAAAACH5BAUAAAEALAAAAAALAAsAAAIZjI8ZoAffIERzMVMxm+9KvIBh6Imb2aVMAQA7",
		mapControlUpButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAISjI8ZoMhtHpQH2HsV1TD29SkFADs=",
		mapControlDownButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIMjI+py+0BopSv2qsKADs=",
		mapControlScrollColor : "#000",
		mapControlScrollLineColor : "#fff",
		mapMinimapBackgroundColor : "transparent",
		mapMinimapBorderColor : "transparent",
		mapMinimapBorderWidth : 1,
		mapMinimapPathBackgroundColor : "#67B7DC",
		mapMinimapPathBackgroundOpacity : 0.5,
		mapMinimapPathBorderColor : "#67B7DC",
		mapMinimapPathBorderWidth : 0.5,
		mapMinimapPathBorderOpacity : 0.1,
		mapMinimapDragBackgroundColor : "#7CC7C3",
		mapMinimapDragBackgroundOpacity : 0.3,
		mapMinimapDragBorderColor : "#56B4AF",
		mapMinimapDragBorderWidth : 1,

		// Polygon Brushes
		polygonColumnBackgroundOpacity: 0.6,
		polygonColumnBorderOpacity: 0.5,
		polygonScatterRadialOpacity: 0.7,
		polygonScatterBackgroundOpacity: 0.8,
		polygonLineBackgroundOpacity: 0.6,
		polygonLineBorderOpacity: 0.7
	}
}); 
jui.define("chart.theme.pattern", [], function() {
    var themeColors = [
        "pattern-jennifer-01",
        "pattern-jennifer-02",
        "pattern-jennifer-03",
        "pattern-jennifer-04",
        "pattern-jennifer-05",
        "pattern-jennifer-06",
        "pattern-jennifer-07",
        "pattern-jennifer-08",
        "pattern-jennifer-09",
        "pattern-jennifer-10",
        "pattern-jennifer-11",
        "pattern-jennifer-12"
    ];

    return {
        fontFamily : "arial,Tahoma,verdana",
        backgroundColor : "#fff",
        colors : themeColors,

        // Axis styles
        axisBackgroundColor : "#fff",
        axisBackgroundOpacity : 0,
        axisBorderColor : "#fff",
        axisBorderWidth : 0,
        axisBorderRadius : 0,

        // Grid styles
        gridXFontSize : 11,
        gridYFontSize : 11,
        gridZFontSize : 10,
        gridCFontSize : 11,
        gridXFontColor : "#333",
        gridYFontColor : "#333",
        gridZFontColor : "#333",
        gridCFontColor : "#333",
        gridXFontWeight : "normal",
        gridYFontWeight : "normal",
        gridZFontWeight : "normal",
        gridCFontWeight : "normal",
        gridXAxisBorderColor : "#ebebeb",
        gridYAxisBorderColor : "#ebebeb",
        gridZAxisBorderColor : "#ebebeb",
        gridXAxisBorderWidth : 2,
        gridYAxisBorderWidth : 2,
        gridZAxisBorderWidth : 2,

        // Full 3D 전용 테마
        gridFaceBackgroundColor: "#dcdcdc",
        gridFaceBackgroundOpacity: 0.3,

        gridActiveFontColor : "#ff7800",
        gridActiveBorderColor : "#ff7800",
        gridActiveBorderWidth : 1,
        gridPatternColor : "#ababab",
        gridPatternOpacity : 0.1,
        gridBorderColor : "#ebebeb",
        gridBorderWidth : 1,
        gridBorderDashArray : "none",
        gridBorderOpacity : 1,
        gridTickBorderSize : 3,
        gridTickBorderWidth : 1.5,
        gridTickPadding : 5,

        // Brush styles
        tooltipPointRadius : 5, // common
        tooltipPointBorderWidth : 1, // common
        tooltipPointFontWeight : "bold", // common
        tooltipPointFontSize : 11,
        tooltipPointFontColor : "#333",
        barFontSize : 11,
        barFontColor : "#333",
        barBorderColor : "#000",
        barBorderWidth : 1,
        barBorderOpacity : 1,
        barBorderRadius : 5,
        barActiveBackgroundColor : "#06d9b6",
        barPointBorderColor : "#fff",
        barDisableBackgroundOpacity : 0.4,
        gaugeBackgroundColor : "#ececec",
        gaugeArrowColor : "#666666",
        gaugeFontColor : "#666666",
        gaugeFontSize : 20,
        gaugeFontWeight : "bold",
        gaugeTitleFontSize : 12,
        gaugeTitleFontWeight : "normal",
        gaugeTitleFontColor : "#333",
        pieBorderColor : "#fff",
        bargaugeBackgroundColor : "#ececec",
        bargaugeFontSize : 11,
        bargaugeFontColor : "#333333",
        pieBorderWidth : 1,
        pieOuterFontSize : 11,
        pieOuterFontColor : "#333",
        pieOuterLineColor : "#a9a9a9",
        pieOuterLineSize : 8,
        pieOuterLineRate : 1.3,
        pieInnerFontSize : 11,
        pieInnerFontColor : "#333",
        pieActiveDistance : 5,
        areaBackgroundOpacity : 0.5,
        areaSplitBackgroundColor : "#929292",
        bubbleBackgroundOpacity : 0.5,
        bubbleBorderWidth : 1,
        bubbleFontSize : 12,
        bubbleFontColor : "#fff",
        candlestickBorderColor : "#000",
        candlestickBackgroundColor : "#fff",
        candlestickInvertBorderColor : "#ff0000",
        candlestickInvertBackgroundColor : "#ff0000",
        ohlcBorderColor : "#000",
        ohlcInvertBorderColor : "#ff0000",
        ohlcBorderRadius : 5,
        lineBorderWidth : 2,
        lineBorderDashArray : "none",
        lineDisableBorderOpacity : 0.3,
        linePointBorderColor : "#fff",
        lineSplitBorderColor : null,
        lineSplitBorderOpacity : 0.5,
        pathBackgroundOpacity : 0.5,
        pathBorderWidth : 1,
        scatterBorderColor : "#fff",
        scatterBorderWidth : 1,
        scatterHoverColor : "#fff",
        waterfallBackgroundColor : "#87BB66",
        waterfallInvertBackgroundColor : "#FF7800",
        waterfallEdgeBackgroundColor : "#7BBAE7",
        waterfallLineColor : "#a9a9a9",
        waterfallLineDashArray : "0.9",
        focusBorderColor : "#FF7800",
        focusBorderWidth : 1,
        focusBackgroundColor : "#FF7800",
        focusBackgroundOpacity : 0.1,
        pinFontColor : "#FF7800",
        pinFontSize : 10,
        pinBorderColor : "#FF7800",
        pinBorderWidth : 0.7,

        topologyNodeRadius : 12.5,
        topologyNodeFontSize : 14,
        topologyNodeFontColor : "#fff",
        topologyNodeTitleFontSize : 11,
        topologyNodeTitleFontColor : "#333",
        topologyEdgeWidth : 1,
        topologyActiveEdgeWidth : 2,
        topologyHoverEdgeWidth : 2,
        topologyEdgeColor : "#b2b2b2",
        topologyActiveEdgeColor : "#905ed1",
        topologyHoverEdgeColor : "#d3bdeb",
        topologyEdgeFontSize : 10,
        topologyEdgeFontColor : "#666",
        topologyEdgePointRadius : 3,
        topologyEdgeOpacity : 1,
        topologyTooltipBackgroundColor : "#fff",
        topologyTooltipBorderColor : "#ccc",
        topologyTooltipFontSize : 11,
        topologyTooltipFontColor : "#333",

        timelineTitleFontSize: 11,
        timelineTitleFontColor: "#333",
        timelineColumnFontSize: 10,
        timelineColumnFontColor: "#333",
        timelineColumnBackgroundColor: "linear(top) #f9f9f9,1 #e9e9e9",
        timelineEvenRowBackgroundColor: "#fafafa",
        timelineOddRowBackgroundColor: "#f1f0f3",
        timelineActiveBarBackgroundColor: "#9262cf",
        timelineHoverBarBackgroundColor: null,
        timelineLayerBackgroundOpacity: 0.15,
        timelineActiveLayerBackgroundColor: "#A75CFF",
        timelineActiveLayerBorderColor: "#caa4f5",
        timelineHoverLayerBackgroundColor: "#DEC2FF",
        timelineHoverLayerBorderColor: "#caa4f5",
        timelineVerticalLineColor: "#c9c9c9",
        timelineHorizontalLineColor: "#d2d2d2",

        hudColumnGridPointRadius: 7,
        hudColumnGridPointBorderColor: "#868686",
        hudColumnGridPointBorderWidth: 2,
        hudColumnGridFontColor: "#868686",
        hudColumnGridFontSize: 12,
        hudColumnGridFontWeight: "normal",
        hudColumnLeftBackgroundColor: "#3C3C3C",
        hudColumnRightBackgroundColor: "#838383",
        hudBarGridFontColor: "#868686",
        hudBarGridFontSize: 16,
        hudBarGridLineColor: "#868686",
        hudBarGridLineWidth: 1,
        hudBarGridLineOpacity: 0.8,
        hudBarGridBackgroundColor: "#868686",
        hudBarGridBackgroundOpacity: 0.5,
        hudBarTextLineColor: "#B2A6A6",
        hudBarTextLineWidth: 1.5,
        hudBarTextLinePadding: 12,
        hudBarTextLineFontColor: "#868686",
        hudBarTextLineFontSize: 13,
        hudBarBackgroundOpacity: 0.6,
        hudBarTopBackgroundColor: "#bbb",
        hudBarBottomBackgroundColor: "#3C3C3C",

        heatmapBackgroundColor: "#fff",
        heatmapBackgroundOpacity: 1,
        heatmapHoverBackgroundOpacity: 0.2,
        heatmapBorderColor: "#000",
        heatmapBorderWidth: 0.5,
        heatmapBorderOpacity: 1,
        heatmapFontSize: 11,
        heatmapFontColor: "#000",

        pyramidLineColor: "#fff",
        pyramidLineWidth: 1,
        pyramidTextLineColor: "#a9a9a9",
        pyramidTextLineWidth: 1,
        pyramidTextLineSize: 30,
        pyramidTextFontSize: 10,
        pyramidTextFontColor: "#333",

        // widget styles
        titleFontColor : "#333",
        titleFontSize : 13,
        titleFontWeight : "normal",
        legendFontColor : "#333",
        legendFontSize : 12,
        legendSwitchCircleColor : "#fff",
        legendSwitchDisableColor : "#c8c8c8",
        tooltipFontColor : "#333",
        tooltipFontSize : 12,
        tooltipBackgroundColor : "#fff",
        tooltipBackgroundOpacity : 0.7,
        tooltipBorderColor : null,
        tooltipBorderWidth : 2,
        tooltipLineColor : null,
        tooltipLineWidth : 1,
        scrollBackgroundSize : 7,
        scrollBackgroundColor : "#dcdcdc",
        scrollThumbBackgroundColor : "#b2b2b2",
        scrollThumbBorderColor : "#9f9fa4",
        zoomBackgroundColor : "#ff0000",
        zoomFocusColor : "#808080",
        zoomScrollBackgroundSize : 45,
        zoomScrollButtonImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAA7VmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMi0yM1QyMjoxMDowOSswOTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDItMjNUMjI6MTA6MDkrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZjEyZjk2NS02OTgxLTQxZTktYTU3Ny0zMmMwMDg2NjBhMjM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjNlNTQzMi0xYWJkLTExNzktYjc1Ny1lYmNlZjk1ZGNmOGE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjMjgwNGJmNi0zZTI5LTQ4NTQtOGRhMi05MjAyMDVkNDAzMDY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzI4MDRiZjYtM2UyOS00ODU0LThkYTItOTIwMjA1ZDQwMzA2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWYxMmY5NjUtNjk4MS00MWU5LWE1NzctMzJjMDA4NjYwYTIzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkxNzEzNDYtMTllNS0xMTc5LTg1YjUtZjAwOGZkMGY4OTgyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDozNWYyZjJkMC0xNmY3LTQ1YjktYjI3MS0zY2VkNTgwZmNjNmE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFwcGxlIFJHQjwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+32DD9QAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AABkYElEQVR4AQBQZK+bAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP////8BAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQAAAAAAAAABAAAAAAAAAAEAAAABAAAAAAAAAAIAAAABAAAAAQAAAAJ5eXkLaGhoNw8PDykFBQUmBQUFJAEBARgCAgILAQEBDQEBAQz////0////8/7+/vX9/f3p+vr63fb29tzt7e3WiYmJzKKiovYAAAD/AAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAD/AAAAAAEBAQAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wAAAAABAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAACAAAAAnR0dEy8/Pzhfv7+8X////5/////////////////////////////////////////////////////////////////////////////////v7++vf398jr6+uKtLS0OgAAABMAAAASAAAAEAAAAA4AAAAMAAAACwAAAAkAAAAIAAAABgAAAAUAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAABgAAAAifn58Y8vLydPv7+8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+dHi4uJ8ampqJAAAABQAAAASAAAAEAAAAA0AAAALAAAACgAAAAgAAAAGAAAABQAAAAQAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAADAAAABAAAAAYAAAAItra2HPT09In+/v7x/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f398ujo6JB5eXkqAAAAFQAAABMAAAAQAAAADgAAAAwAAAAJAAAACAAAAAYAAAAEAAAAAwAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAAB2ZmZg/z8/OA/v7+9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v715eXliTMzMx4AAAAWAAAAEwAAABAAAAAOAAAACwAAAAkAAAAHAAAABQAAAAQAAAADAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAADAAAABAAAAAYAAAAI5+fnS/39/dr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+d7Dw8NZAAAAGQAAABYAAAASAAAADwAAAAwAAAAKAAAACAAAAAYAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAMAAAAFAAAABmJiYg329vaT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+6OjonCgoKCAAAAAYAAAAFQAAABEAAAAOAAAACwAAAAgAAAAGAAAABQAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAACAAAABAAAAAUAAAAHzc3NKfv7+8z///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29tGMjIw8AAAAGwAAABcAAAATAAAADwAAAAwAAAAJAAAABwAAAAUAAAAEAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAEAAAABQAAAAfc3Nw7/v7+6f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vsp6enTgAAAB0AAAAYAAAAFAAAABAAAAANAAAACgAAAAcAAAAFAAAABAAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAQAAAAFAAAAB+fn50r+/v7z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f399La2tl4AAAAfAAAAGgAAABUAAAARAAAADQAAAAoAAAAHAAAABQAAAAQAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAABAAAAAUAAAAH5+fnSf////n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vqzs7NeAAAAIAAAABsAAAAWAAAAEgAAAA4AAAAKAAAABwAAAAUAAAAEAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAALc3NwzHR0dsAEBAQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQMjIyNFISEhybGxsesAAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAsjIyCMsLCy5AQEBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIGLCwsRv///73CwsLyAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAGgICAEv39/dD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T09NgwMDAwAAAAIgAAABwAAAAWAAAAEQAAAA0AAAAJAAAABgAAAAQAAAADAAAAAgAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAC9/f3kwgICGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj4+OqHh4efwAAAPkAAAD6AAAA+gAAAPsAAAD8AAAA/AAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAALk5ORECAgIYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR1VqqqqPgAAAAYAAAAFAAAABQAAAAQAAAADAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAAEAAAAB2lpaRH9/f3b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9vb24CMjIzMAAAAmAAAAHwAAABgAAAATAAAADgAAAAoAAAAHAAAABAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAGAAAACfPz84H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PT05UAAAArAAAAJAAAAB0AAAAXAAAAEQAAAAwAAAAJAAAABgAAAAQAAAACAwAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAADsrKyGSwsLKUBAQEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFCzY2Ni01dXV9QAAAP8AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAD9fX1iwoKCmsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb29unJiYmiAAAAPkAAAD4AAAA+QAAAPoAAAD8AAAA+wAAAP0AAAD+BAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAKXl5cSCQkJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiJQPz8/m8HBwesAAAD9AAAA/QAAAP4AAAD+AAAAAwAAAP8AAAD/AgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAJXV1deAQEBCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJiIiIUAAAAAQAAAAEAAAABAAAAAMAAAADAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAINDQ1fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tTgAAAAUAAAAFAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAABAAAAAc/Pzy4EBAQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLIICAgCkAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAiEhIVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE9PT0IAAAAEAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQoKCkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fHzgAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAChISEDwUFBS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECUyMjIOAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAEAAAAAAAAAAQAAAAEAAAABVVVVNQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQJlZWUsAAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABERERJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJychAAAAAwAAAAMAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAACCAgIJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxceAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAABBgYGJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUFBQdAAAAAwAAAAMAAAACAAAAAwAAAAIAAAABAgAAAAEAAAABAAAAAQAAAAEAAAABAgICFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgRAAAAAgAAAAIAAAACAAAAAQAAAAEAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABAgICDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQKAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAAAAAABAgICDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYKAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAAAQEBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAB////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35AAAAAQAAAAIAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAAA////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v77AAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAB/f397wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5+fn0AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz85wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAA9/f33QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OTlAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP8AAAD/5+fn2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXjAAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAgAAAAAAAAAAAAAA/wAAAAAAAAD/l5eXzwAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////6enp7aAAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAD/AAAAAAAAAP8AAAAAoqKi8vf399UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3t7d/X19f1AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAAAAAAA/wAAAAAAAAD/AAAA/+/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2M4AAAD+AAAA/gAAAP8AAAD+AAAA/wAAAP4AAAD/AgAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/8TExLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqMYAAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ldXV9X5+fndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw5JWVld4AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD+AgAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP7i4uKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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/QAAAP0AAAD9AAAA/AAAAPwAAAD8AAAA+wAAAPwAAAD7AAAA/AAAAPwAAAD8AAAA/AAAAP0AAAD9AAAA/gAAAP4AAAD/AAAA/gAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/gAAAAEAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/QAAAP0AAAAEAAAABAAAAPwAAAAEAAAABAAAAAQAAAADAAAAAwAAAAIAAAADAAAAAgAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP0AAAD+AAAA/QAAAP0AAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/QAAAPwAAAD9AAAA/QAAAP0AAAD+AAAA/wAAAP4AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAABAAAA/wAAAAAAAAD+AAAAAQAAAAAAAAAAAAAA/wAAAP4AAAD+AAAAAwAAAP4AAAD9AAAA/QAAAPwAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAIAAAABAAAAAQAAAAIAAAAAAAAAAAAAAAEAAAD/AAAAAAAAAAAAAAD+AAAA/wAAAP8AAAD+AAAA/gAAAP0AAAD9AAAA/gAAAPwAAAD9AAAA/QAAAPwAAAD9AAAA/AAAAP0AAAD8AAAA/QAAAP0AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAAAAAAAAAAAAP4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4AAAADAAAA/QAAAAMAAAD8AAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAAAAAgAAAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP4AAAD+AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD+AAAA/QAAAP4AAAD+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAMAAAACAAAAAgAAAAMAAAACAAAAAwAAAAIAAAADAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/QAAAP4AAAD9AAAA/gAAAP4AAAD9AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAACAAAAAQAAAP0AAAADAAAA/QAAAAIAAAACAAAAAgAAAAIAAAABAAAAAgAAAAEAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA//+C+dbJggW+VAAAAABJRU5ErkJggg==",
        zoomScrollButtonSize : 18,
        zoomScrollAreaBackgroundColor : "#fff",
        zoomScrollAreaBackgroundOpacity : 0.7,
        zoomScrollAreaBorderColor : "#d4d4d4",
        zoomScrollAreaBorderWidth : 1,
        zoomScrollAreaBorderRadius : 3,
        zoomScrollGridFontSize : 10,
        zoomScrollGridTickPadding : 4,
        zoomScrollBrushAreaBackgroundOpacity : 0.7,
        zoomScrollBrushLineBorderWidth : 1,
        crossBorderColor : "#a9a9a9",
        crossBorderWidth : 1,
        crossBorderOpacity : 0.8,
        crossBalloonFontSize : 11,
        crossBalloonFontColor : "#fff",
        crossBalloonBackgroundColor : "#000",
        crossBalloonBackgroundOpacity : 0.5,
        dragSelectBackgroundColor : "#7BBAE7",
        dragSelectBackgroundOpacity : 0.3,
        dragSelectBorderColor : "#7BBAE7",
        dragSelectBorderWidth : 1,

        // Map Common
        mapPathBackgroundColor : "#67B7DC",
        mapPathBackgroundOpacity : 1,
        mapPathBorderColor : "#fff",
        mapPathBorderWidth : 1,
        mapPathBorderOpacity : 1,
        // Map Brushes
        mapBubbleBackgroundOpacity : 0.5,
        mapBubbleBorderWidth : 1,
        mapBubbleFontSize : 11,
        mapBubbleFontColor : "#fff",
        mapSelectorHoverColor : "#5a73db",
        mapSelectorActiveColor : "#CC0000",
        mapFlightRouteAirportSmallColor : "#CC0000",
        mapFlightRouteAirportLargeColor : "#000",
        mapFlightRouteAirportBorderWidth : 2,
        mapFlightRouteAirportRadius : 8,
        mapFlightRouteLineColor : "#ff0000",
        mapFlightRouteLineWidth : 1,
        mapWeatherBackgroundColor : "#fff",
        mapWeatherBorderColor : "#a9a9a9",
        mapWeatherFontSize : 11,
        mapWeatherTitleFontColor : "#666",
        mapWeatherInfoFontColor : "#ff0000",
        mapCompareBubbleMaxLineColor : "#fff",
        mapCompareBubbleMaxLineDashArray : "2,2",
        mapCompareBubbleMaxBorderColor : "#fff",
        mapCompareBubbleMaxFontSize : 36,
        mapCompareBubbleMaxFontColor : "#fff",
        mapCompareBubbleMinBorderColor : "#ffff00",
        mapCompareBubbleMinFontSize : 24,
        mapCompareBubbleMinFontColor : "#000",
        // Map Widgets
        mapControlButtonColor : "#3994e2",
        mapControlLeftButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI9poMcdXpOKTujw0pGjAgA7",
        mapControlRightButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI8JycvonomSKhksxBqbAgA7",
        mapControlTopButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pCmvd2IkzUYqw27yfAgA7",
        mapControlBottomButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pyw37TDxTUhhq0q2fAgA7",
        mapControlHomeButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAAAAAAAAACH5BAUAAAEALAAAAAALAAsAAAIZjI8ZoAffIERzMVMxm+9KvIBh6Imb2aVMAQA7",
        mapControlUpButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAISjI8ZoMhtHpQH2HsV1TD29SkFADs=",
        mapControlDownButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIMjI+py+0BopSv2qsKADs=",
        mapControlScrollColor : "#000",
        mapControlScrollLineColor : "#fff",
        mapMinimapBackgroundColor : "transparent",
        mapMinimapBorderColor : "transparent",
        mapMinimapBorderWidth : 1,
        mapMinimapPathBackgroundColor : "#67B7DC",
        mapMinimapPathBackgroundOpacity : 0.5,
        mapMinimapPathBorderColor : "#67B7DC",
        mapMinimapPathBorderWidth : 0.5,
        mapMinimapPathBorderOpacity : 0.1,
        mapMinimapDragBackgroundColor : "#7CC7C3",
        mapMinimapDragBackgroundOpacity : 0.3,
        mapMinimapDragBorderColor : "#56B4AF",
        mapMinimapDragBorderWidth : 1,

        // Polygon Brushes
        polygonColumnBackgroundOpacity: 0.6,
        polygonColumnBorderOpacity: 0.5,
        polygonScatterRadialOpacity: 0.7,
        polygonScatterBackgroundOpacity: 0.8,
        polygonLineBackgroundOpacity: 0.6,
        polygonLineBorderOpacity: 0.7
    }
});
jui.define("chart.pattern.jennifer", [], function() {
	return {
    "10": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-10",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABZJREFUCNdjEBRg6GhgcHFgUFLAxQYAaTkFzlvDQuIAAAAASUVORK5CYII=",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "11": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-11",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABJJREFUCNdjMDZgOHOAAQxwsQF00wXOMquS/QAAAABJRU5ErkJggg==",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "12": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-12",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABBJREFUCNdj+P8BioAABxsAU88RaA20zg0AAAAASUVORK5CYII=",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "01": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-01",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABVJREFUCNdjKC9g+P+B4e4FIImLDQBPxxNXosybYgAAAABJRU5ErkJggg==",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "02": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-02",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABNJREFUCNdj6GhgAAIlBSCBiw0AUpID3xszyekAAAAASUVORK5CYII=",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "03": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-03",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAA9JREFUCNdj+P+BAQzwMACirge9PFNsFQAAAABJRU5ErkJggg==",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "04": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-04",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAgMAAAArG7R0AAAACVBMVEUAAAAaGRkWFhUIIaslAAAAAXRSTlMAQObYZgAAACFJREFUCNdj6HBpYQABjw4wDeS7QPgtENrFxQNCe3SAKAC36AapdMh8ewAAAABJRU5ErkJggg==",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "05": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-05",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAALCwvdFFZtAAAAAXRSTlMAQObYZgAAAA1JREFUCNdjWLWAIAIAFt8Ped1+QPcAAAAASUVORK5CYII=",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "06": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-06",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAALCwvdFFZtAAAAAXRSTlMAQObYZgAAAA9JREFUCNdj+P+BAQjwkgDijAubMqjSSAAAAABJRU5ErkJggg==",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "07": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-07",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAgMAAAArG7R0AAAACVBMVEUAAAAAAAAMDAwvehODAAAAAXRSTlMAQObYZgAAAA5JREFUCNdjmDJlCikYAPO/FNGPw+TMAAAAAElFTkSuQmCC",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "08": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-08",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABZJREFUCNdjKC9gePeA4e4Fht0bcLEBM1MRaPwhp7AAAAAASUVORK5CYII=",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    },
    "09": {
        "type": "pattern",
        "attr": {
            "id": "pattern-jennifer-09",
            "width": 12,
            "height": 12,
            "patternUnits": "userSpaceOnUse"
        },
        "children": [
            {
                "type": "image",
                "attr": {
                    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABZJREFUCNdjePeAobyAYfcGhrsXcLEBOSARaPIjMTsAAAAASUVORK5CYII=",
                    "width": 12,
                    "height": 12
                }
            }
        ]
    }
}
});
jui.define("chart.icon.jennifer", [], function() {
	return {
		"grip3" : "\ue998",
		"tag" : "\ue993",
		"all" : "\ue994",
		"grip2" : "\ue995",
		"cursor1" : "\ue996",
		"grip1" : "\ue997",
		"roundsquare" : "\ue98a",
		"paintbucket" : "\ue98b",
		"square" : "\ue98c",
		"circle" : "\ue98d",
		"eraser" : "\ue98e",
		"paintbrush" : "\ue98f",
		"pen" : "\ue990",
		"eyedropper" : "\ue991",
		"x-mark" : "\ue992",
		"server2" : "\ue93e",
		"server1" : "\ue93f",
		"unhappy" : "\ue940",
		"layout2" : "\ue988",
		"layout1" : "\ue989",
		"3d" : "\ue938",
		"cursor" : "\ue93a",
		"feed" : "\ue93b",
		"filter" : "\ue93c",
		"column" : "\ue93d",
		"analysis" : "\ue936",
		"statistics" : "\ue937",
		"wireless" : "\ue900",
		"network" : "\ue901",
		"cloud" : "\ue902",
		"checkbox" : "\ue903",
		"checkbox2" : "\ue904",
		"stop" : "\ue905",
		"slider" : "\ue906",
		"link2" : "\ue907",
		"minus2" : "\ue908",
		"more" : "\ue909",
		"zip" : "\ue90a",
		"mobile" : "\ue90b",
		"tablet" : "\ue90c",
		"share2" : "\ue90d",
		"mail" : "\ue90e",
		"caution3" : "\ue90f",
		"lock" : "\ue910",
		"domain" : "\ue911",
		"script" : "\ue912",
		"business" : "\ue913",
		"build" : "\ue914",
		"themes2" : "\ue915",
		"download" : "\ue916",
		"upload" : "\ue917",
		"themes" : "\ue918",
		"arrow4" : "\ue919",
		"pin" : "\ue91a",
		"report2" : "\ue91b",
		"template" : "\ue91c",
		"line-height" : "\ue91d",
		"outdent" : "\ue91e",
		"indent" : "\ue91f",
		"bell" : "\ue920",
		"like" : "\ue921",
		"blogger" : "\ue922",
		"github" : "\ue923",
		"facebook" : "\ue924",
		"googleplus" : "\ue925",
		"share" : "\ue926",
		"twitter" : "\ue927",
		"image" : "\ue928",
		"refresh2" : "\ue929",
		"realtime" : "\ue92a",
		"connection" : "\ue92b",
		"etc" : "\ue92c",
		"analysis2" : "\ue92d",
		"chart-candle" : "\ue92e",
		"chart-gauge" : "\ue92f",
		"chart-scatter" : "\ue930",
		"chart-radar" : "\ue931",
		"chart-area" : "\ue932",
		"chart-column" : "\ue933",
		"chart-bar" : "\ue934",
		"chart-line" : "\ue935",
		"dashboard" : "\ue939",
		"message" : "\ue941",
		"info" : "\ue942",
		"info-message" : "\ue943",
		"report" : "\ue944",
		"menu" : "\ue945",
		"report-build" : "\ue946",
		"jennifer-server" : "\ue947",
		"user" : "\ue948",
		"rule" : "\ue949",
		"profile" : "\ue94a",
		"monitoring" : "\ue94b",
		"device" : "\ue94c",
		"caution2" : "\ue94d",
		"tool" : "\ue94e",
		"report-link" : "\ue94f",
		"was" : "\ue950",
		"ws" : "\ue951",
		"server" : "\ue952",
		"db" : "\ue953",
		"minus" : "\ue954",
		"label" : "\ue955",
		"checkmark" : "\ue956",
		"stoppage" : "\ue957",
		"align-right" : "\ue958",
		"caution" : "\ue959",
		"return" : "\ue95a",
		"loading" : "\ue95b",
		"plus" : "\ue95c",
		"pause" : "\ue95d",
		"play" : "\ue95e",
		"resize" : "\ue95f",
		"right" : "\ue960",
		"left" : "\ue961",
		"bold" : "\ue962",
		"chart" : "\ue963",
		"document" : "\ue964",
		"link" : "\ue965",
		"arrow3" : "\ue966",
		"arrow1" : "\ue967",
		"arrow2" : "\ue968",
		"textcolor" : "\ue969",
		"text" : "\ue96a",
		"refresh" : "\ue96b",
		"chevron-right" : "\ue96c",
		"chevron-left" : "\ue96d",
		"align-center" : "\ue96e",
		"align-left" : "\ue96f",
		"preview" : "\ue970",
		"close" : "\ue971",
		"exit" : "\ue972",
		"dashboardlist" : "\ue973",
		"add-dir" : "\ue974",
		"add-dir2" : "\ue975",
		"calendar" : "\ue976",
		"check" : "\ue977",
		"edit" : "\ue978",
		"gear" : "\ue979",
		"help" : "\ue97a",
		"hide" : "\ue97b",
		"home" : "\ue97c",
		"html" : "\ue97d",
		"italic" : "\ue97e",
		"new-window" : "\ue97f",
		"orderedlist" : "\ue980",
		"printer" : "\ue981",
		"save" : "\ue982",
		"search" : "\ue983",
		"table" : "\ue984",
		"trashcan" : "\ue985",
		"underline" : "\ue986",
		"unorderedlist" : "\ue987"
	}
});
jui.define("chart.polygon.core", [ "chart.vector", "util.transform", "util.math", "util.base" ],
    function(Vector, Transform, math, _) {

    var PolygonCore = function() {
        this.perspective = 0.9;

        this.rotate = function(depth, degree, cx, cy, cz) {
            var p = this.perspective,
                t = new Transform(this.vertices),
                m = t.matrix("move3d", cx, cy, cz);

            // 폴리곤 이동 및 각도 변경
            m = math.matrix3d(m, t.matrix("rotate3dx", degree.x));
            m = math.matrix3d(m, t.matrix("rotate3dy", degree.y));
            m = math.matrix3d(m, t.matrix("rotate3dz", degree.z));
            m = math.matrix3d(m, t.matrix("move3d", -cx, -cy, -cz));
            this.vertices = t.custom(m);

            for (var i = 0, count = this.vertices.length; i < count; i++) {
                var far = Math.abs(this.vertices[i][2] - depth),
                    s = math.scaleValue(far, 0, depth, p, 1),
                    t2 = new Transform(),
                    m2 = t2.matrix("move3d", cx, cy, depth/2);

                // 폴리곤 스케일 변경
                m2 = math.matrix3d(m2, t2.matrix("scale3d", s, s, s));
                m2 = math.matrix3d(m2, t2.matrix("move3d", -cx, -cy, -depth/2));
                this.vertices[i] = math.matrix3d(m2, this.vertices[i]);

                // 벡터 객체 생성 및 갱신
                if(_.typeCheck("array", this.vectors)) {
                    if(this.vectors[i] == null) {
                        this.vectors[i] = new Vector(this.vertices[i][0], this.vertices[i][1], this.vertices[i][2]);
                    } else {
                        this.vectors[i].x = this.vertices[i][0];
                        this.vectors[i].y = this.vertices[i][1];
                        this.vectors[i].z = this.vertices[i][2];
                    }
                }
            }
        }

        this.min = function() {
            var obj = {
                x: this.vertices[0][0],
                y: this.vertices[0][1],
                z: this.vertices[0][2]
            };

            for(var i = 1, len = this.vertices.length; i < len; i++) {
                obj.x = Math.min(obj.x, this.vertices[i][0]);
                obj.y = Math.min(obj.y, this.vertices[i][1]);
                obj.z = Math.min(obj.z, this.vertices[i][2]);
            }

            return obj;
        }

        this.max = function() {
            var obj = {
                x: this.vertices[0][0],
                y: this.vertices[0][1],
                z: this.vertices[0][2]
            };

            for(var i = 1, len = this.vertices.length; i < len; i++) {
                obj.x = Math.max(obj.x, this.vertices[i][0]);
                obj.y = Math.max(obj.y, this.vertices[i][1]);
                obj.z = Math.max(obj.z, this.vertices[i][2]);
            }

            return obj;
        }
    }

    return PolygonCore;
});
jui.define("chart.polygon.grid", [], function() {
    var GridPolygon = function(type, width, height, depth, x, y) {
        x = x || 0;
        y = y || 0;
        width = x + width;
        height = y + height;

        var matrix = {
            center: [
                new Float32Array([ x, y, depth, 1 ]),
                new Float32Array([ width, y, depth, 1 ]),
                new Float32Array([ width, height, depth, 1 ]),
                new Float32Array([ x, height, depth, 1 ])
            ],
            horizontal: [
                new Float32Array([ x, height, 0, 1 ]),
                new Float32Array([ width, height, 0, 1 ]),
                new Float32Array([ width, height, depth, 1 ]),
                new Float32Array([ x, height, depth, 1 ])
            ],
            vertical: [
                new Float32Array([ width, y, 0, 1 ]),
                new Float32Array([ width, height, 0, 1 ]),
                new Float32Array([ width, height, depth, 1 ]),
                new Float32Array([ width, y, depth, 1 ])
            ]
        };

        this.vertices = matrix[type];

        this.vectors = [];
    }

    return GridPolygon;
}, "chart.polygon.core");
jui.define("chart.polygon.line", [], function() {
    var LinePolygon = function(x1, y1, d1, x2, y2, d2) {
        this.vertices = [
            new Float32Array([ x1, y1, d1, 1 ]),
            new Float32Array([ x2, y2, d2, 1 ])
        ];

        this.vectors = [];
    }

    return LinePolygon;
}, "chart.polygon.core");
jui.define("chart.polygon.point", [], function() {
    var PointPolygon = function(x, y, d) {
        this.vertices = [
            new Float32Array([ x, y, d, 1 ])
        ];

        this.vectors = [];
    }

    return PointPolygon;
}, "chart.polygon.core");
jui.define("chart.polygon.cube", [], function() {
    var CubePolygon = function(x, y, z, w, h, d) {
        this.vertices = [
            new Float32Array([ x,       y,      z,      1 ]),
            new Float32Array([ x + w,   y,      z,      1 ]),
            new Float32Array([ x + w,   y,      z + d,  1 ]),
            new Float32Array([ x,       y,      z + d,  1 ]),

            new Float32Array([ x,       y + h,  z,      1 ]),
            new Float32Array([ x + w,   y + h,  z,      1 ]),
            new Float32Array([ x + w,   y + h,  z + d,  1 ]),
            new Float32Array([ x,       y + h,  z + d,  1 ]),
        ];

        this.faces = [
            [ 0, 1, 2, 3 ],
            [ 3, 2, 6, 7 ],
            [ 0, 3, 7, 4 ],
            [ 1, 2, 6, 5 ],
            [ 0, 1, 5, 4 ],
            [ 4, 5, 6, 7 ]
        ];

        this.vectors = [];
    }

    return CubePolygon;
}, "chart.polygon.core");
jui.define("chart.grid.draw2d", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.grid.draw2d
     * @abstract
     */
    var Draw2DGrid = function() {

        this.createGridX = function(position, index, x, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.chart.svg.group().translate(x, 0),
                size = this.chart.theme("gridTickBorderSize");

            axis.append(this.line({
                y2 : (position == "bottom") ? size : -size,
                stroke : this.color(isActive, "gridActiveBorderColor", "gridXAxisBorderColor"),
                "stroke-width" : this.chart.theme("gridTickBorderWidth")
            }));

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, isLast);
            }

            return axis;
        }

        this.createGridY = function(position, index, y, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.chart.svg.group().translate(0, y),
                size = this.chart.theme("gridTickBorderSize");

            axis.append(this.line({
                x2 : (position == "left") ? -size : size,
                stroke : this.color(isActive, "gridActiveBorderColor", "gridYAxisBorderColor"),
                "stroke-width" : this.chart.theme("gridTickBorderWidth")
            }));

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, isLast);
            }

            return axis;
        }

        this.fillRectObject = function(g, line, position, x, y , width, height) {
            if (line.type.indexOf("gradient") > -1) {
                g.append(this.chart.svg.rect({
                    x : x,
                    y : y,
                    height : height,
                    width : width,
                    fill : this.chart.color(( line.fill ? line.fill : "linear(" + position + ") " + this.chart.theme("gridPatternColor") + ",0.5 " + this.chart.theme("backgroundColor") )),
                    "fill-opacity" : this.chart.theme("gridPatternOpacity")
                }));
            } else if (line.type.indexOf("rect") > -1) {
                g.append(this.chart.svg.rect({
                    x : x,
                    y : y,
                    height : height,
                    width : width,
                    fill : this.chart.color( line.fill ? line.fill : this.chart.theme("gridPatternColor") ),
                    "fill-opacity" : this.chart.theme("gridPatternOpacity")
                }));
            }
        }

        /**
         * @method drawAxisLine
         * theme 이 적용된  axis line 리턴
         * @param {ChartBuilder} chart
         * @param {Object} attr
         */
        this.drawAxisLine = function(position, g, attr) {
            var isTopOrBottom = (position == "top" || position == "bottom");

            g.append(this.chart.svg.line(_.extend({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0,
                stroke : this.color(isTopOrBottom ? "gridXAxisBorderColor" : "gridYAxisBorderColor"),
                "stroke-width" : this.chart.theme(isTopOrBottom ? "gridXAxisBorderWidth" : "gridYAxisBorderWidth"),
                "stroke-opacity" : 1
            }, attr)));
        }

        this.drawPattern = function(position, ticks, values, isMove) {
            if (this.grid.hide) return;
            if (!position) return;
            if (!ticks) return;
            if (!values) return;

            var line = this.getLineOption(),
                isY = (position == "left" || position == "right"),
                g = this.chart.svg.group();

            g.translate(this.axis.area("x") + this.chart.area("x"), this.axis.area("y") + this.chart.area("y"));

            if (line && (line.type.indexOf("gradient") > -1 || line.type.indexOf("rect") > -1)) {
                for(var i = 0; i < values.length-1; i += 2) {
                    var dist = Math.abs(values[i+1] - values[i]),
                        pos = values[i] - (isMove ?  dist/2 : 0 ),
                        x = (isY) ? 0 : pos,
                        y = (isY) ? pos : 0,
                        width = (isY) ?  this.axis.area("width") : dist,
                        height = (isY) ?  dist : this.axis.area("height");

                    this.fillRectObject(g, line, position, x, y, width, height);
                }
            }
        }

        this.drawBaseLine = function(position, g) {
            var obj = this.getGridSize(),
                pos = {};

            if (position == "bottom" || position == "top") {
                pos = { x1 : obj.start, x2 : obj.end };
            } else if (position == "left" || position == "right") {
                pos = { y1 : obj.start, y2 : obj.end };
            }

            this.drawAxisLine(position, g, pos)
        }

        this.drawValueLine = function(position, axis, isActive, line, index, isLast) {
            var area = {},
                isDrawLine = false;

            if (position == "top") {
                isDrawLine = this.checkDrawLineY(index, isLast);
                area = { x1: 0, x2: 0, y1: 0, y2: this.axis.area("height") };
            } else if (position == "bottom" ) {
                isDrawLine = this.checkDrawLineY(index, isLast);
                area = { x1: 0, x2: 0, y1: 0, y2: -this.axis.area("height") };
            } else if (position == "left") {
                isDrawLine = this.checkDrawLineX(index, isLast);
                area = { x1: 0, x2: this.axis.area("width"), y1: 0, y2: 0 };
            } else if (position == "right" ) {
                isDrawLine = this.checkDrawLineX(index, isLast);
                area = { x1: 0, x2: -this.axis.area("width"), y1: 0, y2: 0 };
            }

            if(isDrawLine) {
                var lineObject = this.line(_.extend({
                    stroke: this.chart.theme(isActive, "gridActiveBorderColor", "gridBorderColor"),
                    "stroke-width": this.chart.theme(isActive, "gridActiveBorderWidth", "gridBorderWidth")
                }, area));

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray");

                    lineObject.attr({
                        "stroke-dasharray": (dash == "none" || !dash) ? "3,3" : dash
                    });
                }

                axis.append(lineObject);
            }
        }

        this.drawValueText = function(position, axis, index, xy, domain, move, isActive) {
            if (this.grid.hideText) return;

            if(position == "top") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: move,
                    y: -(this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding") * 2),
                    dy: this.chart.theme("gridXFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridXFontColor"),
                    "text-anchor": "middle",
                    "font-size": this.chart.theme("gridXFontSize"),
                    "font-weight": this.chart.theme("gridXFontWeight")
                }, domain)));
            } else if(position == "bottom") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: move,
                    y: this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding") * 2,
                    dy: this.chart.theme("gridXFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridXFontColor"),
                    "text-anchor": "middle",
                    "font-size": this.chart.theme("gridXFontSize"),
                    "font-weight": this.chart.theme("gridXFontWeight")
                }, domain)));
            } else if(position == "left") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: -this.chart.theme("gridTickBorderSize") - this.chart.theme("gridTickPadding"),
                    y: move,
                    dy: this.chart.theme("gridYFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridYFontColor"),
                    "text-anchor": "end",
                    "font-size": this.chart.theme("gridYFontSize"),
                    "font-weight": this.chart.theme("gridYFontWeight")
                }, domain)));
            } else if(position == "right") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding"),
                    y: move,
                    dy: this.chart.theme("gridYFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridYFontColor"),
                    "text-anchor": "start",
                    "font-size": this.chart.theme("gridYFontSize"),
                    "font-weight": this.chart.theme("gridYFontWeight")
                }, domain)));
            }
        }

        this.drawImage = function(orient, g, tick, index, x, y) {
            if (!_.typeCheck("function", this.grid.image)) return;

            var opts = this.grid.image.apply(this.chart, [ tick, index ]);

            if(_.typeCheck("object", opts)) {
                var image = this.chart.svg.image({
                    "xlink:href": opts.uri,
                    width: opts.width,
                    height: opts.height
                });

                if(orient == "top" || orient == "bottom") {
                    image.attr({
                        x: (this.grid.type == "block") ? this.scale.rangeBand()/2 - opts.width/2 : -(opts.width/2)
                    });
                } else if(orient == "left" || orient == "right") {
                    image.attr({
                        y: (this.grid.type == "block") ? this.scale.rangeBand()/2 - opts.height/2 : -(opts.height/2)
                    })
                }

                if(orient == "bottom") {
                    image.attr({ y: opts.dist });
                } else if(orient == "top") {
                    image.attr({ y: -(opts.dist + opts.height) });
                } else if(orient == "left") {
                    image.attr({ x: -(opts.dist + opts.width) });
                } else if(orient == "right") {
                    image.attr({ x: opts.dist });
                }

                image.translate(x, y)
                g.append(image);
            }
        }
    }

    return Draw2DGrid;
}, "chart.draw");
jui.define("chart.grid.draw3d", [ "util.base", "chart.polygon.grid", "chart.polygon.line", "chart.polygon.point" ],
    function(_, GridPolygon, LinePolygon, PointPolygon) {

    /**
     * @class chart.grid.draw3d
     * @abstract
     */
    var Draw3DGrid = function() {

        this.createGridX = function(position, index, x, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.svg.group();

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, x, isLast);
            }

            return axis;
        }

        this.createGridY = function(position, index, y, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.svg.group();

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, y, isLast);
            }

            return axis;
        }

        /**
         * @method center
         *
         * draw center
         *
         * @param {chart.util.svg} g
         * @param {Array} ticks
         * @param {Array} values
         * @param {Number} min
         * @param {Function} checkActive
         */
        this.drawCenter = function(g, ticks, values, checkActive, moveZ) {
            var axis = this.svg.group(),
                line = this.getLineOption();

            if(line) {
                this.drawValueLineCenter(axis, ticks, line);
            }

            this.drawValueTextCenter(axis, ticks, values, checkActive, moveZ);

            g.append(axis);
        }

        this.drawBaseLine = function(position, g) {
            var axis = this.svg.group();
            this.drawAxisLine(position, axis);

            g.append(axis);
        }

        /**
         * @method axisLine
         * theme 이 적용된  axis line 리턴
         * @param {ChartBuilder} chart
         * @param {Object} attr
         */
        this.drawAxisLine = function(position, axis) {
            var isTopOrBottom = (position == "top" || position == "bottom"),
                borderColor = (isTopOrBottom) ? "gridXAxisBorderColor" : "gridYAxisBorderColor",
                borderWidth = (isTopOrBottom) ? "gridXAxisBorderWidth" : "gridYAxisBorderWidth";

            if(position == "center") {
                borderColor = "gridZAxisBorderColor";
                borderWidth = "gridZAxisBorderWidth";
            }

            var face = this.svg.polygon({
                stroke: this.chart.theme(borderColor),
                "stroke-width": this.chart.theme(borderWidth),
                "stroke-opacity" : 1,
                fill: this.chart.theme("gridFaceBackgroundColor"),
                "fill-opacity": this.chart.theme("gridFaceBackgroundOpacity")
            });

            var p = null,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth;

            if(position == "center") {
                p = new GridPolygon("center", w, h, d, x, y);
            } else {
                if(isTopOrBottom) {
                    h = (position == "bottom") ? h : 0;
                    p = new GridPolygon("horizontal", w, h, d, x, y);
                } else {
                    w = (position == "right") ? w : 0;
                    p = new GridPolygon("vertical", w, h, d, x, y);
                }
            }

            // 사각면 위치 계산 및 추가
            this.calculate3d(p);
            for(var i = 0; i < p.vectors.length; i++) {
                face.point(p.vectors[i].x, p.vectors[i].y);
            }

            // Y축이 숨김 상태일 때
            if(position == "center") {
                if(this.axis.get("y").hide !== true) {
                    axis.append(face);
                }
            } else {
                axis.append(face);
            }
        }

        this.drawValueLine = function(position, axis, isActive, line, index, xy, isLast) {
            var isDrawLine = false,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                l1 = null,
                l2 = null;

            if (position == "top") {
                isDrawLine = this.checkDrawLineY(index, isLast);
                l1 = new LinePolygon(xy, y, 0, xy, y, d);
                l2 = new LinePolygon(xy, y, d, xy, y + h, d);
            } else if (position == "bottom" ) {
                isDrawLine = this.checkDrawLineY(index, isLast);
                l1 = new LinePolygon(xy, y + h, 0, xy, y + h, d);
                l2 = new LinePolygon(xy, y + h, d, xy, y, d);
            } else if (position == "left") {
                isDrawLine = this.checkDrawLineX(index, isLast);
                l1 = new LinePolygon(x, xy, 0, x, xy, d);
                l2 = new LinePolygon(x, xy, d, x + w, xy, d);
            } else if (position == "right" ) {
                isDrawLine = this.checkDrawLineX(index, isLast);
                l1 = new LinePolygon(x + w, xy, 0, x + w, xy, d);
                l2 = new LinePolygon(x + w, xy, d, x, xy, d);
            }

            if(isDrawLine) {
                // 폴리곤 계산
                this.calculate3d(l1, l2);

                var lo1 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: l1.vectors[0].x,
                    y1: l1.vectors[0].y,
                    x2: l1.vectors[1].x,
                    y2: l1.vectors[1].y
                });

                var lo2 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: l2.vectors[0].x,
                    y1: l2.vectors[0].y,
                    x2: l2.vectors[1].x,
                    y2: l2.vectors[1].y
                });

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray"),
                        style = (dash == "none" || !dash) ? "3,3" : dash;

                    lo1.attr({ "stroke-dasharray": style });
                    lo2.attr({ "stroke-dasharray": style });
                }

                axis.append(lo1);

                // Y축이 숨김 상태가 아닐 때만 추가
                if(this.axis.get("y").hide !== true) {
                    axis.append(lo2);
                }
            }
        }

        this.drawValueLineCenter = function(axis, ticks, line) {
            var len = (this.grid.type != "block") ? ticks.length - 1 : ticks.length,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                dx = (this.axis.get("y").orient == "left") ? 0 : w,
                dy = (this.axis.get("x").orient == "top") ? 0 : h;

            // z축 라인 드로잉
            for(var i = 1; i < len; i++) {
                var t = i * (d / len),
                    p1 = new LinePolygon(x, y + dy, t, x + w, y + dy, t),
                    p2 = new LinePolygon(x + dx, y, t, x + dx, y + h, t);

                this.calculate3d(p1, p2);

                var lo1 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: p1.vectors[0].x,
                    y1: p1.vectors[0].y,
                    x2: p1.vectors[1].x,
                    y2: p1.vectors[1].y
                });

                var lo2 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: p2.vectors[0].x,
                    y1: p2.vectors[0].y,
                    x2: p2.vectors[1].x,
                    y2: p2.vectors[1].y
                });

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray"),
                        style = (dash == "none" || !dash) ? "3,3" : dash;

                    lo1.attr({ "stroke-dasharray": style });
                    lo2.attr({ "stroke-dasharray": style });
                }

                axis.append(lo1);

                // Y축이 숨김 상태가 아닐 때만 추가
                if(this.axis.get("y").hide !== true) {
                    axis.append(lo2);
                }
            }
        }

        this.drawValueText = function(position, axis, index, xy, domain) {
            if (this.grid.hideText) return;

            var isVertical = (position == "left" || position == "right");

            var tickSize = this.chart.theme("gridTickBorderSize"),
                tickPadding = this.chart.theme("gridTickPadding"),
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                dx = this.axis.area("x"),
                dy = this.axis.area("y"),
                x = 0,
                y = 0;

            if(position == "top") {
                x = xy;
                y = dy + (-(tickSize + tickPadding * 2));
            } else if(position == "bottom") {
                x = xy;
                y = dy + (h + tickSize + tickPadding * 2);
            } else if(position == "left") {
                x = dx + (-(tickSize + tickPadding));
                y = xy;
            } else if(position == "right") {
                x = dx + (w + tickSize + tickPadding);
                y = xy;
            }

            var p = new PointPolygon(x, y, 0);
            this.calculate3d(p);

            axis.append(this.getTextRotate(this.chart.text({
                x: p.vectors[0].x,
                y: p.vectors[0].y,
                dx: !isVertical ? this.chart.theme("gridXFontSize") / 3 : 0,
                dy: isVertical ? this.chart.theme("gridYFontSize") / 3 : 0,
                fill: this.chart.theme(isVertical ? "gridYFontColor" : "gridXFontColor"),
                "text-anchor": isVertical ? (position == "left" ? "end" : "start") : "middle",
                "font-size": this.chart.theme(isVertical ? "gridYFontSize" : "gridXFontSize"),
                "font-weight": this.chart.theme(isVertical ? "gridYFontWeight" : "gridXFontWeight")
            }, domain)));
        }

        this.drawValueTextCenter = function(axis, ticks, values, checkActive, moveZ) {
            if (this.grid.hideText) return;

            var margin = this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding"),
                isLeft = (this.axis.get("y").orient == "left"),
                isTop = (this.axis.get("x").orient == "top"),
                len = (this.grid.type != "block") ? ticks.length - 1 : ticks.length,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                d = this.axis.depth,
                x = this.axis.area("x") + ((isLeft) ? w + margin : -margin),
                y = this.axis.area("y") + ((isTop) ? -margin : h + margin);

            // z축 라인 드로잉
            for(var i = 0; i < ticks.length; i++) {
                var domain = this.format(ticks[i], i),
                    t = i * (d / len) + moveZ,
                    p = new PointPolygon(x, y, t);

                this.calculate3d(p);

                axis.append(this.getTextRotate(this.chart.text({
                    x: p.vectors[0].x,
                    y: p.vectors[0].y,
                    fill: this.chart.theme("gridZFontColor"),
                    "text-anchor": (isLeft) ? "start" : "end",
                    "font-size": this.chart.theme("gridZFontSize"),
                    "font-weight": this.chart.theme("gridZFontWeight")
                }, domain)));
            }
        }

        this.drawPattern = function() {}
        this.drawImage = function() {}
    }

    return Draw3DGrid;
}, "chart.draw");
jui.define("chart.grid.core", [ "util.base", "util.math", "chart.grid.draw2d", "chart.grid.draw3d" ],
	function(_, math, Draw2D, Draw3D) {

	/**
	 * @class chart.grid.core
	 * Grid Core 객체
	 * @extends chart.draw
	 * @abstract
	 */
	var CoreGrid = function() {

		/**
		 * @method wrapper
		 * scale wrapper
		 *
		 * grid 의 x 좌표 값을 같은 형태로 가지고 오기 위한 wrapper 함수
		 *
		 * grid 속성에 key 가 있다면  key 의 속성값으로 실제 값을 처리
		 *
		 *      @example
		 *      // 그리드 속성에 키가 없을 때
		 *      scale(0);		// 0 인덱스에 대한 값  (block, radar)
		 *      // grid 속성에 key 가 있을 때
		 *      grid { key : "field" }
		 *      scale(0)			// field 값으로 scale 설정 (range, date)
		 *
		 * @protected
		 */
		this.wrapper = function(scale, key) {
			return scale;
		}

		/**
		 * @method line
		 * theme 이 적용된  line 리턴
		 * @protected
		 * @param {ChartBuilder} chart
		 * @param {Object} attr
		 */
		this.line = function(attr) {
			return this.chart.svg.line(_.extend({
				x1 : 0,
				y1 : 0,
				x2 : 0,
				y2 : 0,
				stroke : this.color("gridBorderColor"),
				"stroke-width" : this.chart.theme("gridBorderWidth"),
				"stroke-dasharray" : this.chart.theme("gridBorderDashArray"),
				"stroke-opacity" : this.chart.theme("gridBorderOpacity")
			}, attr));
		}

		/**
		 * @method color
		 * grid 에서 color 를 위한 유틸리티 함수
		 * @param theme
		 * @return {Mixed}
		 */
		this.color = function(theme) {
			var color = this.grid.color;

			if (arguments.length == 3) {
				return (color != null) ? this.chart.color(color) : this.chart.theme.apply(this.chart, arguments);
			}

			return (color != null) ? this.chart.color(color) : this.chart.theme(theme);
		}

		/**
		 * @method data
		 * get data for axis
		 * @protected
		 * @param {Number} index
		 * @param {String} field
		 */
		this.data = function(index, field) {
			if(this.axis.data && this.axis.data[index]) {
				return this.axis.data[index][field] || this.axis.data[index];
			}

			return this.axis.data || [];
		}

		this.getGridSize = function() {
			var orient = this.grid.orient,
				depth = this.axis.depth,
				degree = this.axis.degree,
				axis = (orient == "left" || orient == "right") ? this.axis.area("y") : this.axis.area("x"),
				max = (orient == "left" || orient == "right") ? this.axis.area("height") : this.axis.area("width"),
				start = axis,
				size = max,
				end = start + size;

			var result = {
				start: start,
				size: size,
				end: end
			};

			if(!this.axis.isFull3D()) {
				if(depth > 0 || degree > 0) {
					var radian = math.radian(360 - degree),
						x2 = Math.cos(radian) * depth,
						y2 = Math.sin(radian) * depth;

					if(orient == "left") {
						result.start = result.start - y2;
						result.size = result.size - y2;
					} else if(orient == "bottom") {
						result.end = result.end - x2;
						result.size = result.size - x2;
					}
				}
			} else {
				if(orient == "center") { // z축
					result.start = 0;
					result.size = depth;
					result.end = depth;
				}
			}

			return result;
		}

		/**
		 * @method getDefaultOffset
		 *
		 * get real size of grid
		 *
		 * @param {chart.builder} chart
		 * @param {Strng} orient
		 * @param {Object} grid             그리드 옵션
		 * @return {Object}
		 * @return {Number} return.start    시작 지점
		 * @return {Number} return.size     그리드 넓이 또는 높이
		 * @return {Number} return.end      마지막 지점
		 */
		this.getDefaultOffset = function() {
			var orient = this.grid.orient,
				area = this.axis.area();

			var width = area.width,
				height = area.height,
				axis = (orient == "left" || orient == "right") ? area.y : area.x,
				max = (orient == "left" || orient == "right") ? height : width,
				start = axis,
				size = max,
				end = start + size;

			return {
				start: start,
				size: size,
				end: end
			};
		}

		/**
		 * @method getTextRotate
		 * implement text rotate in grid text
		 * @protected
		 * @param {SVGElement} textElement
		 */
		this.getTextRotate = function(textElement) {
			var rotate = this.grid.textRotate;

			if (rotate == null) {
				return textElement;
			}

			if (_.typeCheck("function", rotate)) {
				rotate = rotate.apply(this.chart, [ textElement ]);
			}

			var x = textElement.attr("x");
			var y = textElement.attr("y");

			textElement.rotate(rotate, x, y);

			return textElement;
		}


		this.getLineOption = function() {
			var line = this.grid.line;

			if (typeof line === "string") {
				line = { type : line || "solid"}
			} else if (typeof line === "number") {
				line = { type : "solid", "stroke-width" : line }
			} else if (typeof line !== "object") {
				line = !!line;

				if (line) {
					line = { type : "solid" }
				}
			}

			if (line && !line.type == "string") {
				line.type = line.type.split(/ /g);
			}

			return line;
		}

		this.checkDrawLineY = function(index, isLast) {
			var y = this.axis.get("y");

			if(!y.hide) {
				if (y.orient == "left" && index == 0 && !this.grid.realtime) {
					return false;
				} else if (y.orient == "right" && isLast) {
					return false;
				}
			}

			return true;
		}

		this.checkDrawLineX = function(index, isLast) {
			var x = this.axis.get("x");

			if (!x.hide) {
				if (x.orient == "top" && index == 0) {
					return false;
				} else if (x.orient == "bottom" && isLast && !this.grid.realtime ) {
					return false;
				}
			}

			return true;
		}

		/**
		 * @method top
		 *
		 * draw top
		 *
		 * @param {chart.util.svg} g
		 * @param {Array} ticks
		 * @param {Array} values
		 * @param {Number} min
		 * @param {Function} checkActive
		 */
		this.drawTop = function(g, ticks, values, checkActive, moveX) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					x = values[i] - moveX,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("top", g, ticks[i], i, x, 0);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridX("top", i, x, isActive, isLast);
				this.drawValueText("top", axis, i, values[i], domain, moveX, isActive);

				g.append(axis);
			}
		}

		this.drawBottom = function(g, ticks, values, checkActive, moveX) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					x = values[i] - moveX,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("bottom", g, ticks[i], i, x, 0);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridX("bottom", i, x, isActive, isLast);
				this.drawValueText("bottom", axis, i, values[i], domain, moveX, isActive);

				g.append(axis);
			}
		}

		this.drawLeft = function(g, ticks, values, checkActive, moveY) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					y = values[i] - moveY,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("left", g, ticks[i], i, 0, y);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridY("left", i, y, isActive, isLast);
				this.drawValueText("left", axis, i, values[i], domain, moveY, isActive);

				g.append(axis);
			}
		}

		this.drawRight = function(g, ticks, values, checkActive, moveY) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					y = values[i] - moveY,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("right", g, ticks[i], i, 0, y);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridY("right", i, y, isActive, isLast);
				this.drawValueText("right", axis, i, values[i], domain, moveY, isActive);

				g.append(axis);
			}
		}

		/**
		 * @method drawGrid
		 * draw base grid structure
		 * @protected
		 * @param {chart.builder} chart
		 * @param {String} orient
		 * @param {String} cls
		 * @param {Grid} grid
		 */
		this.drawGrid = function() {
			// create group
			var root = this.chart.svg.group(),
				func = this[this.grid.orient],
				draw = (this.axis.isFull3D()) ? Draw3D : Draw2D;

			// wrapped scale
			this.scale = this.wrapper(this.scale, this.grid.key);

			// render axis
			if(_.typeCheck("function", func)) {
				draw.call(this);
				func.call(this, root);
			}

			// hide grid
			if(this.grid.hide) {
				root.attr({ display : "none" })
			}

			return {
				root : root,
				scale : this.scale
			};
		}

		/**
		 * @method drawAfter
		 *
		 * @param {Object} obj
		 * @protected
		 */
		this.drawAfter = function(obj) {
			obj.root.attr({ "class" : "grid-" + this.grid.type });
			obj.root.translate(this.chart.area("x") , this.chart.area("y"));
		}
	}

	CoreGrid.setup = function() {

		/** @property {chart.builder} chart */
		/** @property {chart.axis} axis */
		/** @property {Object} grid */

		return {
			/**  @cfg {Number} [dist=0] Able to change the locatn of an axis.  */
			dist: 0,
			/**  @cfg {"top"/"left"/"bottom"/"right"} [orient=null] Specifies the direction in which an axis is shown (top, bottom, left or right). */
			orient: null,
			/** @cfg {Boolean} [hide=false] Determines whether to display an applicable grid.  */
			hide: false,
			/** @cfg {String/Object/Number} [color=null] Specifies the color of a grid. */
			color: null,
			/** @cfg {String} [title=null] Specifies the text shown on a grid.*/
			title: null,
			/** @cfg {Boolean} [hide=false] Determines whether to display a line on the axis background. */
			line: false,
			/** @cfg {Function} [format=null]  Determines whether to format the value on an axis. */
			format: null,
			/** @cfg {Function} [image=null]  Determines whether to image the value on an axis. */
			image: null,
			/** @cfg {Number} [textRotate=null] Specifies the slope of text displayed on a grid. */
			textRotate : null
		};
	}

	return CoreGrid;
}, "chart.draw"); 
jui.define("chart.grid.block", [ "util.scale", "util.base" ], function(UtilScale, _) {

	/**
	 * @class chart.grid.block
	 * Implements Block Grid
	 *
	 *  { type : "block", domain : [ 'week1', 'week2', 'week3' ] }
	 *
	 * @extends chart.grid.core
	 */
	var BlockGrid = function() {
		this.center = function(g) {
			this.drawCenter(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("center", g);
		}

		this.top = function(g) {
			this.drawPattern("top", this.domain, this.points, true);
			this.drawTop(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("top", g);
			g.append(this.createGridX("top", this.domain.length, this.end, null, true));
		}

		this.bottom = function(g) {
			this.drawPattern("bottom", this.domain, this.points, true);
			this.drawBottom(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("bottom", g);
			g.append(this.createGridX("bottom", this.domain.length, this.end, null, true));
		}

		this.left = function(g) {
			this.drawPattern("left", this.domain, this.points, true);
			this.drawLeft(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("left", g);
			g.append(this.createGridY("left", this.domain.length, this.end, null, true));
		}

		this.right = function(g) {
			this.drawPattern("right", this.domain, this.points, true);
			this.drawRight(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("right", g);
			g.append(this.createGridY("right", this.domain.length, this.end, null, true));
		}

		this.initDomain = function() {

			var domain = [];

			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;
				var data = this.data();

				if (this.grid.reverse) {
					var start = data.length - 1,
						end = 0,
						step = -1;
				} else {
					var start = 0,
						end = data.length - 1,
						step = 1;
				}

				for (var i = start; ((this.grid.reverse) ? i >= end : i <=end); i += step) {
					domain.push(data[i][field]);
				}

				//grid.domain = domain;
			} else if (_.typeCheck("function", this.grid.domain)) {	// block 은 배열을 통째로 리턴함
				domain = this.grid.domain.call(this.chart);
			} else {
				domain = this.grid.domain;
			}

			if (this.grid.reverse) {
				domain.reverse();
			}

			return domain;

		}

		this.wrapper = function(scale, key) {
			var old_scale = scale;
			var self = this;
			var len = self.domain.length;
			var reverse = self.grid.reverse;

			function new_scale(i) {
				if (typeof i == 'number' && key) {
					return old_scale(self.axis.data[i][key]);
				} else {
					return old_scale(reverse ? len - i - 1 : i);
				}

			}

			return (key) ? _.extend(new_scale, old_scale) : old_scale;
		}

		this.drawBefore = function() {
			var domain = this.initDomain(),
				obj = this.getGridSize(),
				range = [ obj.start, obj.end ];

			// scale 설정
			this.scale = UtilScale.ordinal().domain(domain);
			this.scale.rangePoints(range);

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.points = this.scale.range();
			this.domain = this.scale.domain();

			this.band = this.scale.rangeBand();
			this.half_band = this.band/2;
			this.bar = 6;
			this.reverse = this.grid.reverse;
		}

		this.draw = function() {
			return this.drawGrid("block");
		}
	}


	BlockGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {Number} [max=10] Sets the maximum value of a grid. */
			max: 10,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null
		};
	}

	return BlockGrid;
}, "chart.grid.core");
jui.define("chart.grid.date", [ "util.time", "util.scale", "util.base" ], function(UtilTime, UtilScale, _) {

	/**
	 * @class chart.grid.date
	 * @extends chart.grid.core
	 */
	var DateGrid = function() {

		this.center = function(g) {
			this.drawCenter(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("center", g);
		}

		this.top = function(g) {
			this.drawPattern("top", this.ticks, this.values);
			this.drawTop(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("top", g);
		}

		this.bottom = function(g) {
			this.drawPattern("bottom", this.ticks, this.values);
			this.drawBottom(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("bottom", g);
		}

		this.left = function(g) {
			this.drawPattern("left", this.ticks, this.values);
			this.drawLeft(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("left", g);
		}

		this.right = function(g) {
			this.drawPattern("right", this.ticks, this.values);
			this.drawRight(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("right", g);
		}

		this.wrapper = function(scale, key) {
			var old_scale = scale;
			var self = this;

			function new_scale(i) {
				if (typeof i == 'number') {
					return old_scale(self.axis.data[i][key]);
				} else {
					return old_scale(+i);
				}
			}

			return (key) ? _.extend(new_scale, old_scale) : old_scale;
		}

		this.initDomain = function() {
			var domain = [],
				interval = [];
			var min = this.grid.min || undefined,
				max = this.grid.max || undefined;
			var data = this.data(),
				value_list = [] ;

			if (_.typeCheck("string", this.grid.domain) ) {
				if (data.length > 0) {
					var field = this.grid.domain;
					value_list.push(+data[0][field]);
					value_list.push(+data[data.length-1][field]);
				}
			} else if (_.typeCheck("function", this.grid.domain)) {
				var index = data.length;

				while(index--) {
					var value = this.grid.domain.call(this.chart, data[index]);

					if (_.typeCheck("array", value)) {
						value_list[index] = Math.max.apply(Math, value);
						value_list.push(Math.min.apply(Math, value));
					} else {
						value_list[index]  = value;
					}
				}
			} else {
				value_list = this.grid.domain;
			}

			if (_.typeCheck("undefined", min) && value_list.length > 0 ) min = Math.min.apply(Math, value_list);
			if (_.typeCheck("undefined", max) && value_list.length > 0 ) max = Math.max.apply(Math, value_list);

			domain = [ min, max ];
			interval = this.grid.interval;

			if (this.grid.reverse) {
				domain.reverse();
			}

			if (_.typeCheck("function", interval)) {
				this.interval = interval.call(this.chart, domain);
			} else {
				this.interval = interval;
			}

			return domain;
		}

		this.drawBefore = function() {
			var domain = this.initDomain();

			var obj = this.getGridSize(),
				range = [obj.start, obj.end];

			this.scale = UtilScale.time().domain(domain).range(range);

			this.scale.clamp(this.grid.clamp);

			// 기본값 설정
			this.ticks = [];

			if (this.grid.realtime != null && UtilTime[this.grid.realtime] == this.grid.realtime) {
				var ticks = this.scale.realTicks(this.grid.realtime, this.interval);
			} else {
				var ticks = this.scale.ticks("milliseconds", this.interval);
			}

			/* data 없을 때도 기본 설정만으로 보여야 하기 때문에. 지우겠음
			if (this.axis.data.length == 0) {
				//this.ticks = [];
			} */

			if ( typeof this.grid.format == "string") {
				(function(grid, str) {
					grid.format = function(value) {
						return UtilTime.format(value, str);
					}
				})(this.grid, this.grid.format)
			}

			// interval = [this.time.days, 1];
			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.bar = 6;
			this.values = [];

			for (var i = 0, len = ticks.length; i < len; i++) {
				var value = this.scale(ticks[i]);

				if (value >= obj.start && value <= obj.end) {
					this.values.push(value);
					this.ticks.push(ticks[i]);
				}
			}
		}

		this.draw = function() {
			return this.drawGrid("date");
		}
	}

	DateGrid.setup = function() {
		return {
			/** @cfg {Array} [domain=null] Sets the value displayed on a grid. */
			domain: null,
			/** @cfg {Number} [interval=1000] Sets the interval of the scale displayed on a grid.*/
			interval : 1000,
			/** @cfg {Number} [min=null] Sets the minimum timestamp of a grid.  */
			min: null,
			/** @cfg {Number} [max=null] Sets the maximum timestamp of a grid. */
			max: null,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null,
			/** @cfg {"years"/"months"/"days"/"hours"/"minutes"/"seconds"/"milliseconds"} [realtime=""] Determines whether to use as a real-time grid. */
			realtime: null,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false
		};
	}

	return DateGrid;
}, "chart.grid.core");

jui.define("chart.grid.dateblock", [ "util.time", "util.scale", "util.base" ], function(UtilTime, UtilScale, _) {

	/**
	 * @class chart.grid.dateblock
	 * @extends chart.grid.date
	 */
	var DateBlockGrid = function() {

		this.wrapper = function(scale, key) {
			var old_scale = scale;
			var self = this;

			old_scale.rangeBand = function() {
				return self.grid.unit;
			}

			return old_scale;
		}

		this.initDomain = function() {
			var domain = [],
				interval = [];
			var min = this.grid.min || undefined,
				max = this.grid.max || undefined;
			var data = this.data(),
				value_list = [] ;

			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;
				value_list.push(+data[0][field]);
				value_list.push(+data[data.length-1][field]);
			} else if (_.typeCheck("function", this.grid.domain)) {
				var index = data.length;

				while(index--) {
					var value = this.grid.domain.call(this.chart, data[index]);

					if (_.typeCheck("array", value)) {
						value_list[index] = +Math.max.apply(Math, value);
						value_list.push(+Math.min.apply(Math, value));
					} else {
						value_list[index]  = +value;
					}
				}
			} else {
				value_list = this.grid.domain;
			}

			if (_.typeCheck("undefined", min)) min = Math.min.apply(Math, value_list);
			if (_.typeCheck("undefined", max)) max = Math.max.apply(Math, value_list);

			domain = [ min, max ];
			interval = this.grid.interval;

			if (this.grid.reverse) {
				domain.reverse();
			}

			if (_.typeCheck("function", interval)) {
				domain.interval = interval.call(this.chart, domain);
			} else {
				domain.interval = interval;
			}

			return domain;
		}

		this.drawBefore = function() {
			var domain = this.initDomain(),
				obj = this.getGridSize(), range = [obj.start, obj.end],
				time = UtilScale.time().domain(domain).rangeRound(range);

			if (this.grid.realtime != null && UtilTime[this.grid.realtime] == this.grid.realtime) {
				this.ticks = time.realTicks(this.grid.realtime, domain.interval);
			} else {
				this.ticks = time.ticks("milliseconds", domain.interval);
			}

			var len = this.axis.data.length - 1;
			var unit = this.grid.unit = Math.abs(range[0] - range[1])/(len);

			if ( typeof this.grid.format == "string") {
				(function(grid, str) {
					grid.format = function(value) {
						return UtilTime.format(value, str);
					}
				})(this.grid, this.grid.format)
			}

			// interval = [this.time.days, 1];
			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.bar = 6;
			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = time(this.ticks[i]);
			}

			var self = this;
			this.scale = _.extend((function(i) {
				// area 시작 영역 추가
				return  self.start + i * unit;
			}), time);

		}

		this.draw = function() {
			return this.drawGrid("dateblock");
		}
	}

	return DateBlockGrid;
}, "chart.grid.date");

jui.define("chart.grid.fullblock", [ "util.scale", "util.base" ], function(UtilScale, _) {

    /**
     * @class chart.grid.block
     * @extends chart.grid.core
     */
    var FullBlockGrid = function() {
        this.center = function(g) {
            this.drawCenter(g, this.domain, this.points, null, 0);
            this.drawBaseLine("center", g);
        }

        this.top = function(g) {
            this.drawPattern("top", this.domain, this.points);
            this.drawTop(g, this.domain, this.points, null, 0);
            this.drawBaseLine("top", g);
        }

        this.bottom = function(g) {
            this.drawPattern("bottom", this.domain, this.points);
            this.drawBottom(g, this.domain, this.points, null, 0);
            this.drawBaseLine("bottom", g);
        }

        this.left = function(g) {
            this.drawPattern("left", this.domain, this.points);
            this.drawLeft(g, this.domain, this.points, null, 0);
            this.drawBaseLine("left", g);
        }

        this.right = function(g) {
            this.drawPattern("right", this.domain, this.points);
            this.drawRight(g, this.domain, this.points, null, 0);
            this.drawBaseLine("right", g);
        }

        this.initDomain = function() {

            var domain = [];

            if (_.typeCheck("string", this.grid.domain)) {
                var field = this.grid.domain;
                var data = this.data();

                if (this.grid.reverse) {
                    var start = data.length - 1,
                        end = 0,
                        step = -1;
                } else {
                    var start = 0,
                        end = data.length - 1,
                        step = 1;
                }

                for (var i = start; ((this.grid.reverse) ? i >= end : i <=end); i += step) {
                    domain.push(data[i][field]);
                }

                //grid.domain = domain;
            } else if (_.typeCheck("function", this.grid.domain)) {	// block 은 배열을 통째로 리턴함
                domain = this.grid.domain.call(this.chart);
            } else {
                domain = this.grid.domain;
            }

            if (this.grid.reverse) {
                domain.reverse();
            }

            return domain;

        }

        this.wrapper = function(scale, key) {
            var old_scale = scale;
            var self = this;
            var len = self.domain.length;
            var reverse = self.grid.reverse;

            function new_scale(i) {
                if (typeof i == 'number' && key) {
                    return old_scale(self.axis.data[i][key]);
                } else {
                    return old_scale(reverse ? len - i : i);
                }

            }

            return (key) ? _.extend(new_scale, old_scale) : old_scale;
        }

        this.drawBefore = function() {
            var domain = this.initDomain();

            var obj = this.getGridSize();

            // scale 설정
            this.scale = UtilScale.ordinal().domain(domain);
            var range = [obj.start, obj.end];

            this.scale.rangeBands(range);

            this.start = obj.start;
            this.size = obj.size;
            this.end = obj.end;
            this.points = this.scale.range();
            this.domain = this.scale.domain();

            this.band = this.scale.rangeBand();
            this.half_band = 0 ;
            this.bar = 6;
            this.reverse = this.grid.reverse;
        }

        this.draw = function() {
            return this.drawGrid("fullblock");
        }
    }


    FullBlockGrid.setup = function() {
        return {
            /** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
            domain: null,
            /** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
            reverse: false,
            /** @cfg {Number} [max=10] Sets the maximum value of a grid. */
            max: 10,
            /** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
            hideText: false
        };
    }

    return FullBlockGrid;
}, "chart.grid.core");

jui.define("chart.grid.radar", [ "util.math", "util.base" ], function(math, _) {

	/**
	 * @class chart.grid.radar
	 * @extends chart.grid.core
	 */
	var RadarGrid = function() {
		var self = this,
			position = [];

		function drawCircle(root, centerX, centerY, x, y, count) {
			var r = Math.abs(y),
				cx = centerX,
				cy = centerY;

			root.append(self.chart.svg.circle({
				cx : cx,
				cy : cy,
				r : r,
				"fill-opacity" : 0,
				stroke : self.color("gridBorderColor"),
				"stroke-width" : self.chart.theme("gridBorderWidth")
			}));
		}

		function drawRadial(root, centerX, centerY, x, y, count, unit) {
			var g = self.chart.svg.group();
			var points = [];

			points.push([centerX + x, centerY + y]);

			var startX = x,
				startY = y;

			for (var i = 0; i < count; i++) {
				var obj = math.rotate(startX, startY, unit);

				startX = obj.x;
				startY = obj.y;

				points.push([centerX + obj.x, centerY + obj.y]);
			}

			var path = self.chart.svg.path({
				"fill" : "none",
				stroke : self.color("gridBorderColor"),
				"stroke-width" : self.chart.theme("gridBorderWidth")
			});

			for (var i = 0; i < points.length; i++) {
				var point = points[i];

				if (i == 0) {
					path.MoveTo(point[0], point[1])
				} else {
					path.LineTo(point[0], point[1]);
				}
			}

			path.LineTo(points[0][0], points[0][1]);
			//path.ClosePath();

			g.append(path);
			root.append(g);
		}

        function scale(obj) {
            var max = self.grid.max;

            var dx = self.chart.padding('left');
            var dy = self.chart.padding('top');

            return function(index, value) {
                var rate = value / max;

				var height = Math.abs(obj.y1) - Math.abs(obj.y2),
					pos = height * rate,
					unit = 2 * Math.PI / self.domain.length;

				var cx = obj.x1,
					cy = obj.y1,
					y = -pos,
					x = 0;

                var o = math.rotate(x, y, unit * index);
                
                var result = {
                    x : dx + cx + o.x,
                    y : dy + cy + o.y
                }

                return result;
            }
        }

		this.initDomain = function() {
			var domain = [];
			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;
				var data = this.data();

				if (this.grid.reverse) {
					var start = data.length - 1,
						end = 0,
						step = -1;
				} else {
					var start = 0,
						end = data.length - 1,
						step = 1;
				}

				for (var i = start; ((this.grid.reverse) ? i >= end : i <=end); i += step) {
					domain.push(data[i][field]);
				}

				//grid.domain = domain;
			} else if (_.typeCheck("function", this.grid.domain)) {	// block 은 배열을 통째로 리턴함
				domain = this.grid.domain(this.chart, this.grid);
			} else {
				domain = this.grid.domain;
			}

			if (this.grid.reverse) {
				domain.reverse();
			}

			return domain;

		}

		this.drawBefore = function() {
			this.domain = this.initDomain();
		}

		this.draw = function() {
			var width = this.axis.area('width'), height = this.axis.area('height');
			var min = width;

			if (height < min) {
				min = height;
			}

			// center
			var w = min / 2,
				centerX = this.axis.area('x') + width / 2,
				centerY = this.axis.area('y') + height / 2;

			var startY = -w,
				startX = 0,
				count = this.domain.length,
				step = this.grid.step,
				unit = 2 * Math.PI / count,
				h = Math.abs(startY) / step;

			var g = this.chart.svg.group(),
				root = this.chart.svg.group();

			g.append(root);

			// domain line
			position = [];

			for (var i = 0; i < count; i++) {
				var x2 = centerX + startX,
					y2 = centerY + startY;

				root.append(this.chart.svg.line({
					x1 : centerX,
					y1 : centerY,
					x2 : x2,
					y2 : y2,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));

				position[i] = {
					x1 : centerX,
					y1 : centerY,
					x2 : x2,
					y2 : y2
				};

				var ty = y2,
					tx = x2,
					talign = "middle";

				if (y2 > centerY) {
					ty = y2 + 20;
				} else if (y2 < centerY) {
					ty = y2 - 10;
				}

				if (x2 > centerX) {
					talign = "start";
					tx += 10;
				} else if (x2 < centerX) {
					talign = "end";
					tx -= 10;
				}

				if (!this.grid.hideText) {
					root.append(this.chart.text({
						x : tx,
						y : ty,
						"text-anchor" : talign,
						"font-size" : this.chart.theme("gridCFontSize"),
						"font-weight" : this.chart.theme("gridCFontWeight"),
						fill : this.chart.theme("gridCFontColor")
					}, this.domain[i]))
				}
				
				var obj = math.rotate(startX, startY, unit);

				startX = obj.x;
				startY = obj.y;
			}

			if (!this.grid.line) {
				return {
					root : root , 
					scale : scale(position[0])
				};
			}

			// area split line
			startY = -w;
			var stepBase = 0,
				stepValue = this.grid.max / this.grid.step;

			for (var i = 0; i < step; i++) {
				if (i == 0 && this.grid.extra) {
					startY += h;
					continue;
				}

				if (this.grid.shape == "circle") {
					drawCircle(root, centerX, centerY, 0, startY, count);
				} else {
					drawRadial(root, centerX, centerY, 0, startY, count, unit);
				}

				if (!this.grid.hideText) {
					root.append(this.chart.text({
						x : centerX,
						y : centerY + (startY + h - 5),
						"font-size" : this.chart.theme("gridCFontSize"),
						"font-weight" : this.chart.theme("gridCFontWeight"),
						fill : this.chart.theme("gridCFontColor")
					}, (this.grid.max - stepBase) + ""))
				}

				startY += h;
				stepBase += stepValue;
			}
			
			// hide
			if (this.grid.hide) {
				root.attr({ display : "none" })
			}			

			return {
				root : root, 
				scale : scale(position[0])
			};
		}
	}

	RadarGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {Number} [max=null] Sets the maximum value of a grid. */
			max: 100,
			/** @cfg {Array} [step=10] Sets the interval of the scale displayed on a grid. */
            step : 10,
			/** @cfg {Boolean} [line=true] Determines whether to display a line on the axis background. */
			line: true,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {Boolean} [extra=false] Leaves a certain spacing distance from the grid start point and displays a line where the spacing ends. */
			extra: false,
			/** @cfg {"radial"/"circle"} [shape="radial"] Determines the shape of a grid (radial, circle). */
			shape: "radial" // or circle
		};
	}

	return RadarGrid;
}, "chart.grid.core");

jui.define("chart.grid.range", [ "util.scale", "util.base", "util.math" ], function(UtilScale, _, math) {

	/**
	 * @class chart.grid.range
	 * @extends chart.grid.core
	 */
	var RangeGrid = function() {
		this.center = function(g) {
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawCenter(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("center", g);
		}

		this.top = function(g) {
			this.drawPattern("top", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawTop(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("top", g);
		}

		this.bottom = function(g) {
			this.drawPattern("bottom", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawBottom(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("bottom", g);
		}

		this.left = function(g) {
			this.drawPattern("left", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawLeft(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("left", g);
		}

		this.right = function(g) {
			this.drawPattern("right", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawRight(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("right", g);
		}

        this.wrapper = function(scale, key) {
            var old_scale = scale;
            var self = this;

            function new_scale(i) {
                return old_scale(self.axis.data[i][key]);
            }

            return (key) ? _.extend(new_scale, old_scale) : old_scale;
        }

		this.initDomain = function() {

			var domain = [];
			var min = this.grid.min || undefined,
				max = this.grid.max || undefined,
				data = this.data();
			var value_list = [];
			var isArray = false;

			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;

				value_list = new Array(data.length);
				var index = data.length;
				while(index--) {
					var value = data[index][field];

					if (_.typeCheck("array", value)) {
						value_list[index] = Math.max(value);
						value_list.push(Math.min(value));
					} else {
						value_list[index]  = value;
						value_list.push(0);
					}
				}
			} else if (_.typeCheck("function", this.grid.domain)) {
				value_list = new Array(data.length);

                var isCheck = false;
				var index = data.length;
				while(index--) {

					var value = this.grid.domain.call(this.chart, data[index]);

					if (_.typeCheck("array", value)) {

						value_list[index] = Math.max.apply(Math, value);
						value_list.push(Math.min.apply(Math, value));
					} else {
						value_list[index]  = value;

                        if (!isCheck) {
                            value_list.push(0);
                            isCheck = true;
                        }

					}
				}
			} else {
				value_list = this.grid.domain;
				isArray = true;
			}

			var tempMin = Math.min.apply(Math, value_list);
			var tempMax = Math.max.apply(Math, value_list);

			if (isArray) {
				min = tempMin;
				max = tempMax;
			} else {
				if (typeof min == 'undefined' || min > tempMin) min = tempMin;
				if (typeof max == 'undefined' || max < tempMax) max = tempMax;
			}

			var unit;
			var hasUnit = true;
			if (_.typeCheck("function", this.grid.unit)) {
				unit = this.grid.unit.call(this.chart, this.grid);
			} else if (_.typeCheck("number", this.grid.unit)) {
				unit = this.grid.unit;
			} else {

				if (min > 0) {
					min = Math.floor(min);
				}

				unit = math.div((max - min), this.grid.step);   // (max - min) / this.grid.step

				if (unit > 1) {
					unit = Math.ceil(unit);
				} else if (0 < unit && unit < 1) {
					unit = math.div(Math.ceil(math.multi(unit, 10)),10);
				}

			}

			if (unit == 0) {
				domain = [0, 0];
			} else {

				var start = 0;

				var fixed = math.fixed(unit);
				while (start < max) {
					start = fixed.plus(start, unit);
				}

				var end = start;
				while (end > min) {
				  end = fixed.minus(end, unit);
				}
        
				domain = [end, start];

				domain.step = (Math.abs(end - start) / unit);

			}

			if (this.grid.reverse) {
				domain.reverse();
			}
            
			return domain;
		}

		this.drawBefore = function() {
			var domain = this.initDomain();

			var obj = this.getGridSize();

			this.scale = UtilScale.linear().domain(domain);

			if (this.grid.orient == "left" || this.grid.orient == "right") {
                var arr = [obj.end, obj.start];
			} else {
                var arr = [obj.start, obj.end]
			}

            this.scale.range(arr);
			this.scale.clamp(this.grid.clamp)

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.step = domain.step;
			this.nice = this.grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);

			if (this.grid.orient == 'left' || this.grid.orient == 'right') {
				this.ticks.reverse();
			}

			this.bar = 6;

			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}

		}

		this.draw = function() {
			return this.drawGrid("range");
		}
	}

	RangeGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Array} [step=10] Sets the interval of the scale displayed on a grid. */
			step: 10,
			/** @cfg {Number} [min=0] Sets the minimum value of a grid.  */
			min: 0,
			/** @cfg {Number} [max=0] Sets the maximum value of a grid. */
			max: 0,
			/** @cfg {Number} [unit=null] Multiplies the axis value to be displayed.  */
			unit: null,
			/**
			 * @cfg {Boolean} [clamp=true]
			 *
			 * max 나 min 을 넘어가는 값에 대한 체크,
			 * true 이면 넘어가는 값도 min, max 에서 조정, false 이면  비율로 계산해서 넘어가는 값 적용
			 */
			clamp : true,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {Boolean} [nice=false] Automatically sets the value of a specific section.  */
			nice: false
		};
	}

	return RangeGrid;
}, "chart.grid.core");

jui.define("chart.grid.log", [ "util.scale", "util.base" ], function(UtilScale, _) {

	/**
	 * @class chart.grid.log
	 * @extends chart.grid.range
	 */
	var LogGrid = function() {

		this.drawBefore = function() {
			this.grid.unit = false;

			var domain = this.initDomain();

			var obj = this.getGridSize();

			this.scale = UtilScale.log(this.grid.base).domain(domain);

			if (this.grid.orient == "left" || this.grid.orient == "right") {
                var arr = [obj.end, obj.start];
			} else {
                var arr = [obj.start, obj.end]
			}
            this.scale.range(arr);

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.step = this.grid.step;
			this.nice = this.grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);

			if (this.grid.orient == 'left' || this.grid.orient == 'right') {
				this.ticks.reverse();
			}

			this.bar = 6;

			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}

		}

		this.draw = function() {
			return this.drawGrid("log");
		}
	}

	LogGrid.setup = function() {
		return {
			/** @cfg {Number} [base=10] log's base */
			base : 10,
			step : 4,
			nice : false,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false
		};
	}

	return LogGrid;
}, "chart.grid.range");

jui.define("chart.grid.rule", [ "util.scale", "util.base" ], function(UtilScale, _) {

	/**
	 * @class chart.grid.rule
	 * @extends chart.grid.core
	 */
	var RuleGrid = function() {

		this.top = function(g) {
			var height = this.axis.area('height'),
				half_height = height/2;

			g.append(this.axisLine({
				y1 : this.center ? half_height : 0,
				y2 : this.center ? half_height : 0,
				x1 : this.start,
				x2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate(values[i], (this.center) ? half_height : 0)

				axis.append(this.line({
				  y1 : (this.center) ? -bar : 0,
					y2 : bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));

				if (!isZero || (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
						x : 0,
						y : bar + bar + 4,
						"text-anchor" : "middle",
						fill : this.chart.theme("gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

		this.bottom = function(g) {
			var height = this.axis.area('height'),
				half_height = height/2;
		  
			g.append(this.axisLine({
				y1 : this.center ? -half_height : 0,
				y2 : this.center ? -half_height : 0,
				x1 : this.start,
				x2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate(values[i], (this.center) ? -half_height : 0);

				axis.append(this.line({
				  y1 : (this.center) ? -bar : 0,
					y2 : (this.center) ? bar : -bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));
				
				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
						x : 0,
						y : -bar * 2,
						"text-anchor" : "middle",
						fill : this.chart.theme(isZero, "gridActiveFontColor", "gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

		this.left = function(g) {
			var width = this.axis.area('width'),
				height = this.axis.area('height'),
				half_width = width/2;

			g.append(this.axisLine({
				x1 : this.center ? half_width : 0,
				x2 : this.center ? half_width : 0,
				y1 : this.start ,
				y2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate((this.center) ? half_width : 0, values[i])

				axis.append(this.line({
					x1 : (this.center) ? -bar : 0,
					x2 : bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));
				
				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
					  x : bar/2 + 4,
					  y : bar-2,
					  fill : this.chart.theme("gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

		this.right = function(g) {
			var width = this.axis.area('width'),
				half_width = width/2;

			g.append(this.axisLine({
				x1 : this.center ? -half_width : 0,
				x2 : this.center ? -half_width : 0,
				y1 : this.start ,
				y2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate((this.center) ? -half_width : 0, values[i]);

				axis.append(this.line({
					x1 : (this.center) ? -bar : 0,
					x2 : (this.center) ? bar : -bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));

				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
						x : -bar - 4,
						y : bar-2,
						"text-anchor" : "end",
						fill : this.chart.theme("gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

        this.wrapper = function(scale, key) {
            var old_scale = scale;
            var self = this;

            function new_scale(i) {
                return old_scale(self.axis.data[i][key]);
            }

            return (key) ? _.extend(new_scale, old_scale) : old_scale;
        }

        this.initDomain = function() {

			var domain = [];
            var min = this.grid.min || undefined,
                max = this.grid.max || undefined,
                data = this.data();
            var value_list = [];

            if (_.typeCheck("string", this.grid.domain)) {
                var field = this.grid.domain;

                value_list = new Array(data.length);
                for (var index = 0, len = data.length; index < len; index++) {

                    var value = data[index][field];

                    if (_.typeCheck("array", value)) {
                        value_list[index] = Math.max(value);
                        value_list.push(Math.min(value));
                    } else {
                        value_list[index]  = value;
                    }

                }
            } else if (_.typeCheck("function", this.grid.domain)) {
                value_list = new Array(data.length);

                for (var index = 0, len = data.length; index < len; index++) {

                    var value = this.grid.domain.call(this.chart, data[index]);

                    if (_.typeCheck("array", value)) {

                        value_list[index] = Math.max.apply(Math, value);
                        value_list.push(Math.min.apply(Math, value));
                    } else {
                        value_list[index]  = value;
                    }
                }
            } else {
                value_list = grid.domain;
            }

            var tempMin = Math.min.apply(Math, value_list);
            var tempMax = Math.max.apply(Math, value_list);

            if (typeof min == 'undefined') min = tempMin;
            if (typeof max == 'undefined') max = tempMax;

            this.grid.max = max;
            this.grid.min = min;

            var unit;

            if (_.typeCheck("function", this.grid.unit)) {
                unit = this.grid.unit.call(this.chart, this.grid);
            } else if (_.typeCheck("number", this.grid.unit)) {
                unit = this.grid.unit;
            } else {
                unit = Math.ceil((max - min) / this.grid.step);
            }

            if (unit == 0) {
                domain = [0, 0];
            } else {

                var start = 0;

                while (start < max) {
                    start += unit;
                }

                var end = start;
                while (end > min) {
                    end -= unit;
                }

                domain = [end, start];
                //this.grid.step = Math.abs(start / unit) + Math.abs(end / unit);
            }

            if (this.grid.reverse) {
                domain.reverse();
            }

            return domain;
        }

		this.drawBefore = function() {
			var domain = this.initDomain();

			var obj = this.getGridSize();
			this.scale = UtilScale.linear().domain(domain);

            if (this.grid.orient == "left" || this.grid.orient == "right") {
                var arr = [obj.end, obj.start];
            } else {
                var arr = [obj.start, obj.end]
            }
            this.scale.range(arr);

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.step = this.grid.step;
			this.nice = this.grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);
			this.bar = 6;
			this.hideZero = this.grid.hideZero;
			this.center = this.grid.center;
			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}
		}

		this.draw = function() {
			return this.drawGrid(chart, orient, "rule", grid);
		}
	}

	RuleGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Array} [step=10] Sets the interval of the scale displayed on a grid. */
			step: 10,
			/** @cfg {Number} [min=0] Sets the minimum value of a grid.  */
			min: 0,
			/** @cfg {Number} [max=0] Sets the maximum value of a grid. */
			max: 0,
			/** @cfg {Number} [unit=null] Multiplies the axis value to be displayed.  */
			unit: null,
			/**
			 * @cfg {Boolean} [clamp=true]
			 *
			 * max 나 min 을 넘어가는 값에 대한 체크,
			 * true 이면 넘어가는 값도 min, max 에서 조정, false 이면  비율로 계산해서 넘어가는 값 적용
			 */
			clamp : true,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {Boolean} [hideZero=false] Determines whether to show '0' displayed on the grid. */
			hideZero: false,
			/** @cfg {Boolean} [nice=false] Automatically sets the value of a specific section.  */
			nice: false,
			/** @cfg {Boolean} [center=false] Place the reference axis in the middle.  */
			center: false

		};
	}

	return RuleGrid;
}, "chart.grid.core");

jui.define("chart.grid.panel", [ "util.base" ], function(_) {

    /**
     * @class chart.grid.panel
     * @extends chart.grid.core
     */
    var PanelGrid = function() {

        this.custom = function(g) {
            var obj = this.scale(0);

            obj.x -= this.axis.area("x");
            obj.y -= this.axis.area("y");

            g.append(this.chart.svg.rect(_.extend(obj, {
                fill : "transparent",
                stroke : "transparent"
            })));
        }

        this.drawBefore = function() {
            this.scale = (function(axis) {
                return function(i) {

                    return {
                        x : axis.area("x"),
                        y : axis.area("y"),
                        width : axis.area("width"),
                        height : axis.area("height")
                    }
                }
            })(this.axis);
        }

        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid("panel");
        }
    }
    
    return PanelGrid;
}, "chart.grid.core");

jui.define("chart.grid.table", [  ], function() {

    /**
     * @class chart.grid.table
     * @extends chart.grid.core
     */
    var TableGrid = function(chart, axis, grid) {
        var rowUnit, columnUnit, outerPadding, row, column ;

        this.custom = function(g) {
            for(var r = 0; r < row; r++) {
                for (var c = 0; c < column; c++) {
                    var index = r * column + c;

                    var obj = this.scale(index);
                    
                    obj.x -= this.axis.area('x');
                    obj.y -= this.axis.area('y');

                    var rect = this.chart.svg.rect(_.extend(obj, {
                        fill : "tranparent",
                        stroke : "black"
                    }));

                    //g.append(rect);
                }
            }
        }

        this.drawBefore = function() {

            var row = this.grid.rows;
            var column = this.grid.columns;
            
            padding = this.grid.padding;
            
            var columnUnit = (this.axis.area('width') -  (column - 1) * padding) / column;
            var rowUnit = (this.axis.area('height') - (row - 1) * padding ) / row;

            // create scale
            this.scale = (function(axis, row, column, rowUnit, columnUnit) {
                return function(i) {

                    var r = Math.floor(i  / column) ;
                    var c = i % column;

                    var x = c * columnUnit;
                    var y = r * rowUnit;

                    var space = padding * c;
                    var rspace = padding * r;

                    return {
                        x : axis.area('x') + x +  space,
                        y : axis.area('y') + y + rspace,
                        width : columnUnit,
                        height : rowUnit
                    }
                }
            })(this.axis, row, column, rowUnit, columnUnit);
        }

        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid("table");
        }
    }

    TableGrid.setup = function() {
        return {
            /** @cfg {Number} [rows=1] row count in table  */
            rows: 1,
            /** @cfg {Number} [column=1] column count in table  */
            columns: 1,
            /** @cfg {Number} [padding=1] padding in table  */
            padding: 10
        };
    }
    
    return TableGrid;
}, "chart.grid.core");

jui.define("chart.grid.overlap", [ "util.base" ], function(_) {

    /**
     * @class chart.grid.overlap
     * @extends chart.grid.core
     */
    var OverlapGrid = function() {
        var size, widthUnit, heightUnit, width, height ;

        this.custom = function() {
            for(var i = 0, len = this.axis.data.length; i < len; i++) {
                var obj = this.scale(i);

                obj.x -= this.axis.area("x");
                obj.y -= this.axis.area("y");

                this.chart.svg.rect(_.extend(obj, {
                    fill : "transparent",
                    stroke : "transparent"
                }));
            }
        }

        this.drawBefore = function() {
            size = this.grid.count || this.axis.data.length ||  1;

            widthUnit = (this.axis.area('width') / 2) / size;
            heightUnit = (this.axis.area('height') / 2) / size;

            width = this.axis.area('width');
            height = this.axis.area('height');

            // create scale
            this.scale = (function(axis) {
                return function(i) {

                    var x = i * widthUnit;
                    var y = i * heightUnit;

                    return {
                        x : axis.area('x') + x,
                        y : axis.area('y') + y,
                        width : Math.abs(width/2 - x)*2,
                        height : Math.abs(height/2 - y)*2
                    }

                }
            })(this.axis);

        }

        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid("overlap");
        }

    }

    OverlapGrid.setup = function() {
        return {
            /** @cfg {Number} [count=null] Splited count  */
            count : null
        }
    }
    
    return OverlapGrid;
}, "chart.grid.core");

jui.define("chart.topology.sort.random", [], function() {
    return function(data, area, space) {
        var xy = [];

        for(var i = 0; i < data.length; i++) {
            var x = Math.floor(Math.random() * (area.width - space)),
                y = Math.floor(Math.random() * (area.height - space));

            xy[i] = {
                x: area.x + x,
                y: area.y + y
            };
        }

        return xy;
    }
});

jui.define("chart.topology.sort.linear", [], function() {
    var cache = {};

    function getRandomRowIndex(row_cnt) {
        var row_index = Math.floor(Math.random() * row_cnt);

        if(cache[row_index]) {
            var cnt = 0;
            for(var k in cache) { cnt++; }

            if(cnt < row_cnt) {
                return getRandomRowIndex(row_cnt);
            } else {
                cache = {};
            }
        } else {
            cache[row_index] = true;
        }

        return row_index;
    }

    return function(data, area, space) {
        var xy = [],
            row_cnt = Math.floor(area.height / space),
            col_cnt = Math.floor(area.width / space),
            col_step = Math.floor(col_cnt / data.length),
            col_index = 0;

        var left = -1,
            right = data.length;

        for(var i = 0; i < data.length; i++) {
            var x = 0, y = 0, index = 0;

            if(i % 2 == 0) {
                x = col_index * space;
                y = getRandomRowIndex(row_cnt) * space;
                col_index += col_step;

                left += 1;
                index = left;
            } else {
                x = (col_cnt - col_index) * space + space;
                y = getRandomRowIndex(row_cnt) * space;

                right -=1;
                index = right;
            }

            xy[index] = {
                x: area.x + x + space,
                y: area.y + y + (space / 2)
            };
        }

        return xy;
    }
});

jui.define("chart.grid.topologytable", [ "util.base" ], function(_) {

    /**
     * @class chart.grid.topologytable
     * @extends chart.grid.core
     */
    var TopologyTableGrid = function() {
        var self = this;

        function getDataIndex(key) {
            var index = null,
                data = self.axis.data;

            for(var i = 0, len = data.length; i < len; i++) {
                if(self.axis.getValue(data[i], "key") == key) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        this.drawBefore = function() {
            if(!this.axis.cacheXY) {
                var sortFunc = jui.include("chart.topology.sort." + this.grid.sort),
                    sortArgs = [ this.axis.data, this.axis.area(), this.grid.space ];

                if(_.typeCheck("function", sortFunc)) {
                    this.axis.cacheXY = sortFunc.apply(this, sortArgs);
                } else {
                    sortFunc = jui.include(this.grid.sort);

                    if(_.typeCheck("function", sortFunc)) {
                        this.axis.cacheXY = sortFunc.apply(this, sortArgs);
                    }
                }
            }

            if(!this.axis.cache) {
                this.axis.cache = {
                    scale: 1,
                    viewX: 0,
                    viewY: 0,
                    nodeKey: null // 활성화 상태의 노드 키
                }
            }

            this.scale = (function() {
                return function(index) {
                    var index = (_.typeCheck("string", index)) ? getDataIndex(index) : index;

                    var func = {
                        setX: function(value) {
                            self.axis.cacheXY[index].x = value - self.axis.cache.viewX;
                        },
                        setY: function(value) {
                            self.axis.cacheXY[index].y = value - self.axis.cache.viewY;
                        },
                        setScale: function(s) {
                            self.axis.cache.scale = s;
                        },
                        setView: function(x, y) {
                            self.axis.cache.viewX = x;
                            self.axis.cache.viewY = y;
                        },
                        moveLast: function() {
                            var target1 = self.axis.cacheXY.splice(index, 1);
                            self.axis.cacheXY.push(target1[0]);

                            var target2 = self.axis.data.splice(index, 1);
                            self.axis.data.push(target2[0]);
                        }
                    }

                    if(_.typeCheck("integer", index)) {
                        var x = self.axis.cacheXY[index].x + self.axis.cache.viewX,
                            y = self.axis.cacheXY[index].y + self.axis.cache.viewY,
                            scale = self.axis.cache.scale;

                        return _.extend(func, {
                            x: x * scale,
                            y: y * scale,
                            scale: scale
                        });
                    }

                    return func;
                }
            })(this.axis);
        }
        
        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid();
        }
    }

    TopologyTableGrid.setup = function() {
        return {
            /** @cfg {String} [sort=null]  */
            sort: "linear", // or random
            /** @cfg {Number} [space=50]  */
            space: 50
        }
    }
    
    return TopologyTableGrid;
}, "chart.grid.core");

jui.define("chart.grid.grid3d", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.grid.grid3d
     * @extends chart.grid.core
     */
    var Grid3D = function() {
        var self = this,
            depth = 0,
            degree = 0,
            radian = 0;

        function getElementAttr(root) {
            var attr = null;

            root.each(function(i, elem) {
                if(elem.element.nodeName == "line") {
                    attr = elem.attributes;
                }
            });

            return attr;
        }

        this.drawBefore = function() {
            depth = this.axis.get("depth");
            degree = this.axis.get("degree");
            radian = math.radian(360 - degree);

            this.scale = (function() {
                return function(x, y, z, count) {
                    var step = _.typeCheck("integer", count) ? count : 1,
                        split = depth / step;

                    if(z == undefined || step == 1) {
                        return {
                            x: self.axis.x(x),
                            y: self.axis.y(y),
                            depth: split
                        }
                    } else {
                        var z = (z == undefined) ? 0 : z,
                            c = split * z,
                            top = Math.sin(radian) * split;

                        return {
                            x: self.axis.x(x) + Math.cos(radian) * c,
                            y: (self.axis.y(y) + Math.sin(radian) * c) + top,
                            depth: split
                        }
                    }
                }
            })(this.axis);

            this.scale.depth = depth;
            this.scale.degree = degree;
            this.scale.radian = radian;
        }

        this.draw = function() {
            var xRoot = this.axis.x.root,
                yRoot = this.axis.y.root;

            var y2 = Math.sin(radian) * depth,
                x2 = Math.cos(radian) * depth;

            yRoot.each(function(i, elem) {
                if(elem.element.nodeName == "line") {
                    yRoot.append(self.line({
                        x1 : x2,
                        y1 : 0,
                        x2 : x2,
                        y2 : y2 + elem.attributes.y2
                    }));
                } else {
                    // X축 라인 속성 가져오기
                    var xAttr = getElementAttr(xRoot);

                    elem.append(self.line({
                        x1 : 0,
                        y1 : 0,
                        x2 : x2,
                        y2 : y2
                    }));

                    elem.append(self.line({
                        x1 : x2,
                        y1 : y2,
                        x2 : x2 + xAttr.x2,
                        y2 : y2
                    }));
                }
            });

            xRoot.each(function(i, elem) {
                var attr = (elem.element.nodeName == "line") ? elem.attributes : elem.get(0).attributes,
                    y2 = attr.y1 + Math.sin(radian) * depth,
                    x2 = attr.x1 + Math.cos(radian) * depth;

                if(i > 0) {
                    // Y축 라인 속성 가져오기
                    var yAttr = getElementAttr(yRoot);

                    elem.append(self.line({
                        x1 : attr.x1,
                        y1 : attr.y1,
                        x2 : x2,
                        y2 : y2
                    }));

                    elem.append(self.line({
                        x1 : x2,
                        y1 : y2,
                        x2 : x2,
                        y2 : -(yAttr.y2 - y2)
                    }));
                }
            });

            return this.drawGrid();
        }
    }

    Grid3D.setup = function() {
        return {
            /** @cfg {Array} [domain=null] */
            domain: null
        }
    }
    
    return Grid3D;
}, "chart.grid.core");

jui.define("chart.brush.core", [ "util.base", "util.dom" ], function(_, $) {
    /**
     * @class chart.brush.core
     *
     * implements core method for brush
     *
     * @abstract
     * @extends chart.draw
     * @requires jquery
     * @requires util.base
     */
	var CoreBrush = function() {

        function getMinMaxValue(data, target) {
            var seriesList = {},
                targetList = {};

            for(var i = 0; i < target.length; i++) {
                if (!seriesList[target[i]]) {
                    targetList[target[i]] = [];
                }
            }

            // 시리즈 데이터 구성
            for(var i = 0, len = data.length; i < len; i++) {
                var row = data[i];

                for(var k in targetList) {
                    targetList[k].push(row[k]);
                }
            }

            for(var key in targetList) {
                seriesList[key] = {
                    min : Math.min.apply(Math, targetList[key]),
                    max : Math.max.apply(Math, targetList[key])
                }
            }

            return seriesList;
        }

        this.drawAfter = function(obj) {
            if(this.brush.clip !== false) {
                obj.attr({ "clip-path" : "url(#" + this.axis.get("clipId") + ")" });
            }

            obj.attr({ "class" : "brush-" + this.brush.type });
            obj.translate(this.chart.area("x"), this.chart.area("y")); // 브러쉬일 경우, 기본 좌표 설정
        }

        this.drawTooltip = function(fill, stroke, opacity) {
            var self = this,
                tooltip = null;

            function draw() {
                return self.chart.svg.group({ "visibility" : "hidden" }, function() {
                    self.chart.text({
                        fill : self.chart.theme("tooltipPointFontColor"),
                        "font-size" : self.chart.theme("tooltipPointFontSize"),
                        "font-weight" : self.chart.theme("tooltipPointFontWeight"),
                        "text-anchor" : "middle",
                        opacity: opacity
                    });

                    self.chart.svg.circle({
                        r: self.chart.theme("tooltipPointRadius"),
                        fill: fill,
                        stroke: stroke,
                        opacity: opacity,
                        "stroke-width": self.chart.theme("tooltipPointBorderWidth")
                    });
                });
            }

            function show(orient, x, y, value) {
                var text = tooltip.get(0);
                text.element.textContent = value;

                if(orient == "left") {
                    text.attr({ x: -7, y: 4, "text-anchor": "end" });
                } else if(orient == "right") {
                    text.attr({ x: 7, y: 4, "text-anchor": "start" });
                } else if(orient == "bottom") {
                    text.attr({ y: 16 });
                } else {
                    text.attr({ y: -7 });
                }

                tooltip.attr({ visibility: (value != 0) ? "visible" : "hidden" });
                tooltip.translate(x, y);
            }

            // 툴팁 생성
            tooltip = draw();

            return {
                tooltip: tooltip,
                control: show,
                style: function(fill, stroke, opacity) {
                    tooltip.get(0).attr({
                        opacity: opacity
                    });

                    tooltip.get(1).attr({
                        fill: fill,
                        stroke: stroke,
                        opacity: opacity
                    })
                }
            }
        }

        /**
         * 
         * @method curvePoints
         *
         * 좌표 배열 'K'에 대한 커브 좌표 'P1', 'P2'를 구하는 함수
         *
         * TODO: min, max 에 대한 처리도 같이 필요함.
         *
         * @param {Array} K
         * @return {Object}
         * @return {Array} return.p1
         * @return {Array} return.p2
         *
         */
		this.curvePoints = function(K) {
			var p1 = [];
			var p2 = [];
			var n = K.length - 1;

			/*rhs vector*/
			var a = [];
			var b = [];
			var c = [];
			var r = [];

			/*left most segment*/
			a[0] = 0;
			b[0] = 2;
			c[0] = 1;
			r[0] = K[0] + 2 * K[1];

			/*internal segments*/
			for ( i = 1; i < n - 1; i++) {
				a[i] = 1;
				b[i] = 4;
				c[i] = 1;
				r[i] = 4 * K[i] + 2 * K[i + 1];
			}

			/*right segment*/
			a[n - 1] = 2;
			b[n - 1] = 7;
			c[n - 1] = 0;
			r[n - 1] = 8 * K[n - 1] + K[n];

			/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
			for (var i = 1; i < n; i++) {
				var m = a[i] / b[i - 1];
				b[i] = b[i] - m * c[i - 1];
				r[i] = r[i] - m * r[i - 1];
			}

			p1[n - 1] = r[n - 1] / b[n - 1];
			for (var i = n - 2; i >= 0; --i)
				p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];

			/*we have p1, now compute p2*/
			for (var i = 0; i < n - 1; i++)
				p2[i] = 2 * K[i + 1] - p1[i + 1];

			p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);

			return {
				p1 : p1,
				p2 : p2
			};
		}

        /**
         * 
         * @method eachData
         *
         * loop axis data
         *
         * @param {Function} callback
         */
        this.eachData = function(callback, reverse) {
            if(!_.typeCheck("function", callback)) return;
            var list = this.listData();

            if(reverse === true) {
                for(var len = list.length - 1; len >= 0; len--) {
                    callback.call(this, len, list[len]);
                }
            } else {
                for(var index = 0, len = list.length; index < len; index++) {
                    callback.call(this, list[index], index);
                }
            }
        }

        /**
         * 
         * @method listData
         *
         * get axis.data
         *
         * @returns {Array} axis.data
         */
        this.listData = function() {
            return this.axis.data;
        }

        /**
         * 
         * @method getData
         *
         * get record by index in axis.data
         *
         * @param {Integer} index
         * @returns {Object} record in axis.data
         */
        this.getData = function(index) {
            return this.listData()[index];
        }

        /**
         * @method getValue
         *
         * chart.axis.getValue alias
         *
         * @param {Object} data row data
         * @param {String} fieldString 필드 이름
         * @param {String/Number/Boolean/Object} [defaultValue=''] 기본값
         * @return {Mixed}
         */
        this.getValue = function(data, fieldString, defaultValue) {
            return this.axis.getValue(data, fieldString, defaultValue);
        }

        /**
         * 
         * @method getXY
         *
         * 차트 데이터에 대한 좌표 'x', 'y'를 구하는 함수
         *
         * @param {Boolean} [isCheckMinMax=true]
         * @return {Array}
         */
        this.getXY = function(isCheckMinMax) {
            var xy = [],
                series = {},
                length = this.listData().length,
                i = length,
                target = this.brush.target,
                targetLength = target.length;

            if(isCheckMinMax !== false) {
                series = getMinMaxValue(this.axis.data, target);
            }

            for(var j = 0; j < targetLength; j++) {
                xy[j] = {
                    x: new Array(length),
                    y: new Array(length),
                    value: new Array(length),
                    min: [],
                    max: [],
                    length: length
                };
            }
            
            var axisData = this.axis.data,
                isRangeY = (this.axis.y.type == "range"),
                x = this.axis.x,
                y = this.axis.y,
                func = _.loop(i);

            func(function(i, group) {
                var data = axisData[i],
                    startX = 0,
                    startY = 0;

                if(isRangeY) startX = x(i);
                else startY = y(i);

                for(var j = 0; j < targetLength ; j++) {
                    var key = target[j],
                        value = data[key];

                    if(isRangeY) startY = y(value);
                    else startX = x(value);

                    xy[j].x[i] = startX;
                    xy[j].y[i] = startY;
                    xy[j].value[i] = value;

                    if(isCheckMinMax !== false) {
                        xy[j].min[i] = (value == series[key].min);
                        xy[j].max[i] = (value == series[key].max);
                    }
                }
            })

            return xy;
        }

        /**
         * 
         * @method getStackXY
         *
         * 차트 데이터에 대한 좌표 'x', 'y'를 구하는 함수
         * 단, 'y' 좌표는 다음 데이터 보다 높게 구해진다.
         *
         * @param {Boolean} [isCheckMinMax=true]
         * @return {Array}
         */
        this.getStackXY = function(isCheckMinMax) {
            var xy = this.getXY(isCheckMinMax),
                isRangeY = (this.axis.y.type == "range");

            this.eachData(function(data, i) {
                var valueSum = 0;

                for(var j = 0; j < this.brush.target.length; j++) {
                    var key = this.brush.target[j],
                        value = data[key];

                    if(j > 0) {
                        valueSum += data[this.brush.target[j - 1]];
                    }

                    if(isRangeY) {
                        xy[j].y[i] = this.axis.y(value + valueSum);
                    } else {
                        xy[j].x[i] = this.axis.x(value + valueSum);
                    }
                }
            });

            return xy;
        }
        
        /**
         * @method addEvent 
         * 브러쉬 엘리먼트에 대한 공통 이벤트 정의
         *
         * @param {Element} element
         * @param {Integer} dataIndex
         * @param {Integer} targetIndex
         */
        this.addEvent = function(elem, dataIndex, targetIndex) {
            if(this.brush.useEvent !== true) return;

            var chart = this.chart,
                obj = {
                brush: this.brush,
                dataIndex: dataIndex,
                dataKey: (targetIndex != null) ? this.brush.target[targetIndex] : null,
                data: (dataIndex != null) ? this.getData(dataIndex) : null
            };

            elem.on("click", function(e) {
                setMouseEvent(e);
                chart.emit("click", [ obj, e ]);
            });

            elem.on("dblclick", function(e) {
                setMouseEvent(e);
                chart.emit("dblclick", [ obj, e ]);
            });

            elem.on("contextmenu", function(e) {
                setMouseEvent(e);
                chart.emit("rclick", [ obj, e ]);
                e.preventDefault();
            });

            elem.on("mouseover", function(e) {
                setMouseEvent(e);
                chart.emit("mouseover", [ obj, e ]);
            });

            elem.on("mouseout", function(e) {
                setMouseEvent(e);
                chart.emit("mouseout", [ obj, e ]);
            });

            elem.on("mousemove", function(e) {
                setMouseEvent(e);
                chart.emit("mousemove", [ obj, e ]);
            });

            elem.on("mousedown", function(e) {
                setMouseEvent(e);
                chart.emit("mousedown", [ obj, e ]);
            });

            elem.on("mouseup", function(e) {
                setMouseEvent(e);
                chart.emit("mouseup", [ obj, e ]);
            });

            function setMouseEvent(e) {
                var pos = $.offset(chart.root),
                    offsetX = e.pageX - pos.left,
                    offsetY = e.pageY - pos.top;

                e.bgX = offsetX;
                e.bgY = offsetY;
                e.chartX = offsetX - chart.padding("left");
                e.chartY = offsetY - chart.padding("top");
            }
        }

        /**
         * @method color
         *  
         * chart.color() 를 쉽게 사용할 수 있게 만든 유틸리티 함수 
         *  
         * @param {Number} key1  브러쉬에서 사용될 컬러 Index
         * @param {Number} key2  브러쉬에서 사용될 컬러 Index
         * @returns {*}
         */
        this.color = function(key1, key2) {
            var colors = this.brush.colors,
                color = null,
                colorIndex = 0,
                rowIndex = 0;

            if(!_.typeCheck("undefined", key2)) {
                colorIndex = key2;
                rowIndex = key1;
            } else {
                colorIndex = key1;
            }

            if(_.typeCheck("function", colors)) {
                var newColor = colors.call(this.chart, this.getData(rowIndex), rowIndex);

                if(_.typeCheck([ "string", "integer" ], newColor)) {
                    color = this.chart.color(newColor);
                } else {
                    color = this.chart.color(0);
                }
            } else {
                color = this.chart.color(colorIndex, colors);
            }

            return color;
        }

        /**
         * @method offset
         *
         * 그리드 타입에 따른 시작 좌표 가져오기 (블럭)
         *
         * @param {String} 그리드 종류
         * @param {Number} 인덱스
         * @returns {*}
         */
        this.offset = function(type, index) { // 그리드 타입에 따른 시작 좌표 가져오기
            var res = this.axis[type](index);

            if(this.axis[type].type != "block") {
                res += this.axis[type].rangeBand() / 2;
            }

            return res;
        }
	}


    CoreBrush.setup = function() {
        return {

            /** @property {chart.builder} chart */
            /** @property {chart.axis} axis */
            /** @property {Object} brush */

            /** @cfg {Array} [target=null] Specifies the key value of data displayed on a brush.  */
            target: null,
            /** @cfg {Array/Function} [colors=null] Able to specify color codes according to the target order (basically, refers to the color codes of a theme) */
            colors: null,
            /** @cfg {Integer} [axis=0] Specifies the index of a grid group which acts as the reference axis of a brush. */
            axis: 0,
            /** @cfg {Integer} [index=null] [Read Only] Sequence index on which brush is drawn. */
            index: null,
            /** @cfg {boolean} [clip=true] If the brush is drawn outside of the chart, cut the area. */
            clip: true,
            /** @cfg {boolean} [useEvent=true] If you do not use a brush events, it gives better performance. */
            useEvent: true
        }
    }

    /**
     * @event click
     * Event that occurs when clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event dblclick
     * Event that occurs when double clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event rclick
     * Event that occurs when right clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mouseover
     * Event that occurs when placing the mouse over the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mouseout
     * Event that occurs when moving the mouse out of the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mousemove
     * Event that occurs when moving the mouse over the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mousedown
     * Event that occurs when left clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mouseup
     * Event that occurs after left clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */

	return CoreBrush;
}, "chart.draw"); 
jui.define("chart.brush.imagebar", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.imagebar
     * @extends chart.brush.column
     */
	var ImageBarBrush = function() {
		var self = this;
		var g, targets, padding, zeroX, height, half_height, col_width, col_height;

		this.getImageURI = function(key, value) {
			var uri = this.brush.uri;

			if(_.typeCheck("function", uri)) {
				uri = uri.apply(this.chart, [ key, value ]);
			}

			return uri;
		}

		this.getBarStyle = function() {
			return {
				borderColor: this.chart.theme("barBorderColor"),
				borderWidth: this.chart.theme("barBorderWidth"),
				borderOpacity: this.chart.theme("barBorderOpacity")
			}
		}

		this.drawBefore = function() {
			g = this.chart.svg.group();
			targets = this.brush.target;
			padding = this.brush.innerPadding;
			zeroX = this.axis.x(0);
			height = this.axis.y.rangeBand();
			col_width = this.brush.width;
			col_height = this.brush.height;
			half_height = (col_height * targets.length) + ((targets.length - 1) * padding);
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var startY = this.offset("y", i) - (half_height / 2);

				for (var j = 0; j < targets.length; j++) {
					var value = data[targets[j]],
						startX = this.axis.x(value);

					var width = Math.abs(zeroX - startX),
						bar = this.chart.svg.group({}, function() {
							var img = self.chart.svg.image({
								width: col_width,
								height: col_height,
								"xlink:href": self.getImageURI(targets[j], value)
							});

							if(self.brush.fixed) {
								var w = width - col_width,
									style = self.getBarStyle();

								// 바 크기 음수 처리
								if(w < 0) w = 0;

								self.chart.svg.rect({
									width: w,
									height: col_height,
									fill: self.color(i, j),
									stroke : style.borderColor,
									"stroke-width" : style.borderWidth,
									"stroke-opacity" : style.borderOpacity
								});

								img.translate(w, 0);
							} else {
								if(width > 0 && col_width > 0) {
									img.scale((width > col_width) ? width / col_width : col_width / width, 1);
								}
							}
						});

					if(value != 0) {
						this.addEvent(bar, i, j);
					}

					if (startX >= zeroX) {
						bar.translate(zeroX, startY);
					} else {
						bar.translate(zeroX - width, startY);
					}

					// 그룹에 컬럼 엘리먼트 추가
					g.append(bar);

					// 다음 컬럼 좌표 설정
					startY += col_height + padding;
				}
			});

            return g;
		}
	}

	ImageBarBrush.setup = function() {
		return {
			innerPadding: 2,
			width: 0,
			height: 0,
			fixed: true,
			uri: null
		}
	}

	return ImageBarBrush;
}, "chart.brush.core");

jui.define("chart.brush.imagecolumn", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.imagecolumn
     * @extends chart.brush.column
     */
	var ImageColumnBrush = function() {
		var self = this;
		var g, targets, padding, zeroY, width, half_width, col_width, col_height;

		this.drawBefore = function() {
			g = this.chart.svg.group();
			targets = this.brush.target;
			padding = this.brush.innerPadding;
			zeroY = this.axis.y(0);
			width = this.axis.x.rangeBand();
			col_width = this.brush.width;
			col_height = this.brush.height;
			half_width = (col_width * targets.length) + ((targets.length - 1) * padding);
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var startX = this.offset("x", i) - (half_width / 2);

				for (var j = 0; j < targets.length; j++) {
					var value = data[targets[j]],
						startY = this.axis.y(value);

					var	height = Math.abs(zeroY - startY),
						bar = this.chart.svg.group({}, function() {
							var img = self.chart.svg.image({
								width: col_width,
								height: col_height,
								"xlink:href": self.getImageURI(targets[j], value)
							});

							if(self.brush.fixed) {
								var h = height - col_height,
									style = self.getBarStyle();

								// 컬럼 크기 음수 처리
								if(h < 0) h = 0;

								self.chart.svg.rect({
									y: col_height,
									width: col_width,
									height: h,
									fill: self.color(i, j),
									stroke : style.borderColor,
									"stroke-width" : style.borderWidth,
									"stroke-opacity" : style.borderOpacity
								});
							} else {
								if(height > 0 && col_height > 0) {
									img.scale(1, (height > col_height) ? height / col_height : col_height / height);
								}
							}
						});

					if(value != 0) {
						this.addEvent(bar, i, j);
					}

					if (startY <= zeroY) {
						bar.translate(startX, startY);
					} else {
						bar.translate(startX, zeroY);
					}

					// 그룹에 컬럼 엘리먼트 추가
					g.append(bar);

					// 다음 컬럼 좌표 설정
					startX += col_width + padding;
				}
			});

            return g;
		}
	}

	return ImageColumnBrush;
}, "chart.brush.imagebar");

jui.define("chart.brush.patternbar", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.patternbar
     * @extends chart.brush.core
     */
	var PatternBarBrush = function() {
		var g;
		var targets, padding, zeroX, height, half_height, col_width, col_height;

		this.createPattern = function(width, height, key, value) {
			var id = _.createId("pattern-"),
				pattern = this.chart.svg.pattern({
					id: id,
					x: 0,
					y: 0,
					width: width,
					height: height,
					patternUnits: "userSpaceOnUse"
				}),
				image = this.chart.svg.image({
					width: width,
					height: height,
					"xlink:href" : this.getImageURI(key, value)
				});

			pattern.append(image);
			this.chart.appendDefs(pattern);

			return id;
		}

		this.drawBefore = function() {
			g = this.chart.svg.group();
			targets = this.brush.target;
			padding = this.brush.innerPadding;
			zeroX = this.axis.x(0);
			height = this.axis.y.rangeBand();
			col_width = this.brush.width;
			col_height = this.brush.height;
			half_height = (col_height * targets.length) + ((targets.length - 1) * padding);
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var startY = this.offset("y", i) -(half_height / 2);

				for (var j = 0; j < targets.length; j++) {
					var value = data[targets[j]],
						patternId = this.createPattern(col_width, col_height, targets[j], value),
						startX = this.axis.x(value),
						width = Math.abs(zeroX - startX),
						r = this.chart.svg.rect({
							width: width,
							height: col_height,
							fill: "url(#" + patternId + ")",
							"stroke-width": 0
						});

					if(value != 0) {
						this.addEvent(r, i, j);
					}

					if (startX >= zeroX) {
						r.translate(zeroX, startY);
					} else {
						r.translate(zeroX - width, startY);
					}

					// 그룹에 컬럼 엘리먼트 추가
					g.append(r);

					// 다음 컬럼 좌표 설정
					startY += col_height + padding;
				}
			});

            return g;
		}
	}

	PatternBarBrush.setup = function() {
		return {
			innerPadding: 2,
			width: 0,
			height: 0,
			uri: null
		}
	}

	return PatternBarBrush;
}, "chart.brush.imagebar");

jui.define("chart.brush.patterncolumn", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.patterncolumn
     * @extends chart.brush.column
     */
	var PatternColumnBrush = function() {
		var g;
		var targets, padding, zeroY, width, half_width, col_width, col_height;

		this.drawBefore = function() {
			g = this.chart.svg.group();
			targets = this.brush.target;
			padding = this.brush.innerPadding;
			zeroY = this.axis.y(0);
			width = this.axis.x.rangeBand();
			col_width = this.brush.width;
			col_height = this.brush.height;
			half_width = (col_width * targets.length) + ((targets.length - 1) * padding);
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var startX = this.offset("x", i) -(half_width / 2);

				for (var j = 0; j < targets.length; j++) {
					var value = data[targets[j]],
						patternId = this.createPattern(col_width, col_height, targets[j], value);
						startY = this.axis.y(value),
						height = Math.abs(zeroY - startY),
						r = this.chart.svg.rect({
							width: col_width,
							height: height,
							fill: "url(#" + patternId + ")",
							"stroke-width": 0
						});

					if(value != 0) {
						this.addEvent(r, i, j);
					}

					if (startY <= zeroY) {
						r.translate(startX, startY);
					} else {
						r.translate(startX, zeroY);
					}

					// 그룹에 컬럼 엘리먼트 추가
					g.append(r);

					// 다음 컬럼 좌표 설정
					startX += col_width + padding;
				}
			});

            return g;
		}
	}

	return PatternColumnBrush;
}, "chart.brush.patternbar");

jui.define("chart.brush.bar", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.bar
	 *
     * @extends chart.brush.core
     */
	var BarBrush = function() {
		var g;
		var zeroX, height, half_height, bar_height;

		this.getBarStyle = function() {
			return {
				borderColor: this.chart.theme("barBorderColor"),
				borderWidth: this.chart.theme("barBorderWidth"),
				borderOpacity: this.chart.theme("barBorderOpacity"),
				borderRadius: this.chart.theme("barBorderRadius"),
				disableOpacity: this.chart.theme("barDisableBackgroundOpacity"),
				circleColor: this.chart.theme("barPointBorderColor")
			}
		}

		this.getBarElement = function(dataIndex, targetIndex, info) {
			var style = this.getBarStyle(),
				color = this.color(dataIndex, targetIndex),
				value = this.getData(dataIndex)[this.brush.target[targetIndex]];

			var r = this.chart.svg.pathRect({
				width: info.width,
				height: info.height,
				fill : color,
				stroke : style.borderColor,
				"stroke-width" : style.borderWidth,
				"stroke-opacity" : style.borderOpacity
			});

			if(value != 0) {
				this.addEvent(r, dataIndex, targetIndex);
			}

			if(this.barList == null) {
				this.barList = [];
			}

			this.barList.push(_.extend({
				element: r,
				color: color
			}, info));

			return r;
		}

		this.setActiveEffect = function(r) {
			var style = this.getBarStyle(),
				cols = this.barList;

			for(var i = 0; i < cols.length; i++) {
				var opacity = (cols[i] == r) ? 1 : style.disableOpacity;
				cols[i].element.attr({ opacity: opacity });

				if(cols[i].minmax) {
					cols[i].minmax.style(cols[i].color, style.circleColor, opacity);
				}
			}
		}

		this.drawBefore = function() {
			var op = this.brush.outerPadding,
				ip = this.brush.innerPadding,
				len = this.brush.target.length;

			g = this.chart.svg.group();
			zeroX = this.axis.x(0);
			height = this.axis.y.rangeBand();

			if(this.brush.size > 0) {
				bar_height = this.brush.size;
				half_height = (bar_height * len) + ((len - 1) * ip);
			} else {
				half_height = height - (op * 2);
				bar_height = (half_height - (len - 1) * ip) / len;
				bar_height = (bar_height < 0) ? 0 : bar_height;
			}
		}

		this.drawETC = function(group) {
			if(!_.typeCheck("array", this.barList)) return;

			var self = this,
				style = this.getBarStyle();

			// 액티브 툴팁 생성
			this.active = this.drawTooltip();
            group.append(this.active.tooltip);

			for(var i = 0; i < this.barList.length; i++) {
				var r = this.barList[i],
					d = this.brush.display;

				// Max & Min 툴팁 생성
				if((d == "max" && r.max) || (d == "min" && r.min) || d == "all") {
					r.minmax = this.drawTooltip(r.color, style.circleColor, 1);
					r.minmax.control(r.position, r.tooltipX, r.tooltipY, this.format(r.value));
                    group.append(r.minmax.tooltip);
				}

				// 컬럼 및 기본 브러쉬 이벤트 설정
				if(r.value != 0 && this.brush.activeEvent != null) {
					(function(bar) {
						self.active.style(bar.color, style.circleColor, 1);

						bar.element.on(self.brush.activeEvent, function(e) {
							self.active.style(bar.color, style.circleColor, 1);
							self.active.control(bar.position, bar.tooltipX, bar.tooltipY, self.format(bar.value));
							self.setActiveEffect(bar);
						});

						bar.element.attr({ cursor: "pointer" });
					})(r);
				}
			}

			// 액티브 툴팁 위치 설정
			var r = this.barList[this.brush.active];
			if(r != null) {
				this.active.style(r.color, style.circleColor, 1);
				this.active.control(r.position, r.tooltipX, r.tooltipY, this.format(r.value));
				this.setActiveEffect(r);
			}
		}

		this.draw = function() {
			var points = this.getXY(),
				style = this.getBarStyle();

			this.eachData(function(data, i) {
				var startY = this.offset("y", i) - (half_height / 2);

				for(var j = 0; j < this.brush.target.length; j++) {
					var value = data[this.brush.target[j]],
						tooltipX = this.axis.x(value),
						tooltipY = startY + (bar_height / 2),
						position = (tooltipX >= zeroX) ? "right" : "left";

                    // 최소 크기 설정
                    if(Math.abs(zeroX - tooltipX) < this.brush.minSize) {
                        tooltipX = (position == "right") ? tooltipX + this.brush.minSize : tooltipX - this.brush.minSize;
                    }

					var width = Math.abs(zeroX - tooltipX),
						radius = (width < style.borderRadius || bar_height < style.borderRadius) ? 0 : style.borderRadius,
                        r = this.getBarElement(i, j, {
							width: width,
							height: bar_height,
							value: value,
							tooltipX: tooltipX,
							tooltipY: tooltipY,
							position: position,
							max: points[j].max[i],
							min: points[j].min[i]
						});

					if(tooltipX >= zeroX) {
						r.round(width, bar_height, 0, radius, radius, 0);
						r.translate(zeroX, startY);
					} else {
						r.round(width, bar_height, radius, 0, 0, radius);
						r.translate(zeroX - width, startY);
					}

					// 그룹에 컬럼 엘리먼트 추가
					g.append(r);

					// 다음 컬럼 좌표 설정
					startY += bar_height + this.brush.innerPadding;
				}
			});

			this.drawETC(g);

            return g;
		}

		this.drawAnimate = function(root) {
			var svg = this.chart.svg,
				type = this.brush.animate;

			root.append(
				svg.animate({
					attributeName: "opacity",
					from: "0",
					to: "1",
					begin: "0s" ,
					dur: "1.4s",
					repeatCount: "1",
					fill: "freeze"
				})
			);

			root.each(function(i, elem) {
				if(elem.is("util.svg.element.path")) {
					var xy = elem.data("translate").split(","),
						x = parseInt(xy[0]),
						y = parseInt(xy[1]),
						w = parseInt(elem.attr("width")),
						start = (type == "right") ? x + w : x - w;

					elem.append(svg.animateTransform({
						attributeName: "transform",
						type: "translate",
						from: start + " " + y,
						to: x + " " + y,
						begin: "0s",
						dur: "0.7s",
						repeatCount: "1",
						fill: "freeze"
					}));
				}
			});
		}
	}

	BarBrush.setup = function() {
		return {
			/** @cfg {Number} [size=0] Set a fixed size of the bar. */
			size: 0,
            /** @cfg {Number} [minSize=0] Sets the minimum size as it is not possible to draw a bar when the value is 0. */
            minSize: 0,
            /** @cfg {Number} [outerPadding=2] Determines the outer margin of a bar.  */
			outerPadding: 2,
            /** @cfg {Number} [innerPadding=1] Determines the inner margin of a bar. */
			innerPadding: 1,
            /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
			active: null,
            /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
			activeEvent: null,
            /** @cfg {"max"/"min"/"all"} [display=null]  Shows a tool tip on the bar for the minimum/maximum value.  */
			display: null
		};
	}

	return BarBrush;
}, "chart.brush.core");

jui.define("chart.brush.column", [], function() {

    /**
     * @class chart.brush.column 
     * @extends chart.brush.bar
     */
	var ColumnBrush = function() {
		var g;
		var zeroY, width, col_width, half_width;

		this.drawBefore = function() {
			var op = this.brush.outerPadding,
				ip = this.brush.innerPadding,
				len = this.brush.target.length;

			g = this.chart.svg.group();
			zeroY = this.axis.y(0);
			width = this.axis.x.rangeBand();

			if(this.brush.size > 0) {
				col_width = this.brush.size;
				half_width = (col_width * len) + ((len - 1) * ip);
			} else {
				half_width = (width - op * 2);
				col_width = (width - op * 2 - (len - 1) * ip) / len;
				col_width = (col_width < 0) ? 0 : col_width;
			}
		}

		this.draw = function() {
			var points = this.getXY(),
				style = this.getBarStyle();

			this.eachData(function(data, i) {
				var startX = this.offset("x", i) - (half_width / 2);

				for (var j = 0; j < this.brush.target.length; j++) {
					var value = data[this.brush.target[j]],
						tooltipX = startX + (col_width / 2),
						tooltipY = this.axis.y(value),
						position = (tooltipY <= zeroY) ? "top" : "bottom";

                    // 최소 크기 설정
                    if(Math.abs(zeroY - tooltipY) < this.brush.minSize) {
                        tooltipY = (position == "top") ? tooltipY - this.brush.minSize : tooltipY + this.brush.minSize;
                    }

					var	height = Math.abs(zeroY - tooltipY),
						radius = (col_width < style.borderRadius || height < style.borderRadius) ? 0 : style.borderRadius,
						r = this.getBarElement(i, j, {
							width: col_width,
							height: height,
							value: value,
							tooltipX: tooltipX,
							tooltipY: tooltipY,
							position: position,
							max: points[j].max[i],
							min: points[j].min[i]
						});

					if (tooltipY <= zeroY) {
						r.round(col_width, height, radius, radius, 0, 0);
						r.translate(startX, tooltipY);
					} else {
						r.round(col_width, height, 0, 0, radius, radius);
						r.translate(startX, zeroY);
					}

					// 그룹에 컬럼 엘리먼트 추가
					g.append(r);

					// 다음 컬럼 좌표 설정
					startX += col_width + this.brush.innerPadding;
				}
			});

			this.drawETC(g);

            return g;
		}

		this.drawAnimate = function(root) {
			var svg = this.chart.svg,
				type = this.brush.animate;

			root.append(
				svg.animate({
					attributeName: "opacity",
					from: "0",
					to: "1",
					begin: "0s" ,
					dur: "1.4s",
					repeatCount: "1",
					fill: "freeze"
				})
			);

			root.each(function(i, elem) {
				if(elem.is("util.svg.element.path")) {
					var xy = elem.data("translate").split(","),
						x = parseInt(xy[0]),
						y = parseInt(xy[1]),
						h = parseInt(elem.attr("height")),
						start = (type == "top") ? y - h : y + h;

					elem.append(svg.animateTransform({
						attributeName: "transform",
						type: "translate",
						from: x + " " + start,
						to: x + " " + y,
						begin: "0s",
						dur: "0.7s",
						repeatCount: "1",
						fill: "freeze"
					}));
				}
			});
		}
	}

	return ColumnBrush;
}, "chart.brush.bar");

jui.define("chart.brush.bar3d", [], function() {

    /**
     * @class chart.brush.bar3d
     * @extends chart.brush.core
     */
	var Bar3DBrush = function(chart, axis, brush) {
		var g;
        var height, col_height;

		this.drawBefore = function() {
			g = chart.svg.group();
            height = axis.y.rangeBand();
            col_height = (height - brush.outerPadding * 2 - (brush.target.length - 1) * brush.innerPadding) / brush.target.length;
            col_height = (col_height < 0) ? 0 : col_height;
		}

		this.draw = function() {
            var count = brush.target.length;

            this.eachData(function(data, i) {
                var zeroXY = axis.c(0, i),
                    startY = zeroXY.y - (height - brush.outerPadding * 2) / 2;

                for(var j = 0; j < count; j++) {
                    var value = data[brush.target[j]],
                        xy = axis.c(value, i),
                        top = Math.sin(axis.c.radian) * xy.depth,
                        width = Math.abs(zeroXY.x - xy.x),
                        r = chart.svg.rect3d(this.color(j), width, col_height, axis.c.degree, xy.depth);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(zeroXY.x, startY + top);

                    // 그룹에 컬럼 엘리먼트 추가
                    g.prepend(r);

                    startY += col_height + brush.innerPadding;
                }
            });

            return g;
		}
	}

    Bar3DBrush.setup = function() {
        return {
            outerPadding: 10,
            innerPadding: 5
        };
    }

	return Bar3DBrush;
}, "chart.brush.core");

jui.define("chart.brush.column3d", [], function() {

    /**
     * @class chart.brush.column3d
     * @extends chart.brush.core
     */
	var Column3DBrush = function() {
		var g;
        var width, col_width;

		this.drawBefore = function() {
			g = this.chart.svg.group();
            width = this.axis.x.rangeBand();
            col_width = (width - this.brush.outerPadding * 2 - (this.brush.target.length - 1) * this.brush.innerPadding) / this.brush.target.length;
            col_width = (col_width < 0) ? 0 : col_width;
		}

        this.drawMain = function(color, width, height, degree, depth) {
            return this.chart.svg.rect3d(color, width, height, degree, depth);
        }

		this.draw = function() {
            var count = this.brush.target.length;

            this.eachData(function(data, i) {
                var zeroXY = this.axis.c(i, 0),
                    startX = zeroXY.x - (width - this.brush.outerPadding * 2) / 2;

                for(var j = 0; j < count; j++) {
                    var value = data[this.brush.target[j]],
                        xy = this.axis.c(i, value);

                    var startY = xy.y + (Math.sin(this.axis.c.radian) * xy.depth),
                        height = Math.abs(zeroXY.y - xy.y),
                        r = this.drawMain(this.color(j), col_width, height, this.axis.c.degree, xy.depth);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(startX, startY);

                    // 그룹에 컬럼 엘리먼트 추가
                    g.append(r);

                    startX += col_width + this.brush.innerPadding;
                }
            });

            return g;
		}
	}

    Column3DBrush.setup = function() {
        return {
            outerPadding: 10,
            innerPadding: 5
        };
    }

	return Column3DBrush;
}, "chart.brush.core");

jui.define("chart.brush.cylinder3d", [], function() {

    /**
     * @class chart.brush.cylinder3d
     * @extends chart.brush.core
     */
	var Cylinder3DBrush = function() {
        this.drawMain = function(color, width, height, degree, depth) {
            return this.chart.svg.cylinder3d(color, width, height, degree, depth, this.brush.topRate);
        }
	}

    Cylinder3DBrush.setup = function() {
        return {
            topRate: 1,
            outerPadding: 10,
            innerPadding: 5
        };
    }

	return Cylinder3DBrush;
}, "chart.brush.column3d");

jui.define("chart.brush.clusterbar3d", [ "util.math" ], function(math) {

    /**
     * @class chart.brush.clusterbar3d
     * @extends chart.brush.bar
     */
    var ClusterBar3DBrush = function(chart, axis, brush) {
        var g;
        var height;

        this.drawBefore = function() {
            g = chart.svg.group();
            height = axis.y.rangeBand() - brush.outerPadding * 2;
        }

        this.draw = function() {
            var count = brush.target.length,
                dataList = this.listData();

            for(var i = dataList.length - 1; i >= 0; i--) {
                var data = dataList[i];

                for(var j = count - 1; j >= 0; j--) {
                    var value = data[brush.target[j]],
                        xy = axis.c(value, i, j, count),
                        zeroXY = axis.c(0, i, j, count),
                        padding = (brush.innerPadding > xy.depth) ? xy.depth : brush.innerPadding;

                    var startY = xy.y - (height / 2) + (padding / 2),
                        width = Math.abs(zeroXY.x - xy.x),
                        r = chart.svg.rect3d(this.color(j), width, height, axis.c.degree, xy.depth - padding);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(zeroXY.x, startY);

                    // 그룹에 컬럼 엘리먼트 추가
                    g.append(r);
                }
            }

            return g;
        }
    }

    ClusterBar3DBrush.setup = function() {
        return {
            outerPadding: 5,
            innerPadding: 5
        };
    }

    return ClusterBar3DBrush;
}, "chart.brush.core");

jui.define("chart.brush.clustercolumn3d", [], function() {

    /**
     * @class chart.brush.clustercolumn3d
     * @extends chart.brush.bar
     */
    var ClusterColumn3DBrush = function() {
        var g;
        var width;

        this.drawBefore = function() {
            g = this.chart.svg.group();
            width = this.axis.x.rangeBand() - this.brush.outerPadding * 2;
        }

        this.drawMain = function(color, width, height, degree, depth) {
            return this.chart.svg.rect3d(color, width, height, degree, depth);
        }

        this.draw = function() {
            var count = this.brush.target.length;

            this.eachData(function(data, i) {
                for(var j = 0; j < count; j++) {
                    var value = data[this.brush.target[j]],
                        xy = this.axis.c(i, value, j, count),
                        zeroXY = this.axis.c(i, 0, j, count),
                        padding = (this.brush.innerPadding > xy.depth) ? xy.depth : this.brush.innerPadding;

                    var startX = xy.x - (width / 2),
                        startY = xy.y - (Math.sin(this.axis.c.radian) * padding),
                        height = Math.abs(zeroXY.y - xy.y),
                        r = this.drawMain(this.color(j), width, height, this.axis.c.degree, xy.depth - padding);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(startX, startY);

                    // 그룹에 컬럼 엘리먼트 추가
                    g.prepend(r);
                }
            }, true);

            return g;
        }
    }

    ClusterColumn3DBrush.setup = function() {
        return {
            outerPadding: 5,
            innerPadding: 5
        };
    }

    return ClusterColumn3DBrush;
}, "chart.brush.core");

jui.define("chart.brush.clustercylinder3d", [], function() {

    /**
     * @class chart.brush.clustercylinder3d
     * @extends chart.brush.bar
     */
    var ClusterCylinder3DBrush = function() {
        this.drawMain = function(color, width, height, degree, depth) {
            return this.chart.svg.cylinder3d(color, width, height, degree, depth, this.brush.topRate);
        }
    }

    ClusterCylinder3DBrush.setup = function() {
        return {
            topRate: 1,
            outerPadding: 5,
            innerPadding: 5
        };
    }

    return ClusterCylinder3DBrush;
}, "chart.brush.clustercolumn3d");

jui.define("chart.brush.circle", ["util.base"], function(_) {

    /**
     * @class chart.brush.circle
     * @extends chart.brush.core
     */
	var CircleBrush = function(chart, axis, brush) {
        var group;
        var w, centerX, centerY, outerRadius;


        this.circle = function (opt, per, angle) {
            var options = _.extend({ r : 10 , cx : 10, cy : 10,  'stroke-width' : 1, fill : 'transparent' }, opt);

            var strokeDashArray = 2 * Math.PI * options.r;
            var line = strokeDashArray * (per || 1);
            angle = angle || 0;


            options['stroke-dasharray'] = [line, strokeDashArray - line].join(" ");
            return this.svg.circle(options).rotate(angle, opt.cx, opt.cy);
        }

        this.drawUnit = function(i, data) {
            var obj = axis.c(i),
                value = this.getValue(data, "value", 0),
                max = this.getValue(data, "max", 100),
                min = this.getValue(data, "min", 0);

            var rate = (value - min) / (max - min),
                width = obj.width,
                height = obj.height,
                x = obj.x,
                y = obj.y;

            // center
            w = Math.min(width, height) / 2;
            centerX = width / 2 + x;
            centerY = height / 2 + y;
            outerRadius = w;

            var r = outerRadius - this.brush.externalSize/2;

            var color = this.color(i);

            // 위에 껍데기
            group.append(this.circle({
                cx : centerX,
                cy : centerY,
                r : r,
                stroke : color,
                "stroke-width" : this.brush.externalSize
            }));


            // gauge
            r -= this.brush.dist*2 + this.brush.size/2;
            group.append(this.circle({
                cx : centerX,
                cy : centerY,
                r : r ,
                stroke : color,
                "stroke-width" : this.brush.size
            }, rate, -90 + this.brush.rotate));

            r += this.brush.size/6;

            // gauge background
            group.append(this.circle({
                cx : centerX,
                cy : centerY,
                r : r,
                stroke : color,
                "stroke-width" : 2
            }));

            var fontSize = r;

            group.append(this.chart.text(_.extend({
                x : centerX,
                y : centerY,
                fill : color,
                'font-size' : fontSize,
                'text-anchor' : 'middle',
                'alignment-baseline' : 'central'
            }), value));

        };
        
		this.draw = function() {
            group = chart.svg.group();

            this.eachData(function(data, i) {
                this.drawUnit(i, data);
            });

            return group;
		}
	}

    CircleBrush.setup = function() {
        return {
            /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip: false,

            /** @cfg {Number} [size=1] set gauge stroke width  */
            size : 20,

            /** @cfg {Number} [dist=2] set dist between circle and gauge  */
            dist : 2,

            /** @cfg {Number} [externalSize=1] set circle stroke width   */
            externalSize : 4,

            /** @cfg {Number} [rotate=0] set rotate to gauge   */
            rotate : 0,
        }
    }

	return CircleBrush;
}, "chart.brush.core");

jui.define("chart.brush.stackbar", [], function() {

	/**
	 * @class chart.brush.stackbar
	 * @extends chart.brush.bar
	 *
	 */
	var StackBarBrush = function(chart, axis, brush) {
		var g, height, bar_height;

		this.addBarElement = function(elem) {
			if(this.barList == null) {
				this.barList = [];
			}

			this.barList.push(elem);
		}

		this.getBarElement = function(dataIndex, targetIndex) {
			var style = this.getBarStyle(),
				color = this.color(targetIndex),
				value = this.getData(dataIndex)[this.brush.target[targetIndex]];

			var r = this.chart.svg.rect({
				fill : color,
				stroke : style.borderColor,
				"stroke-width" : style.borderWidth,
				"stroke-opacity" : style.borderOpacity
			});

			if(value != 0) {
				this.addEvent(r, dataIndex, targetIndex);
			}

			return r;
		}

		this.setActiveEffect = function(group) {
			var style = this.getBarStyle(),
				columns = this.barList;

			for(var i = 0; i < columns.length; i++) {
				var opacity = (group == columns[i]) ? 1 : style.disableOpacity;

				columns[i].attr({ opacity: opacity });
			}
		}

		this.setActiveEffectOption = function() {
			var active = this.brush.active;

			if(this.barList && this.barList[active]) {
				this.setActiveEffect(this.barList[active]);
			}
		}

		this.setActiveEvent = function(group) {
			var self = this;

			group.on(self.brush.activeEvent, function (e) {
				self.setActiveEffect(group);
			});
		}

		this.setActiveEventOption = function(group) {
			if(this.brush.activeEvent != null) {
				this.setActiveEvent(group);
				group.attr({ cursor: "pointer" });
			}
		}

		this.getTargetSize = function() {
			var height = this.axis.y.rangeBand();

			if(this.brush.size > 0) {
				return this.brush.size;
			} else {
				var size = height - this.brush.outerPadding * 2;
				return (size < this.brush.minSize) ? this.brush.minSize : size;
			}
		}

		this.drawBefore = function() {
			g = chart.svg.group();
			height = axis.y.rangeBand();
			bar_height = this.getTargetSize();
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var group = chart.svg.group();
				
				var startY = this.offset("y", i) - bar_height / 2,
                    startX = axis.x(0),
                    value = 0;
				
				for(var j = 0; j < brush.target.length; j++) {
					var xValue = data[brush.target[j]] + value,
                        endX = axis.x(xValue),
						r = this.getBarElement(i, j);

					r.attr({
						x : (startX < endX) ? startX : endX,
						y : startY,
						width : Math.abs(startX - endX),
						height : bar_height
					});

					group.append(r);

					startX = endX;
					value = xValue;
				}

				this.setActiveEventOption(group); // 액티브 엘리먼트 이벤트 설정
				this.addBarElement(group);
				g.append(group);
			});

			// 액티브 엘리먼트 설정
			this.setActiveEffectOption();

            return g;
		}
	}

	StackBarBrush.setup = function() {
		return {
			/** @cfg {Number} [outerPadding=15] Determines the outer margin of a stack bar. */
			outerPadding: 15
		};
	}

	return StackBarBrush;
}, "chart.brush.bar");

jui.define("chart.brush.stackcolumn", [], function() {

	/**
	 * @class chart.brush.stackcolumn
	 * @extends chart.brush.stackbar
	 */
	var ColumnStackBrush = function(chart, axis, brush) {
		var g, zeroY, bar_width;

		this.getTargetSize = function() {
			var width = this.axis.x.rangeBand();

			if(this.brush.size > 0) {
				return this.brush.size;
			} else {
				var size = width - this.brush.outerPadding * 2;
				return (size < this.brush.minSize) ? this.brush.minSize : size;
			}
		}

		this.drawBefore = function() {
			g = chart.svg.group();
			zeroY = axis.y(0);
			bar_width = this.getTargetSize();
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var group = chart.svg.group();
				
				var startX = this.offset("x", i) - bar_width / 2,
                    startY = axis.y(0),
                    value = 0;

				for(var j = 0; j < brush.target.length; j++) {
					var yValue = data[brush.target[j]] + value,
                        endY = axis.y(yValue),
						r = this.getBarElement(i, j);

					r.attr({
						x : startX,
						y : (startY > endY) ? endY : startY,
						width : bar_width,
						height : Math.abs(startY - endY)
					});

					group.append(r);
					
					startY = endY;
					value = yValue;
				}

				this.setActiveEventOption(group); // 액티브 엘리먼트 이벤트 설정
				this.addBarElement(group);
				g.append(group);
			});

			// 액티브 엘리먼트 설정
			this.setActiveEffectOption();

            return g;
		}
	}

	return ColumnStackBrush;
}, "chart.brush.stackbar");

jui.define("chart.brush.stackbar3d", [], function() {

    /**
     * @class chart.brush.stackbar3d
     * @extends chart.brush.core
     */
	var StackBar3DBrush = function(chart, axis, brush) {
		var g;
        var height, bar_height;
        var zeroXY;

		this.drawBefore = function() {
			g = chart.svg.group();
            height = axis.y.rangeBand();
            bar_height = height - brush.outerPadding * 2;
            zeroXY = axis.c(0, 0);
		}

		this.draw = function() {
            this.eachData(function(data, i) {
                var group = chart.svg.group(),
                    startY = axis.c(0, i).y - bar_height / 2,
                    col_width = 0;

                for(var j = 0; j < brush.target.length; j++) {
                    var value = data[brush.target[j]],
                        xy = axis.c(value, i),
                        top = Math.sin(axis.c.radian) * xy.depth,
                        width = Math.abs(zeroXY.x - xy.x),
                        r = chart.svg.rect3d(this.color(j), width, bar_height, axis.c.degree, xy.depth);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(zeroXY.x + col_width, startY + top);

                    // 그룹에 컬럼 엘리먼트 추가
                    g.append(r);

                    col_width += width;
                }

                if(value != 0) {
                    this.addEvent(group, i, j);
                }

                g.append(group);
            });

            return g;
		}
	}

    StackBar3DBrush.setup = function() {
        return {
            outerPadding: 10
        };
    }

	return StackBar3DBrush;
}, "chart.brush.core");

jui.define("chart.brush.stackcolumn3d", [], function() {

    /**
     * @class chart.brush.stackcolumn3d
     * @extends chart.brush.core
     */
	var StackColumn3DBrush = function() {
		var g;
        var width, bar_width;
        var zeroXY;

		this.drawBefore = function() {
			g = this.chart.svg.group();
            width = this.axis.x.rangeBand();
            bar_width = width - this.brush.outerPadding * 2;
            zeroXY = this.axis.c(0, 0);
		}

        this.drawMain = function(index, width, height, degree, depth) {
            return this.chart.svg.rect3d(this.color(index), width, height, degree, depth);
        }

		this.draw = function() {
            this.eachData(function(data, i) {
                var group = this.chart.svg.group(),
                    startX = this.axis.c(i, 0).x - bar_width / 2,
                    col_height = 0;

                for(var j = 0; j < this.brush.target.length; j++) {
                    var value = data[this.brush.target[j]],
                        xy = this.axis.c(i, value),
                        top = Math.sin(this.axis.c.radian) * xy.depth;

                    var startY = xy.y + top,
                        height = Math.abs(zeroXY.y - xy.y),
                        r = this.drawMain(j, bar_width, height, this.axis.c.degree, xy.depth);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(startX, startY - col_height);
                    group.append(r);

                    col_height += height;
                }

                g.append(group);
            });

            return g;
		}
	}

    StackColumn3DBrush.setup = function() {
        return {
            outerPadding: 10
        };
    }

	return StackColumn3DBrush;
}, "chart.brush.core");

jui.define("chart.brush.stackcylinder3d", [], function() {

    /**
     * @class chart.brush.stackcylinder3d
     * @extends chart.brush.core
     */
	var StackCylinder3DBrush = function() {
        this.drawMain = function(index, width, height, degree, depth) {
            var top = Math.sin(this.axis.c.radian) * depth,
                h = (index > 0) ? height - top : height;

            return this.chart.svg.cylinder3d(this.color(index), width, h, degree, depth);
        }
	}

	return StackCylinder3DBrush;
}, "chart.brush.stackcolumn3d");

jui.define("chart.brush.fullstackbar", [], function() {

    /**
     * @class chart.brush.fullstackbar 
     * @extends chart.brush.stackbar
     */
	var FullStackBarBrush = function(chart, axis, brush) {
		var g, zeroX, height, bar_height;

		this.drawBefore = function() {
			g = chart.svg.group();
			zeroX = axis.x(0);
			height = axis.y.rangeBand();
			bar_height = this.getTargetSize();
		}

		this.drawText = function(percent, x, y) {
			var text = this.chart.text({
				"font-size" : this.chart.theme("barFontSize"),
				fill : this.chart.theme("barFontColor"),
				x : x,
				y : y,
				"text-anchor" : "middle"
			}, percent + "%");

			return text;
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var group = chart.svg.group();

				var startY = this.offset("y", i) - bar_height / 2,
					sum = 0,
					list = [];

				for(var j = 0; j < brush.target.length; j++) {
					var width = data[brush.target[j]];

					sum += width;
					list.push(width);
				}

				var startX = 0,
					max = axis.x.max();

				for(var j = list.length - 1; j >= 0; j--) {
					var width = axis.x.rate(list[j], sum),
						r = this.getBarElement(i, j);

					r.attr({
						x : startX,
						y : startY,
						width: width,
						height: bar_height
					});

					group.append(r);

					// 퍼센트 노출 옵션 설정
					if(brush.showText) {
						var p = Math.round((list[j] / sum) * max),
							x = startX + width / 2,
							y = startY + bar_height / 2 + 5;

						group.append(this.drawText(p, x, y));
					}

					// 액티브 엘리먼트 이벤트 설정
					this.setActiveEventOption(group);

					startX += width;
				}

				this.addBarElement(group);
				g.append(group);
			});

			// 액티브 엘리먼트 설정
			this.setActiveEffectOption();

			return g;
		}
	}

	FullStackBarBrush.setup = function() {
		return {
            /** @cfg {Number} [outerPadding=15] */
			outerPadding: 15,
            /** @cfg {Boolean} [showText=false] Configures settings to let the percent text of a full stack bar revealed. */
			showText: false
		};
	}

	return FullStackBarBrush;
}, "chart.brush.stackbar");

jui.define("chart.brush.fullstackcolumn", [], function() {

    /**
     * @class chart.brush.fullstackcolumn 
     * @extends chart.brush.fullstackbar
     */
	var FullStackColumnBrush = function(chart, axis, brush) {
		var g, zeroY, bar_width;

		this.getTargetSize = function() {
			var width = this.axis.x.rangeBand(),
				r_width = 0;

			if(this.brush.size > 0) {
				r_width = this.brush.size;
			} else {
				r_width = width - this.brush.outerPadding * 2;
			}

			return (r_width < 0) ? 0 : r_width;
		}

		this.drawBefore = function() {
			g = chart.svg.group();
			zeroY = axis.y(0);
			bar_width = this.getTargetSize();
		}

		this.draw = function() {
			var chart_height = axis.area("height");

			this.eachData(function(data, i) {
				var group = chart.svg.group();

				var startX = this.offset("x", i) - bar_width / 2,
                    sum = 0,
                    list = [];

				for(var j = 0; j < brush.target.length; j++) {
					var height = data[brush.target[j]];

					sum += height;
					list.push(height);
				}

				var startY = 0,
                    max = axis.y.max();
				
				for(var j = list.length - 1; j >= 0; j--) {
					var height = chart_height - axis.y.rate(list[j], sum),
						r = this.getBarElement(i, j);

					r.attr({
						x: startX,
						y: startY,
						width: bar_width,
						height: height
					});

					group.append(r);

					// 퍼센트 노출 옵션 설정
					if(brush.showText) {
						var p = Math.round((list[j] / sum) * max),
							x = startX + bar_width / 2,
							y = startY + height / 2 + 8;

						group.append(this.drawText(p, x, y));
					}

					// 액티브 엘리먼트 이벤트 설정
					this.setActiveEventOption(group);

					startY += height;										
				}

				this.addBarElement(group);
				g.append(group);
			});

			// 액티브 엘리먼트 설정
			this.setActiveEffectOption();

            return g;
		}
	}

	return FullStackColumnBrush;
}, "chart.brush.fullstackbar");

jui.define("chart.brush.fullstackbar3d", [], function() {

    /**
     * @class chart.brush.fullstackbar3d
     * @extends chart.brush.core
     */
	var FullStackBar3DBrush = function(chart, axis, brush) {
		var g;
        var height, bar_height;
        var zeroXY;

		this.drawBefore = function() {
			g = chart.svg.group();
            height = axis.y.rangeBand();
            bar_height = height - brush.outerPadding * 2;
            zeroXY = axis.c(0, 0);
		}

        this.drawText = function(percent, x, y) {
            var text = this.chart.text({
                "font-size" : this.chart.theme("barFontSize"),
                x : x,
                y : y,
                "text-anchor" : "middle"
            }, percent + "%");

            return text;
        }

		this.draw = function() {
            this.eachData(function(data, i) {
                var group = chart.svg.group(),
                    startY = axis.c(0, i).y - bar_height / 2,
                    col_width = 0,
                    sum = 0,
                    list = [];

                for(var j = 0; j < brush.target.length; j++) {
                    var width = data[brush.target[j]];

                    sum += width;
                    list.push(width);
                }

                for(var j = 0; j < brush.target.length; j++) {
                    var value = data[brush.target[j]],
                        xy = axis.c(value, i),
                        top = Math.sin(axis.c.radian) * xy.depth,
                        width = axis.x.rate(list[j], sum),
                        r = chart.svg.rect3d(this.color(j), width, bar_height, axis.c.degree, xy.depth);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(zeroXY.x + col_width, startY + top);

                    // 그룹에 컬럼 엘리먼트 추가
                    group.append(r);

                    // 퍼센트 노출 옵션 설정
                    if(brush.showText) {
                        var p = Math.round((list[j] / sum) * axis.x.max()),
                            x = col_width + width / 2,
                            y = startY + bar_height / 2 + 5;

                        group.append(this.drawText(p, x, y));
                    }

                    col_width += width;
                }

                this.addEvent(group, i, j);
                g.append(group);
            });

            return g;
		}
	}

    FullStackBar3DBrush.setup = function() {
        return {
            outerPadding: 10,
            showText: false
        };
    }

	return FullStackBar3DBrush;
}, "chart.brush.core");

jui.define("chart.brush.fullstackcolumn3d", [], function() {

    /**
     * @class chart.brush.fullstackcolumn3d
     * @extends chart.brush.core
     */
	var FullStackColumn3DBrush = function() {
		var g;
        var width, bar_width;
        var zeroXY;

		this.drawBefore = function() {
			g = this.chart.svg.group();
            width = this.axis.x.rangeBand();
            bar_width = width - this.brush.outerPadding * 2;
            zeroXY = this.axis.c(0, 0);
		}

        this.drawMain = function(index, width, height, degree, depth) {
            return this.chart.svg.rect3d(this.color(index), width, height, degree, depth);
        }

        this.getTextXY = function(index, x, y, depth) {
            return {
                x: x,
                y: y
            }
        }

		this.draw = function() {
            this.eachData(function(data, i) {
                var group = this.chart.svg.group(),
                    startX = this.axis.c(i, 0).x - bar_width / 2,
                    startY = zeroXY.y,
                    sum = 0,
                    list = [];

                for(var j = 0; j < this.brush.target.length; j++) {
                    var height = data[this.brush.target[j]];

                    sum += height;
                    list.push(height);
                }

                for(var j = 0; j < this.brush.target.length; j++) {
                    var value = data[this.brush.target[j]],
                        xy = this.axis.c(i, value),
                        top = Math.sin(this.axis.c.radian) * xy.depth,
                        height = zeroXY.y - this.axis.y.rate(list[j], sum),
                        r = this.drawMain(j, bar_width, height, this.axis.c.degree, xy.depth);

                    if(value != 0) {
                        this.addEvent(r, i, j);
                    }

                    r.translate(startX, startY - height + top);
                    group.append(r);

                    // 퍼센트 노출 옵션 설정
                    if(this.brush.showText) {
                        var p = Math.round((list[j] / sum) * this.axis.y.max()),
                            x = startX + bar_width / 2,
                            y = startY - height / 2 + 6,
                            xy = this.getTextXY(j, x, y, xy.depth)

                        group.append(this.drawText(p, xy.x, xy.y));
                    }

                    startY -= height;
                }

                g.append(group);
            });

            return g;
		}
	}

    FullStackColumn3DBrush.setup = function() {
        return {
            outerPadding: 10,
            showText: false
        };
    }

	return FullStackColumn3DBrush;
}, "chart.brush.fullstackbar3d");

jui.define("chart.brush.fullstackcylinder3d", [], function() {

    /**
     * @class chart.brush.fullstackcylinder3d
     * @extends chart.brush.core
     */
	var FullStackCylinder3DBrush = function() {
        this.drawMain = function(index, width, height, degree, depth) {
            var top = Math.sin(this.axis.c.radian) * depth,
                h = (index > 0) ? height - top : height;

            return this.chart.svg.cylinder3d(this.color(index), width, h, degree, depth);
        }

        this.getTextXY = function(index, x, y, depth) {
            var top = Math.sin(this.axis.c.radian) * depth;

            return {
                x: x + ((Math.cos(this.axis.c.radian) * depth) / 2),
                y: y - ((index > 0) ? top : 0)
            }
        }
	}

	return FullStackCylinder3DBrush;
}, "chart.brush.fullstackcolumn3d");

jui.define("chart.brush.bubble", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.brush.bubble 
     *
     * @extends chart.brush.core
     */
	var BubbleBrush = function() {
        var self = this,
            min = null,
            max = null;

        this.getFormatText = function(value, dataIndex) {
            if(_.typeCheck("function", this.brush.format)) {
                return this.format(this.axis.data[dataIndex]);
            }

            return value;
        }

        this.getBubbleRadius = function(value, dataIndex) {
            var scaleKey = this.brush.scaleKey;

            if(scaleKey != null) {
                var scaleValue = this.axis.data[dataIndex][scaleKey];
                value = (_.typeCheck("number", scaleValue)) ? scaleValue : value;
            }

            return math.scaleValue(value, min, max, this.brush.min, this.brush.max);
        }

        this.createBubble = function(pos, color, dataIndex) {
            var radius = this.getBubbleRadius(pos.value, dataIndex),
                circle = this.svg.group().translate(pos.x, pos.y);

            circle.append(
                this.svg.circle({
                    r: radius,
                    "fill": color,
                    "fill-opacity": this.chart.theme("bubbleBackgroundOpacity"),
                    "stroke": color,
                    "stroke-width": this.chart.theme("bubbleBorderWidth")
                })
            );

            if(this.brush.showText) {
                var text = this.getFormatText(pos.value, dataIndex);

                circle.append(
                    this.chart.text({
                        "font-size": this.chart.theme("bubbleFontSize"),
                        fill: this.chart.theme("bubbleFontColor"),
                        "text-anchor": "middle",
                        dy: 3
                    }).text(text)
                );
            }

            this.bubbleList.push(circle);

            return circle;
        }

        this.setActiveEffect = function(r) {
            var cols = this.bubbleList;

            for(var i = 0; i < cols.length; i++) {
                var opacity = (cols[i] == r) ? 1 : this.chart.theme("bubbleBackgroundOpacity");

                cols[i].get(0).attr({ opacity: opacity });
                cols[i].get(1).attr({ opacity: opacity });
            }
        }

        this.drawBubble = function(points) {
            var g = this.svg.group();
            
            for(var i = 0; i < points.length; i++) {
                for(var j = 0; j < points[i].x.length; j++) {
                    var b = this.createBubble({
                        x: points[i].x[j], y: points[i].y[j], value: points[i].value[j]
                    }, this.color(j, i), j);

                    // 컬럼 및 기본 브러쉬 이벤트 설정
                    if(this.brush.activeEvent != null) {
                        (function(bubble) {
                            bubble.on(self.brush.activeEvent, function(e) {
                                self.setActiveEffect(bubble);
                            });

                            bubble.attr({ cursor: "pointer" });
                        })(b);
                    }

                    this.addEvent(b, j, i);
                    g.append(b);
                }
            }

            // 액티브 버블 설정
            var bubble = this.bubbleList[this.brush.active];
            if(bubble != null) {
                this.setActiveEffect(bubble);
            }

            return g;
        }

        this.drawBefore = function() {
            var scaleKey = this.brush.scaleKey;

            if(scaleKey != null) {
                var values = [];

                for (var i = 0; i < this.axis.data.length; i++) {
                    values.push(this.axis.data[i][scaleKey]);
                }

                min = Math.min.apply(this, values);
                max = Math.max.apply(this, values);
            } else {
                min = this.axis.y.min();
                max = this.axis.y.max();
            }

            this.bubbleList = [];
        }

        this.draw = function() {
            return this.drawBubble(this.getXY());
        }

        this.drawAnimate = function(root) {
            root.each(function(i, elem) {
                var c = elem.children[0];

                c.append(self.svg.animateTransform({
                    attributeType: "xml",
                    attributeName: "transform",
                    type: "scale",
                    from: "0",
                    to: "1",
                    dur: "0.7s",
                    fill: "freeze",
                    repeatCount: "1"
                }));

                c.append(self.svg.animate({
                    attributeType: "xml",
                    attributeName: "fill-opacity",
                    from: "0",
                    to: self.chart.theme("bubbleBackgroundOpacity"),
                    dur: "1.4s",
                    repeatCount: "1",
                    fill: "freeze"
                }));
            });
        }
	}

    BubbleBrush.setup = function() {
        return {
            /** @cfg {Number} [min=5] Determines the minimum size of a bubble. */
            min: 5,
            /** @cfg {Number} [max=30] Determines the maximum size of a bubble.*/
            max: 30,
            /** @cfg {String} [scaleKey=null] The name of the property to determine the bubble size. */
            scaleKey: null,
            /** @cfg {Boolean} [showText=false] Set the text appear. */
            showText: false,
            /** @cfg {Function} [format=null] Returns a value from the format callback function of a defined option. */
            format: null,
            /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
            active: null,
            /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null
        };
    }

	return BubbleBrush;
}, "chart.brush.core");
jui.define("chart.brush.bubble3d", [ "util.math" ], function(math) {

    /**
     * @class chart.brush.bubble3d
     * @extends chart.brush.core
     */
	var Bubble3DBrush = function() {
		this.getRadialGradient = function(i, j) {
            var color = this.color(i, j),
                degree = this.axis.c.degree,
                dx_rate = 40 / 45,
                dy_rate = 80 / 90,
                dx = 50 + (dx_rate * ((degree >= 45) ? Math.abs(degree - 90) : degree)),
                dy = 10 + (dy_rate * (90 - degree));

            if(color.indexOf("radial") == -1) {
                return this.chart.color("radial(" + dx + "%," + dy + "%,50%," + dx + "%," + dy + "%) 0% #FFFFFF,50% " + color);
            }

            return color;
        }

        this.draw = function() {
            var g = this.chart.svg.group(),
                count = this.brush.target.length;

            this.eachData(function(data, i) {
                for(var j = 0; j < count; j++) {
                    var value = data[this.brush.target[j]],
                        xy = this.axis.c(i, value, j, count),
                        dx = Math.cos(this.axis.c.radian) * xy.depth,
                        dy = Math.sin(this.axis.c.radian) * xy.depth,
                        startX = xy.x + dx / 2,
                        startY = xy.y - dy / 2,
                        rate = math.scaleValue(count - j, 1, count, 0.6, 1),
                        color = this.color(i, j);

                    var b = this.createBubble({
                        x: startX, y: startY, value: value
                    }, color),
                    c = b.get(0);

                    c.attr({
                        r: c.attributes.r * rate,
                        fill: this.getRadialGradient(i, j)
                    });

                    this.addEvent(b, i, j);
                    g.append(b);
                }
            });

            return g;
		}
	}

	return Bubble3DBrush;
}, "chart.brush.bubble");

jui.define("chart.brush.candlestick", [], function() {

    /**
     * @class chart.brush.candlestick 
     * @extends chart.brush.core
     */
    var CandleStickBrush = function() {
        var g, width = 0, barWidth = 0, barPadding = 0;

        this.drawBefore = function() {
            g = this.chart.svg.group();
            width = this.axis.x.rangeBand();
            barWidth = width * 0.7;
            barPadding = barWidth / 2;
        }

        this.draw = function() {
            this.eachData(function(data, i) {
                var startX = this.offset("x", i),
                    r = null,
                    l = null;

                var high = this.getValue(data, "high", 0),
                    low = this.getValue(data, "low", 0),
                    open = this.getValue(data, "open", 0),
                    close = this.getValue(data, "close", 0);

                if(open > close) { // 시가가 종가보다 높을 때 (Red)
                    var y = this.axis.y(open);

                    l = this.chart.svg.line({
                        x1: startX,
                        y1: this.axis.y(high),
                        x2: startX,
                        y2: this.axis.y(low),
                        stroke: this.chart.theme("candlestickInvertBorderColor"),
                        "stroke-width": 1
                    });

                    r = this.chart.svg.rect({
                        x : startX - barPadding,
                        y : y,
                        width : barWidth,
                        height : Math.abs(this.axis.y(close) - y),
                        fill : this.chart.theme("candlestickInvertBackgroundColor"),
                        stroke: this.chart.theme("candlestickInvertBorderColor"),
                        "stroke-width": 1
                    });

                } else {
                    var y = this.axis.y(close);

                    l = this.chart.svg.line({
                        x1: startX,
                        y1: this.axis.y(high),
                        x2: startX,
                        y2: this.axis.y(low),
                        stroke: this.chart.theme("candlestickBorderColor"),
                        "stroke-width":1
                    });

                    r = this.chart.svg.rect({
                        x : startX - barPadding,
                        y : y,
                        width : barWidth,
                        height : Math.abs(this.axis.y(open) - y),
                        fill : this.chart.theme("candlestickBackgroundColor"),
                        stroke: this.chart.theme("candlestickBorderColor"),
                        "stroke-width": 1
                    });
                }

                this.addEvent(r, i, null);

                g.append(l);
                g.append(r);
            });

            return g;
        }
    }

    return CandleStickBrush;
}, "chart.brush.core");

jui.define("chart.brush.ohlc", [], function() {

    /**
     * @class chart.brush.ohlc 
     * @extends chart.brush.candlestick
     */
    var OHLCBrush = function(chart, axis, brush) {
        var g;

        this.drawBefore = function() {
            g = chart.svg.group();
        }

        this.draw = function() {
            this.eachData(function(data, i) {
                var startX = this.offset("x", i);

                var high = this.getValue(data, "high", 0),
                    low = this.getValue(data, "low", 0),
                    open = this.getValue(data, "open", 0),
                    close = this.getValue(data, "close", 0);

                var color = (open > close) ? chart.theme("ohlcInvertBorderColor") : chart.theme("ohlcBorderColor");

                var lowHigh = chart.svg.line({
                    x1: startX,
                    y1: axis.y(high),
                    x2: startX,
                    y2: axis.y(low),
                    stroke: color,
                    "stroke-width": 1
                });

                var close = chart.svg.line({
                    x1: startX,
                    y1: axis.y(close),
                    x2: startX + chart.theme("ohlcBorderRadius"),
                    y2: axis.y(close),
                    stroke: color,
                    "stroke-width": 1
                });

                var open = chart.svg.line({
                    x1: startX,
                    y1: axis.y(open),
                    x2: startX - chart.theme("ohlcBorderRadius"),
                    y2: axis.y(open),
                    stroke: color,
                    "stroke-width": 1
                });

                this.addEvent(lowHigh, i, null);

                g.append(lowHigh);
                g.append(close);
                g.append(open);
            });

            return g;
        }
    }

    return OHLCBrush;
}, "chart.brush.candlestick");

jui.define("chart.brush.equalizer", [], function() {

    /**
     * @class chart.brush.equalizer 
     * @extends chart.brush.core
     */
    var EqualizerBrush = function(chart, axis, brush) {
        var g, zeroY, width, barWidth, half_width;

        this.drawBefore = function() {
            g = chart.svg.group();
            zeroY = axis.y(0);
            width = axis.x.rangeBand();
            half_width = (width - brush.outerPadding * 2) / 2;
            barWidth = (width - brush.outerPadding * 2 - (brush.target.length - 1) * brush.innerPadding) / brush.target.length;
        }

        this.draw = function() {
            this.eachData(function(data, i) {
                var startX = this.offset("x", i) - half_width;

                for (var j = 0; j < brush.target.length; j++) {
                    var barGroup = chart.svg.group();
                    var startY = axis.y(data[brush.target[j]]),
                        padding = 1.5,
                        eY = zeroY,
                        eIndex = 0;

                    if (startY <= zeroY) {
                        while (eY > startY) {
                            var unitHeight = (eY - brush.unit < startY) ? Math.abs(eY - startY) : brush.unit;
                            var r = chart.svg.rect({
                                x : startX,
                                y : eY - unitHeight,
                                width : barWidth,
                                height : unitHeight,
                                fill : this.color(Math.floor(eIndex / brush.gap))
                            });

                            eY -= unitHeight + padding;
                            eIndex++;

                            barGroup.append(r);
                        }
                    } else {
                        while (eY < startY) {
                            var unitHeight = (eY + brush.unit > startY) ? Math.abs(eY - startY) : brush.unit;
                            var r = chart.svg.rect({
                                x : startX,
                                y : eY,
                                width : barWidth,
                                height : unitHeight,
                                fill : this.color(Math.floor(eIndex / brush.gap))
                            });

                            eY += unitHeight + padding;
                            eIndex++;

                            barGroup.append(r);
                        }
                    }

                    this.addEvent(barGroup, i, j);
                    g.append(barGroup);

                    startX += barWidth + brush.innerPadding;
                }
            });

            return g;
        }
    }

    EqualizerBrush.setup = function() {
        return {
            /** @cfg {Number} [innerPadding=10] Determines the inner margin of an equalizer.*/
            innerPadding: 10,
            /** @cfg {Number} [outerPadding=15] Determines the outer margin of an equalizer. */
            outerPadding: 15,
            /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
            unit: 5,
            /** @cfg {Number} [gap=5] Determines the number of columns in an equalizer - expressed as a color.*/
            gap: 5
        };
    }

    return EqualizerBrush;
}, "chart.brush.core");

jui.define("chart.brush.equalizerbar", [], function() {

    /**
     * @class chart.brush.equalizerbar
     * @extends chart.brush.stackbar
     */
    var EqualizerBarBrush = function() {
        var g, zeroX, bar_height, is_reverse;

        this.drawBefore = function() {
            g = this.svg.group();
            zeroX = this.axis.x(0);
            bar_height = this.getTargetSize();
            is_reverse = this.axis.get("x").reverse;
        }

        this.draw = function() {
            var targets = this.brush.target,
                padding = this.brush.innerPadding,
                band = this.axis.x.rangeBand(),
                unit = band / (this.brush.unit * padding),
                width = unit + padding;

            this.eachData(function(data, i) {
                var startY = this.offset("y", i) - bar_height / 2,
                    startX = this.axis.x(0),
                    x = startX,
                    value = 0;

                for (var j = 0; j < targets.length; j++) {
                    var barGroup = this.svg.group(),
                        xValue = data[targets[j]] + value,
                        endX = this.axis.x(xValue),
                        targetWidth = Math.abs(startX - endX),
                        targetX = targetWidth;

                    while (targetX >= width) {
                        var r = this.getBarElement(i, j);

                        r.attr({
                            x : x,
                            y : startY,
                            width : unit,
                            height : bar_height
                        });

                        targetX -= width;
                        x -= (is_reverse) ? width : -width;

                        barGroup.append(r);
                    }

                    barGroup.translate((is_reverse) ? -unit : 0, 0);
                    this.addEvent(barGroup, i, j);
                    g.append(barGroup);

                    startX = endX;
                    value = xValue;
                }
            });

            return g;
        }
    }

    EqualizerBarBrush.setup = function() {
        return {
            /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
            unit: 1
        };
    }

    return EqualizerBarBrush;
}, "chart.brush.stackbar");

jui.define("chart.brush.equalizercolumn", [], function() {

    /**
     * @class chart.brush.equalizercolumn
     * @extends chart.brush.stackcolumn
     */
    var EqualizerColumnBrush = function() {
        var g, zeroY, bar_width, is_reverse;

        this.drawBefore = function() {
            g = this.svg.group();
            zeroY = this.axis.y(0);
            bar_width = this.getTargetSize();
            is_reverse = this.axis.get("y").reverse;
        }

        this.draw = function() {
            var targets = this.brush.target,
                padding = this.brush.innerPadding,
                band = this.axis.y.rangeBand(),
                unit = band / (this.brush.unit * padding),
                height = unit + padding;

            this.eachData(function(data, i) {
                var startX = this.offset("x", i) - bar_width / 2,
                    startY = this.axis.y(0),
                    y = startY,
                    value = 0;

                for (var j = 0; j < targets.length; j++) {
                    var barGroup = this.svg.group(),
                        yValue = data[targets[j]] + value,
                        endY = this.axis.y(yValue),
                        targetHeight = Math.abs(startY - endY),
                        targetY = targetHeight;

                    while (targetY >= height) {
                        var r = this.getBarElement(i, j);

                        r.attr({
                            x : startX,
                            y : y,
                            width : bar_width,
                            height : unit
                        });

                        targetY -= height;
                        y += (is_reverse) ? height : -height;

                        barGroup.append(r);
                    }

                    barGroup.translate(0, (is_reverse) ? 0 : -unit);
                    this.addEvent(barGroup, i, j);
                    g.append(barGroup);

                    startY = endY;
                    value = yValue;
                }
            });

            return g;
        }
    }

    EqualizerColumnBrush.setup = function() {
        return {
            /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
            unit: 1
        };
    }

    return EqualizerColumnBrush;
}, "chart.brush.stackcolumn");

jui.define("chart.brush.line", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.line
     * @extends chart.brush.core
     */
	var LineBrush = function() {
        var g;
        var circleColor, disableOpacity, lineBorderWidth, lineBorderDashArray;

        this.setActiveEffect = function(elem) {
            var lines = this.lineList;

            for(var i = 0; i < lines.length; i++) {
                var opacity = (elem == lines[i].element) ? 1 : disableOpacity,
                    color = lines[i].element.get(0).attr("stroke");

                if(lines[i].tooltip != null) {
                    lines[i].tooltip.style(color, circleColor, opacity);
                }

                lines[i].element.attr({ opacity: opacity });
            }
        }

        this.addLineElement = function(elem) {
            if(!this.lineList) {
                this.lineList = [];
            }

            this.lineList.push(elem);
        }

        this.createLine = function(pos, tIndex) {
            var x = pos.x,
                y = pos.y,
                v = pos.value,
                px = (this.brush.symbol == "curve") ? this.curvePoints(x) : null,
                py = (this.brush.symbol == "curve") ? this.curvePoints(y) : null,
                color = null,
                opts = {
                    "stroke-width" : lineBorderWidth,
                    "stroke-dasharray" : lineBorderDashArray,
                    fill : "transparent",
                    "cursor" : (this.brush.activeEvent != null) ? "pointer" : "normal"
                };

            var g = this.svg.group(),
                p = null;

            if(pos.length > 0) {
                var start = null, end = null;

                for (var i = 0; i < x.length - 1; i++) {
                    if(!_.typeCheck([ "undefined", "null" ], v[i]))
                        start = i;
                    if(!_.typeCheck([ "undefined", "null" ], v[i + 1]))
                        end = i + 1;

                    if(start == null || end == null || start == end)
                        continue;

                    var newColor = this.color(i, tIndex);

                    if(color != newColor) {
                        p = this.svg.path(_.extend({
                            stroke: newColor,
                            x1: x[start] // Start coordinates of area brush
                        }, opts));

                        p.css({
                            "pointer-events": "stroke"
                        });

                        p.MoveTo(x[start], y[start]);
                        g.append(p);

                        color = newColor;
                    } else {
                        p.attr({
                            x2: x[end] // End coordinates of area brush
                        });
                    }

                    if (this.brush.symbol == "curve") {
                        p.CurveTo(px.p1[start], py.p1[start], px.p2[start], py.p2[start], x[end], y[end]);
                    } else {
                        if (this.brush.symbol == "step") {
                            var sx = x[start] + ((x[end] - x[start]) / 2);

                            p.LineTo(sx, y[start]);
                            p.LineTo(sx, y[end]);
                        }

                        p.LineTo(x[end], y[end]);
                    }
                }
            }

            return g;
        }

        this.createTooltip = function(g, pos, index) {
            var display = this.brush.display;

            for (var i = 0; i < pos.x.length; i++) {
                if((display == "max" && pos.max[i]) || (display == "min" && pos.min[i]) || display == "all") {
                    var orient = (display == "max" && pos.max[i]) ? "top" : "bottom";

                    var minmax = this.drawTooltip(this.color(index), circleColor, 1);
                    minmax.control(orient, pos.x[i], pos.y[i], this.format(pos.value[i]));

                    g.append(minmax.tooltip);

                    // 컬럼 상태 설정 (툴팁)
                    this.lineList[index].tooltip = minmax;
                }
            }
        }

        this.drawLine = function(path) {
            var self = this;

            for(var k = 0; k < path.length; k++) {
                var p = this.createLine(path[k], k);

                this.addEvent(p, null, k);
                g.append(p);

                // 컬럼 상태 설정
                this.addLineElement({
                    element: p,
                    tooltip: null
                });

                // Max & Min 툴팁 추가
                if(this.brush.display != null) {
                    this.createTooltip(g, path[k], k);
                }

                // 액티브 이벤트 설정
                if(this.brush.activeEvent != null) {
                    (function(elem) {
                        elem.on(self.brush.activeEvent, function(e) {
                            self.setActiveEffect(elem);
                        });
                    })(p);
                }
            }

            // 액티브 라인 설정
            for(var k = 0; k < path.length; k++) {
                if(this.brush.active == this.brush.target[k]) {
                    this.setActiveEffect(this.lineList[k].element);
                }
            }

            return g;
        }

        this.drawBefore = function() {
            g = this.chart.svg.group();
            circleColor = this.chart.theme("linePointBorderColor");
            disableOpacity = this.chart.theme("lineDisableBorderOpacity");
            lineBorderWidth = this.chart.theme("lineBorderWidth");
            lineBorderDashArray = this.chart.theme("lineBorderDashArray");
        }

        this.draw = function() {
            return this.drawLine(this.getXY());
        }

        this.drawAnimate = function(root) {
            var svg = this.chart.svg;

            root.each(function(i, elem) {
                if(elem.is("util.svg.element.path")) {
                    var dash = elem.attributes["stroke-dasharray"],
                        len = elem.length();

                    if(dash == "none") {
                        elem.attr({
                            "stroke-dasharray": len
                        });

                        elem.append(svg.animate({
                            attributeName: "stroke-dashoffset",
                            from: len,
                            to: "0",
                            begin: "0s",
                            dur: "1s",
                            repeatCount: "1"
                        }));
                    } else {
                        elem.append(svg.animate({
                            attributeName: "opacity",
                            from: "0",
                            to: "1",
                            begin: "0s" ,
                            dur: "1.5s",
                            repeatCount: "1",
                            fill: "freeze"
                        }));
                    }
                }
            });
        }
	}

    LineBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step). */
            symbol: "normal", // normal, curve, step
            /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
            active: null,
            /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null,
            /** @cfg {"max"/"min"/"all"} [display=null]  Shows a tool tip on the bar for the minimum/maximum value.  */
            display: null
        };
    }

	return LineBrush;
}, "chart.brush.core");
jui.define("chart.brush.path", [], function() {

    /**
     * @class chart.brush.path 
     * @extends chart.brush.core
     */
	var PathBrush = function() {

		this.draw = function() {
			var g = this.svg.group();
			
			for(var ti = 0, len = this.brush.target.length; ti < len; ti++) {
				var color = this.color(ti);

				var path = this.svg.path({
					fill : color,
					"fill-opacity" : this.chart.theme("pathBackgroundOpacity"),
					stroke : color,
					"stroke-width" : this.chart.theme("pathBorderWidth")
				});
	
				g.append(path);
	
				this.eachData(function(data, i) {
					var obj = this.axis.c(i, data[this.brush.target[ti]]),
						x = obj.x - this.chart.area("x") + this.axis.padding("left"),
						y = obj.y - this.chart.area("y") + this.axis.padding("top");

					if (i == 0) {
						path.MoveTo(x, y);
					} else {
						path.LineTo(x, y);
					}
				});
	
				path.ClosePath();
			}

			return g;
		}
	}

	return PathBrush;
}, "chart.brush.core");

jui.define("chart.brush.pie", [ "util.base", "util.math", "util.color" ], function(_, math, ColorUtil) {

	/**
	 * @class chart.brush.pie
     * @extends chart.brush.core
	 */
	var PieBrush = function() {
        var self = this, textY = 3;
        var g;
        var cache_active = {};

        this.setActiveEvent = function(pie, centerX, centerY, centerAngle) {
            var dist = this.chart.theme("pieActiveDistance"),
                tx = Math.cos(math.radian(centerAngle)) * dist,
                ty = Math.sin(math.radian(centerAngle)) * dist;

            pie.translate(centerX + tx, centerY + ty);
        }

        this.setActiveTextEvent = function(pie, centerX, centerY, centerAngle, outerRadius, isActive) {
            var dist = (isActive) ? this.chart.theme("pieActiveDistance") : 0,
                cx = centerX + (Math.cos(math.radian(centerAngle)) * ((outerRadius + dist) / 2)),
                cy = centerY + (Math.sin(math.radian(centerAngle)) * ((outerRadius + dist) / 2));

            pie.translate(cx, cy);
        }

        this.getFormatText = function(target, value, max) {
            var key = target;

            if(typeof(this.brush.format) == "function") {
                return this.format(key, value, max);
            } else {
                if (!value) {
                    return key;
                }

                return key + ": " + this.format(value);
            }
        }

		this.drawPie = function(centerX, centerY, outerRadius, startAngle, endAngle, color) {
			var pie = this.chart.svg.group();

            if (endAngle == 360) { // if pie is full size, draw a circle as pie brush
                var circle = this.chart.svg.circle({
                    cx : centerX,
                    cy : centerY,
                    r : outerRadius,
                    fill : color,
                    stroke : this.chart.theme("pieBorderColor") || color,
                    "stroke-width" : this.chart.theme("pieBorderWidth")
                });

                pie.append(circle);

                return pie;
            }
            
            var path = this.chart.svg.path({
                fill : color,
                stroke : this.chart.theme("pieBorderColor") || color,
                "stroke-width" : this.chart.theme("pieBorderWidth")
            });

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
                startY = obj.y;
			
			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));

			pie.translate(centerX, centerY);

			// arc 그림
			path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y)
                .LineTo(0, 0)
                .ClosePath();

            pie.append(path);
            pie.order = 1;

			return pie;
		}

		this.drawPie3d = function(centerX, centerY, outerRadius, startAngle, endAngle, color) {
			var pie = this.chart.svg.group(),
				path = this.chart.svg.path({
                    fill : color,
                    stroke : this.chart.theme("pieBorderColor") || color,
                    "stroke-width" : this.chart.theme("pieBorderWidth")
                });

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
                startY = obj.y;

			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));

			pie.translate(centerX, centerY);

			// arc 그림
			path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y)

            var y = obj.y + 10,
                x = obj.x + 5,
                targetX = startX + 5,
                targetY = startY + 10;

            path.LineTo(x, y);
            path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 0, targetX, targetY)
            path.ClosePath();

            pie.append(path);
            pie.order = 1;

			return pie;
		}

        this.drawText = function(centerX, centerY, centerAngle, outerRadius, text) {
            var g = this.svg.group({
                    visibility: !this.brush.showText ? "hidden" : "visible"
                }),
                isLeft = (centerAngle + 90 > 180) ? true : false;

            if(this.brush.showText == "inside") {
                var cx = centerX + (Math.cos(math.radian(centerAngle)) * (outerRadius / 2)),
                    cy = centerY + (Math.sin(math.radian(centerAngle)) * (outerRadius / 2));

                var text = this.chart.text({
                    "font-size": this.chart.theme("pieInnerFontSize"),
                    fill: this.chart.theme("pieInnerFontColor"),
                    "text-anchor": "middle",
                    y: textY
                }, text);

                text.translate(cx, cy);

                g.append(text);
                g.order = 2;
            } else {
                var dist = this.chart.theme("pieOuterLineSize"),
                    r = outerRadius * this.chart.theme("pieOuterLineRate"),
                    cx = centerX + (Math.cos(math.radian(centerAngle)) * outerRadius),
                    cy = centerY + (Math.sin(math.radian(centerAngle)) * outerRadius),
                    tx = centerX + (Math.cos(math.radian(centerAngle)) * r),
                    ty = centerY + (Math.sin(math.radian(centerAngle)) * r),
                    ex = (isLeft) ? tx - dist : tx + dist;

                var path = this.svg.path({
                    fill: "transparent",
                    stroke: this.chart.theme("pieOuterLineColor"),
                    "stroke-width": 0.7
                });

                path.MoveTo(cx, cy)
                    .LineTo(tx, ty)
                    .LineTo(ex, ty);

                var text = this.chart.text({
                    "font-size": this.chart.theme("pieOuterFontSize"),
                    fill: this.chart.theme("pieOuterFontColor"),
                    "text-anchor": (isLeft) ? "end" : "start",
                    y: textY
                }, text);

                text.translate(ex + (isLeft ? -3 : 3), ty);

                g.append(text);
                g.append(path);
                g.order = 0;
            }

            return g;
        }

		this.drawUnit = function (index, data, g) {
			var obj = this.axis.c(index);

			var width = obj.width,
                height = obj.height,
                x = obj.x,
                y = obj.y,
                min = width;

			if (height < min) {
				min = height;
			}

			// center
			var centerX = width / 2 + x,
                centerY = height / 2 + y,
                outerRadius = min / 2;

			var target = this.brush.target,
                active = this.brush.active,
				all = 360,
				startAngle = 0,
				max = 0;

			for (var i = 0; i < target.length; i++) {
				max += data[target[i]];
			}

			for (var i = 0; i < target.length; i++) {
                var value = data[target[i]],
                    endAngle = all * (value / max);

                if (this.brush['3d']) {
                    var pie3d = this.drawPie3d(centerX, centerY, outerRadius, startAngle, endAngle, ColorUtil.darken(this.color(i), 0.5));
                    g.append(pie3d);
                }

				startAngle += endAngle;
			}

            startAngle = 0;

			for (var i = 0; i < target.length; i++) {
                var value = data[target[i]],
                    endAngle = all * (value / max),
                    centerAngle = startAngle + (endAngle / 2) - 90,
                    pie = this.drawPie(centerX, centerY, outerRadius, startAngle, endAngle, this.color(i)),
                    text = this.drawText(centerX, centerY, centerAngle, outerRadius, this.getFormatText(target[i], value, max));

                // 설정된 키 활성화
                if (active == target[i] || _.inArray(target[i], active) != -1) {
                    if(this.brush.showText == "inside") {
                        this.setActiveTextEvent(text.get(0), centerX, centerY, centerAngle, outerRadius, true);
                    }

                    this.setActiveEvent(pie, centerX, centerY, centerAngle);
                    cache_active[centerAngle] = true;
                }

                // 활성화 이벤트 설정
                if (this.brush.activeEvent != null) {
                    (function(p, t, cx, cy, ca, r) {
                        p.on(self.brush.activeEvent, function(e) {
                            if(!cache_active[ca]) {
                                if(self.brush.showText == "inside") {
                                    self.setActiveTextEvent(t, cx, cy, ca, r, true);
                                }

                                self.setActiveEvent(p, cx, cy, ca);
                                cache_active[ca] = true;
                            } else {
                                if(self.brush.showText == "inside") {
                                    self.setActiveTextEvent(t, cx, cy, ca, r, false);
                                }

                                p.translate(cx, cy);
                                cache_active[ca] = false;
                            }
                        });

                        p.attr({ cursor: "pointer" });
                    })(pie, text.get(0), centerX, centerY, centerAngle, outerRadius);
                }

                self.addEvent(pie, index, i);
                g.append(pie);
                g.append(text);

				startAngle += endAngle;
			}
		}

        this.drawBefore = function() {
            g = this.chart.svg.group();
        }

		this.draw = function() {
			this.eachData(function(data, i) {
				this.drawUnit(i, data, g);
			});

            return g;
		}
	}

    PieBrush.setup = function() {
        return {
            /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip: false,
            /** @cfg {String} [showText=null] Set the text appear. (outside or inside)  */
            showText: null,
            /** @cfg {Function} [format=null] Returns a value from the format callback function of a defined option. */
            format: null,
            /** @cfg {Boolean} [3d=false] check 3d support */
            "3d": false,
            /** @cfg {String|Array} [active=null] Activates the pie of an applicable property's name. */
            active: null,
            /** @cfg {String} [activeEvent=null]  Activates the pie in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null
        }
    }

	return PieBrush;
}, "chart.brush.core");

jui.define("chart.brush.donut", [ "util.base", "util.math", "util.color" ], function(_, math, ColorUtil) {

    /**
     * @class chart.brush.donut 
     * @extends chart.brush.pie
     * 
     */
	var DonutBrush = function() {
        var self = this,
            cache_active = {};

		this.drawDonut = function(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, attr) {
			attr['stroke-width'] = outerRadius - innerRadius;

            if (endAngle >= 360) { // bugfix : if angle is 360 , donut cang't show
                endAngle = 359.9999;
            }

			var g = this.chart.svg.group(),
				path = this.chart.svg.path(attr),
				dist = Math.abs(outerRadius - innerRadius);

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
				startY = obj.y;


			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));

			// 중심점 이동
			g.translate(centerX, centerY);

			// outer arc 그림
			path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y);

			g.append(path);
            g.order = 1;

			return g;
		}

		this.drawDonut3d = function(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, attr) {
			var g = this.chart.svg.group(),
				path = this.chart.svg.path(attr),
                dist = Math.abs(outerRadius - innerRadius);

            outerRadius += dist/2;
            innerRadius = outerRadius - dist;

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
				startY = obj.y;

			var innerObj = math.rotate(0, -innerRadius, math.radian(startAngle)),
				innerStartX = innerObj.x,
				innerStartY = innerObj.y;


			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));
			innerObj = math.rotate(innerStartX, innerStartY, math.radian(endAngle));

			// 중심점 이동
			g.translate(centerX, centerY);

			// outer arc 그림
			path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y);


            var y = obj.y + 10,
                x = obj.x + 5,
                innerY = innerObj.y + 10,
                innerX = innerObj.x + 5,
                targetX = startX + 5,
                targetY = startY + 10,
                innerTargetX = innerStartX + 5,
                innerTargetY = innerStartY + 10;

            path.LineTo(x, y);
            path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 0, targetX, targetY)
            path.ClosePath();
            g.append(path);

            // 안쪽 면 그리기
            var innerPath = this.chart.svg.path(attr);

            // 시작 하는 위치로 옮김
            innerPath.MoveTo(innerStartX, innerStartY);
            innerPath.Arc(innerRadius, innerRadius, 0, (endAngle > 180) ? 1 : 0, 1, innerObj.x, innerObj.y);
            innerPath.LineTo(innerX, innerY);
            innerPath.Arc(innerRadius, innerRadius, 0, (endAngle > 180) ? 1 : 0, 0, innerTargetX, innerTargetY);
            innerPath.ClosePath();

            g.append(innerPath);
            g.order = 1;

			return g;
		}

		this.drawDonut3dBlock = function(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, attr) {
			var g = this.chart.svg.group(),
				path = this.chart.svg.path(attr),
                dist = Math.abs(outerRadius - innerRadius);

            outerRadius += dist/2;
            innerRadius = outerRadius - dist;

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
				startY = obj.y;

			var innerObj = math.rotate(0, -innerRadius, math.radian(startAngle)),
				innerStartX = innerObj.x,
				innerStartY = innerObj.y;


			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));
			innerObj = math.rotate(innerStartX, innerStartY, math.radian(endAngle));

			// 중심점 이동
			g.translate(centerX, centerY);

            var y = obj.y + 10,
                x = obj.x + 5,
                innerY = innerObj.y + 10,
                innerX = innerObj.x + 5;

            // 왼쪽면 그리기
            var rect = this.chart.svg.path(attr);
            rect.MoveTo(obj.x, obj.y).LineTo(x, y).LineTo(innerX, innerY).LineTo(innerObj.x, innerObj.y).ClosePath();

            g.append(rect);
            g.order = 1;

			return g;
		}

        this.drawUnit = function (index, data, g) {
            var obj = this.axis.c(index);

            var width = obj.width,
                height = obj.height,
                x = obj.x,
                y = obj.y,
                min = width;

            if (height < min) {
                min = height;
            }
          
            if (this.brush.size >= min/2) {
              this.brush.size = min/4;
            }

            // center
            var centerX = width / 2 + x,
                centerY = height / 2 + y,
                outerRadius = min / 2 - this.brush.size / 2,
                innerRadius = outerRadius - this.brush.size;

            var target = this.brush.target,
                active = this.brush.active,
                all = 360,
                startAngle = 0,
                max = 0;

            for (var i = 0; i < target.length; i++) {
                max += data[target[i]];
            }

            if (this.brush['3d']) {
                // 화면 블럭 그리기
                for (var i = 0; i < target.length; i++) {
                    var value = data[target[i]],
                        endAngle = all * (value / max),
                        donut3d = this.drawDonut3dBlock(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                            fill : ColorUtil.darken(this.color(i), 0.5)
                        }, i == target.length - 1);
                    g.append(donut3d);

                    startAngle += endAngle;
                }

                startAngle = 0;
                for (var i = 0; i < target.length; i++) {
                    var value = data[target[i]],
                        endAngle = all * (value / max),
                        donut3d = this.drawDonut3d(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                            fill : ColorUtil.darken(this.color(i), 0.5)
                        }, i == target.length - 1);
                    g.append(donut3d);

                    startAngle += endAngle;
                }
            }

            startAngle = 0;

            for (var i = 0; i < target.length; i++) {
                var value = data[target[i]],
                    endAngle = all * (value / max),
                    centerAngle = startAngle + (endAngle / 2) - 90,
                    radius = (this.brush.showText == "inside") ? this.brush.size + innerRadius + outerRadius : outerRadius,
                    donut = this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                        stroke : this.color(i),
                        fill : 'transparent'
                    }),
                    text = this.drawText(centerX, centerY, centerAngle, radius, this.getFormatText(target[i], value));

                // 설정된 키 활성화
                if (active == target[i] || _.inArray(target[i], active) != -1) {
                    if(this.brush.showText == "inside") {
                        this.setActiveTextEvent(text.get(0), centerX, centerY, centerAngle, radius, true);
                    }

                    this.setActiveEvent(donut, centerX, centerY, centerAngle);
                    cache_active[centerAngle] = true;
                }

                // 활성화 이벤트 설정
                if (this.brush.activeEvent != null) {
                    (function (p, t, cx, cy, ca, r) {
                        p.on(self.brush.activeEvent, function (e) {
                            if (!cache_active[ca]) {
                                if(self.brush.showText == "inside") {
                                    self.setActiveTextEvent(t, cx, cy, ca, r, true);
                                }

                                self.setActiveEvent(p, cx, cy, ca);
                                cache_active[ca] = true;
                            } else {
                                if(self.brush.showText == "inside") {
                                    self.setActiveTextEvent(t, cx, cy, ca, r, false);
                                }

                                p.translate(cx, cy);
                                cache_active[ca] = false;
                            }
                        });

                        p.attr({ cursor: "pointer" });
                    })(donut, text.get(0), centerX, centerY, centerAngle, radius);
                }

                this.addEvent(donut, index, i);
                g.append(donut);
                g.append(text);

                startAngle += endAngle;
            }
        }
	}

	DonutBrush.setup = function() {
		return {
            /** @cfg {Number} [size=50] donut stroke width  */
			size: 50
		};
	}

	return DonutBrush;
}, "chart.brush.pie");

jui.define("chart.brush.scatter", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.scatter
     * @extends chart.brush.core
     */
    var ScatterBrush = function() {

        this.getSymbolType = function(key, value) {
            var symbol = this.brush.symbol,
                target = this.brush.target[key];

            if(_.typeCheck("function", symbol)) {
                var res = symbol.apply(this.chart, [ target, value ]);

                if (res == "triangle" || res == "cross" || res == "rectangle" || res == "rect" || res == "circle") {
                    return {
                        type : "default",
                        uri : res
                    };
                } else {
                    return {
                        type : "image",
                        uri : res
                    };
                }
            }

            return {
                type : "default",
                uri : symbol
            };
        }

        this.createScatter = function(pos, dataIndex, targetIndex, symbol) {
            var self = this,
                elem = null,
                w = h = this.brush.size;

            var color = this.color(dataIndex, targetIndex),
                borderColor = this.chart.theme("scatterBorderColor"),
                borderWidth = this.chart.theme("scatterBorderWidth");

            if(symbol.type == "image") {
                elem = this.chart.svg.image({
                    "xlink:href": symbol.uri,
                    width: w + borderWidth,
                    height: h + borderWidth,
                    x: pos.x - (w / 2) - borderWidth,
                    y: pos.y - (h / 2)
                });
            } else {
                if(symbol.uri == "triangle" || symbol.uri == "cross") {
                    elem = this.chart.svg.group({ width: w, height: h }, function() {
                        if(symbol.uri == "triangle") {
                            var poly = self.chart.svg.polygon();

                            poly.point(0, h)
                                .point(w, h)
                                .point(w / 2, 0);
                        } else {
                            self.chart.svg.line({ stroke: color, "stroke-width": borderWidth * 2, x1: 0, y1: 0, x2: w, y2: h });
                            self.chart.svg.line({ stroke: color, "stroke-width": borderWidth * 2, x1: 0, y1: w, x2: h, y2: 0 });
                        }
                    }).translate(pos.x - (w / 2), pos.y - (h / 2));
                } else {
                    if(symbol.uri == "rectangle" || symbol.uri == "rect") {
                        elem = this.chart.svg.rect({
                            width: w,
                            height: h,
                            x: pos.x - (w / 2),
                            y: pos.y - (h / 2)
                        });
                    } else {
                        elem = this.chart.svg.ellipse({
                            rx: w / 2,
                            ry: h / 2,
                            cx: pos.x,
                            cy: pos.y
                        });
                    }
                }

                if(symbol.uri != "cross") {
                    elem.attr({
                        fill: color,
                        stroke: borderColor,
                        "stroke-width": borderWidth
                    })
                    .hover(function () {
                        if(elem == self.activeScatter) return;

                        var opts = {
                            fill: self.chart.theme("scatterHoverColor"),
                            stroke: color,
                            "stroke-width": borderWidth * 2,
                            opacity: 1
                        };

                        if(self.brush.hoverSync) {
                            for(var i = 0; i < self.cachedSymbol[dataIndex].length; i++) {
                                opts.stroke = self.color(dataIndex, i);
                                self.cachedSymbol[dataIndex][i].attr(opts);
                            }
                        } else {
                            elem.attr(opts);
                        }
                    }, function () {
                        if(elem == self.activeScatter) return;

                        var opts = {
                            fill: color,
                            stroke: borderColor,
                            "stroke-width": borderWidth,
                            opacity: (self.brush.hide) ? 0 : 1
                        };

                        if(self.brush.hoverSync) {
                            for(var i = 0; i < self.cachedSymbol[dataIndex].length; i++) {
                                opts.fill = self.color(dataIndex, i);
                                self.cachedSymbol[dataIndex][i].attr(opts);
                            }
                        } else {
                            elem.attr(opts);
                        }
                    });
                }
            }

            return elem;
        }

        this.drawScatter = function(points) {
            // hoverSync 옵션 처리를 위한 캐싱 처리
            this.cachedSymbol = {};

            var self = this,
                g = this.chart.svg.group(),
                borderColor = this.chart.theme("scatterBorderColor"),
                borderWidth = this.chart.theme("scatterBorderWidth");

            for(var i = 0; i < points.length; i++) {
                for(var j = 0; j < points[i].length; j++) {
                    if(!this.cachedSymbol[j]) {
                        this.cachedSymbol[j] = [];
                    }

                    if(this.brush.hideZero && points[i].value[j] === 0) {
                        continue;
                    }

                    var data = {
                        x: points[i].x[j],
                        y: points[i].y[j],
                        max: points[i].max[j],
                        min: points[i].min[j],
                        value: points[i].value[j]
                    };

                    // 값이 null이나 undefined일 때, 그리지 않음
                    if(_.typeCheck([ "undefined", "null" ], data.value))
                        continue;

                    var symbol = this.getSymbolType(i, data.value),
                        p = this.createScatter(data, j, i, symbol),
                        d = this.brush.display;

                    // hoverSync 옵션을 위한 엘리먼트 캐싱
                    if(symbol.type == "default" && symbol.uri != "cross") {
                        this.cachedSymbol[j].push(p);
                    }

                    // Max & Min 툴팁 생성
                    if((d == "max" && data.max) || (d == "min" && data.min) || d == "all") {
                        g.append(this.drawTooltip(data.x, data.y, this.format(data.value)));
                    }

                    // 컬럼 및 기본 브러쉬 이벤트 설정
                    if(this.brush.activeEvent != null) {
                        (function(scatter, data, color, symbol) {
                            var x = data.x,
                                y = data.y,
                                text = self.format(data.value);

                            scatter.on(self.brush.activeEvent, function(e) {
                                if(symbol.type == "default" && symbol.uri != "cross") {
                                    if (self.activeScatter != null) {
                                        self.activeScatter.attr({
                                            fill: self.activeScatter.attributes["stroke"],
                                            stroke: borderColor,
                                            "stroke-width": borderWidth,
                                            opacity: (self.brush.hide) ? 0 : 1
                                        });
                                    }

                                    self.activeScatter = scatter;
                                    self.activeScatter.attr({
                                        fill: self.chart.theme("scatterHoverColor"),
                                        stroke: color,
                                        "stroke-width": borderWidth * 2,
                                        opacity: 1
                                    });
                                }

                                self.activeTooltip.html(text);
                                self.activeTooltip.translate(x, y);
                            });

                            scatter.attr({ cursor: "pointer" });
                        })(p, data, this.color(j, i), this.getSymbolType(i, data.value));
                    }

                    if(this.brush.hide) {
                        p.attr({ opacity: 0 });
                    }

                    this.addEvent(p, j, i);
                    g.append(p);
                }
            }

            // 액티브 툴팁
            this.activeTooltip = this.drawTooltip(0, 0, "");
            g.append(this.activeTooltip);

            return g;
        }

        this.drawTooltip = function(x, y, text) {
            return this.chart.text({
                y: -this.brush.size,
                "text-anchor" : "middle",
                fill : this.chart.theme("tooltipPointFontColor"),
                "font-size" : this.chart.theme("tooltipPointFontSize"),
                "font-weight" : this.chart.theme("tooltipPointFontWeight")
            }, text).translate(x, y);
        }

        this.draw = function() {
            return this.drawScatter(this.getXY());
        }

        this.drawAnimate = function() {
            var area = this.chart.area();

            return this.chart.svg.animateTransform({
                attributeName: "transform",
                type: "translate",
                from: area.x + " " + area.height,
                to: area.x + " " + area.y,
                begin: "0s" ,
                dur: "0.4s",
                repeatCount: "1"
            });
        }
    }

    ScatterBrush.setup = function() {
        return {
            /** @cfg {"circle"/"triangle"/"rectangle"/"cross"/"callback"} [symbol="circle"] Determines the shape of a (circle, rectangle, cross, triangle).  */
            symbol: "circle",
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7,
            /** @cfg {Boolean} [hide=false]  Hide the scatter, will be displayed only when the mouse is over. */
            hide: false,
            /** @cfg {Boolean} [hideZero=false]  When scatter value is zero, will be hidden. */
            hideZero: false,
            /** @cfg {Boolean} [hoverSync=false]  Over effect synchronization of all the target's symbol. */
            hoverSync: false,
            /** @cfg {String} [activeEvent=null]  Activates the scatter in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null,
            /** @cfg {"max"/"min"/"all"} [display=null]  Shows a tooltip on the scatter for the minimum/maximum value.  */
            display: null,
            /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip: false
        };
    }

    return ScatterBrush;
}, "chart.brush.core");
jui.define("chart.brush.scatterpath", ["util.base"], function(_) {

    /**
     * @class chart.brush.scatterpath
     * @extends chart.brush.core
     *
     */
	var ScatterPathBrush = function() {

        this.drawScatter = function(points) {
            //"use asm";
            var width = height = this.brush.size,
                color = this.color(0),
                strokeWidth = this.brush.strokeWidth;

            var opt = {
                fill : "none",
                stroke : color,
                "stroke-width" : strokeWidth,
                "stroke-opacity" : 1,
                "stroke-linecap" : "butt",
                "stroke-linejoin" : "round"
            };

            var g = this.chart.svg.group(),
                path = this.chart.svg.pathSymbol();

            var tpl = path.template(width, height);

            var count = 5;
            var list = [];

            for(var i = 1; i <= count; i++) {
                list[i] = this.chart.svg.pathSymbol(opt);
            }

            var loop = _.loop(points[0].x.length);

            for(var i = 0; i < points.length; i++) {
                var symbol = this.brush.symbol;

                loop(function(index, group) {
                    list[group].add(points[i].x[index]|0, points[i].y[index]|0, tpl[symbol]);
                })

            }

            for(var i = 1; i <= count; i++) {
                g.append(list[i]);
            }
            
            path.remove();

            return g;
        }

        this.draw = function() {
            return this.drawScatter(this.getXY(false));
        }
	}

    ScatterPathBrush.setup = function() {
        return {
            /** @cfg {"circle"/"triangle"/"rectangle"/"cross"} [symbol="circle"] Determines the shape of a starter (circle, rectangle, cross, triangle).  */
            symbol: "circle", // or triangle, rectangle, cross
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7,
            /** @cfg {Number} [strokeWidth=1] Set the line thickness of a starter. */
            strokeWidth : 1
        };
    }

	return ScatterPathBrush;
}, "chart.brush.core");
jui.define("chart.brush.bargauge", [], function() {

    /**
     * @class chart.brush.bargauge
     * @extends chart.brush.core
     */
	var BarGaugeBrush = function(chart, axis, brush) {

		this.draw = function() {
            var group = chart.svg.group();

            var obj = axis.c(0),
                width = obj.width,
                x = obj.x,
                y = obj.y;

			this.eachData(function(data, i) {
                var g = chart.svg.group(),
                    v = this.getValue(data, "value", 0),
                    t = this.getValue(data, "title", ""),
                    max = this.getValue(data, "max", 100),
                    min = this.getValue(data, "min", 0);

                var value = (width / (max - min)) * v,
                    textY = (y + brush.size / 2 + brush.cut) - 1;

                g.append(chart.svg.rect({
                    x : x + brush.cut,
                    y : y,
                    width: width,
                    height : brush.size,
                    fill : chart.theme("bargaugeBackgroundColor")
                }));
                
                g.append(chart.svg.rect({
                    x : x,
                    y : y,
                    width: value,
                    height : brush.size,
                    fill : chart.color(i)
                }));

                g.append(chart.text({
                    x : x + brush.cut,
                    y : textY,
                    "text-anchor" : "start",
                    "font-size" : chart.theme("bargaugeFontSize"),
                    fill : chart.theme("bargaugeFontColor")
                }, t));
                
                g.append(chart.text({
                    x : width - brush.cut,
                    y : textY,
                    "text-anchor" : "end",
                    "font-size" : chart.theme("bargaugeFontSize"),
                    fill : chart.theme("bargaugeFontColor")
                }, this.format(v, i)));

                this.addEvent(g, i, null);
                group.append(g);

                y += brush.size + brush.cut;
			});

            return group;
		}
	}

    BarGaugeBrush.setup = function() {
        return {
            /** @cfg {Number} [cut=5] Determines the spacing of a bar gauge. */
            cut: 5,
            /** @cfg {Number} [size=20] Determines the size of a bar gauge. */
            size: 20,
            /** @cfg {Function} [format=null] bar gauge format callback */
            format: null
        };
    }

	return BarGaugeBrush;
}, "chart.brush.core");

jui.define("chart.brush.circlegauge", [], function() {

    /**
     * @class chart.brush.circlegauge 
     * @extends chart.brush.core
     */
	var CircleGaugeBrush = function(chart, axis, brush) {
        var group;
        var w, centerX, centerY, outerRadius;

        this.drawUnit = function(i, data) {
            var obj = axis.c(i),
                value = this.getValue(data, "value", 0),
                max = this.getValue(data, "max", 100),
                min = this.getValue(data, "min", 0);

            var rate = (value - min) / (max - min),
                width = obj.width,
                height = obj.height,
                x = obj.x,
                y = obj.y;

            // center
            w = Math.min(width, height) / 2;
            centerX = width / 2 + x;
            centerY = height / 2 + y;
            outerRadius = w;

            group.append(chart.svg.circle({
                cx : centerX,
                cy : centerY,
                r : outerRadius,
                fill : chart.theme("gaugeBackgroundColor"),
                stroke : this.color(0),
                "stroke-width" : 2
            }));

            group.append(chart.svg.circle({
                cx : centerX,
                cy : centerY,
                r : outerRadius * rate,
                fill : this.color(0)
            }));

            this.addEvent(group, null, null);
        }
        
		this.draw = function() {
            group = chart.svg.group();

            this.eachData(function(data, i) {
                this.drawUnit(i, data);
            });

            return group;
		}
	}

    CircleGaugeBrush.setup = function() {
        return {
            /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip: false
        }
    }

	return CircleGaugeBrush;
}, "chart.brush.core");

jui.define("chart.brush.fillgauge", [ "util.base" ], function(_) {

	var FillGaugeBrush = function(chart, axis, brush) {
        var self = this;
        var w, centerX, centerY, outerRadius, clipId;
        var rect;

        function setDirection(direction) {
            var rate = (brush.value - brush.min) / (brush.max - brush.min);

            if (direction == "vertical") {
                var height = chart.area('height') * rate;
                var width = chart.area('width');
                var x = 0;
                var y = chart.area('height') - height;
            } else {		// horizontal
                var height = chart.area('height');
                var width = chart.area('width') * rate;
                var x = 0;
                var y = 0;
            }

            rect.attr({
                x : x,
                y : y,
                width : width,
                height : height
            });
        }

        function createPath(group, path) {
            group.append(chart.svg.path({
                x : 0,
                y : 0,
                fill : chart.theme("gaugeBackgroundColor"),
                d : path
            }));

            group.append(chart.svg.path({
                x : 0,
                y : 0,
                fill : self.color(0),
                d : path,
                "clip-path" : "url(#" + clipId + ")"
            }));
        }

        this.drawBefore = function() {
            var axis = axis || {};
            
            var obj = axis.c(),
                width = obj.width,
                height = obj.height,
                x = obj.x,
                y = obj.y,
                min = width;

            if (height < min) {
                min = height;
            }

            w = min / 2;
            centerX = width / 2 + x;
            centerY = height / 2 + y;
            outerRadius = w;
            clipId = _.createId("fill-gauge");

            var clip = chart.svg.clipPath({
                id : clipId
            });

            rect = chart.svg.rect({
                x : 0,
                y : 0,
                width : 0,
                height : 0
            });

            clip.append(rect);
            chart.defs.append(clip);
        }
		
		this.draw = function() {
			var group = chart.svg.group({
				opacity : 0.8
			});

			setDirection(brush.direction);

            if (brush.svg != "" || brush.path != "") {
                if (brush.svg != "") {
                    /*/
                    $.ajax({
                        url : brush.svg,
                        async : false,
                        success : function(xml) {
                            var path = $(xml).find("path").attr("d");
                            createPath(group, path);
                        }
                    });
                    /**/
                } else {
                    createPath(group, brush.path);
                }
            } else {
                if (brush.shape == "circle") {
                    group.append(chart.svg.circle({
                        cx : centerX,
                        cy : centerY,
                        r : outerRadius,
                        fill : chart.theme("gaugeBackgroundColor")
                    }));

                    group.append(chart.svg.circle({
                        cx : centerX,
                        cy : centerY,
                        r : outerRadius,
                        fill : chart.color(0, brush),
                        "clip-path" : "url(#" + clipId + ")"
                    }));

                } else if (brush.shape == "rectangle") {
                    group.append(chart.svg.rect({
                        x : 0,
                        y : 0,
                        width : chart.area('width'),
                        height : chart.area('height'),
                        fill : chart.theme("gaugeBackgroundColor")
                    }));

                    group.append(chart.svg.rect({
                        x : 0,
                        y : 0,
                        width : chart.area('width'),
                        height : chart.area('height'),
                        fill : this.color(0),
                        "clip-path" : "url(#" + clipId + ")"
                    }));

                }
            }

            return group;
		}
	}

    FillGaugeBrush.setup = function() {
        return {
            /** @cfg {Number} [min=0] Determines the minimum size of a fill gauge.*/
            min: 0,
            /** @cfg {Number} [max=100] Determines the maximum size of a fill gauge.*/
            max: 100,
            /** @cfg {Number} [value=0] Determines the value of a fill gauge. */
            value: 0,
            /** @cfg {String} [shape="circle"] Determines the shape of a fill gauge (circle, rectangle).*/
            shape: "circle", // or rectangle
            /** @cfg {String} [direction="vertical"] Determines the direction in which a fill gauge is to be filled (vertical, horizontal). */
            direction: "vertical",
            /** @cfg {String} [svg=""] Sets the shape of a fill gauge with a specified URL as an SVG tag. */
            svg: "",
            /** @cfg {String} [path=""] Sets the shape of a fill gauge with a specified pass tag.*/
            path: ""
        };
    }

	return FillGaugeBrush;
}, "chart.brush.core");

jui.define("chart.brush.area", [], function() {

    /**
     * @class chart.brush.area
     *
     * @extends chart.brush.line
     */
    var AreaBrush = function() {

        this.drawArea = function(path) {
            var g = this.chart.svg.group(),
                y = this.axis.y(this.brush.startZero ? 0 : this.axis.y.min());

            for(var k = 0; k < path.length; k++) {
                var children = this.createLine(path[k], k).children;

                for(var i = 0; i < children.length; i++) {
                    var p = children[i];

                    if (path[k].length > 0) {
                        p.LineTo(p.attr("x2"), y);
                        p.LineTo(p.attr("x1"), y);
                        p.ClosePath();
                    }

                    p.attr({
                        fill: p.attr("stroke"),
                        "fill-opacity": this.chart.theme("areaBackgroundOpacity"),
                        "stroke-width": 0
                    });

                    g.prepend(p);
                }

                if(this.brush.line) {
                    g.prepend(this.createLine(path[k], k));
                }

                this.addEvent(g, null, k);
            }

            return g;
        }

        this.draw = function() {
            return this.drawArea(this.getXY());
        }

        this.drawAnimate = function(root) {
            root.append(
                this.chart.svg.animate({
                     attributeName: "opacity",
                     from: "0",
                     to: "1",
                     begin: "0s" ,
                     dur: "1.5s",
                     repeatCount: "1",
                     fill: "freeze"
                 })
            );
        }
    }

    AreaBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step). */
            symbol: "normal", // normal, curve, step
            /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
            active: null,
            /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null,
            /** @cfg {"max"/"min"} [display=null]  Shows a tool tip on the bar for the minimum/maximum value.  */
            display: null,
            /** @cfg {Boolean} [startZero=true]  The end of the area is zero point. */
            startZero: true,
            /** @cfg {Boolean} [line=true]  Visible line */
            line: true
        };
    }

    return AreaBrush;
}, "chart.brush.line");

jui.define("chart.brush.stackline", [], function() {

	/**
	 * @class chart.brush.stackline
	 * @extends chart.brush.line
	 */
	var StackLineBrush = function() {
        this.draw = function() {
            return this.drawLine(this.getStackXY());
        }
	}

	return StackLineBrush;
}, "chart.brush.line");
jui.define("chart.brush.stackarea", [], function() {

	/**
	 * @class chart.brush.stackarea
	 * @extends chart.brush.area
	 */
	var StackAreaBrush = function() {
		this.draw = function() {
            return this.drawArea(this.getStackXY());
		}
	}

	return StackAreaBrush;
}, "chart.brush.area");

jui.define("chart.brush.stackscatter", [], function() {

	/**
	 * @class chart.brush.stackscatter
	 * @extends chart.brush.scatter
	 */
	var StackScatterBrush = function() {
        this.draw = function() {
            return this.drawScatter(this.getStackXY());
        }
	}

	return StackScatterBrush;
}, "chart.brush.scatter");
jui.define("chart.brush.gauge", [ "util.math" ], function(math) {

    /**
     * @class chart.brush.gauge 
     * @extends chart.brush.donut
     */
	var GaugeBrush = function() {
		var self = this;
        var w, centerX, centerY, outerRadius, innerRadius;

        function createText(startAngle, endAngle, min, max, value, unit) {
			var g = self.chart.svg.group({
				"class" : "gauge text"
			}).translate(centerX, centerY);

			g.append(self.chart.svg.text({
				x : 0,
				y : (self.brush.arrow) ? 70 : 10,
				"text-anchor" : "middle",
				"font-size" : "3em",
				"font-weight" : 1000,
				"fill" : self.color(0)
			}, value + ""));

			if (unit != "") {
				g.append(self.chart.text({
					x : 0,
					y : 100,
					"text-anchor" : "middle",
					"font-size" : "1.5em",
					"font-weight" : 500,
					"fill" : self.chart.theme("gaugeFontColor")
				}, unit))
			}

			// 바깥 지름 부터 그림
			var startX = 0;
			var startY = -outerRadius;

            // min
            var obj = math.rotate(startX, startY, math.radian(startAngle));

            startX = obj.x;
            startY = obj.y;

            g.append(self.chart.text({
                x : obj.x + 30,
                y : obj.y + 20,
                "text-anchor" : "middle",
				"fill" : self.chart.theme("gaugeFontColor")
            }, min + ""));

			// max
			// outer arc 에 대한 지점 설정
            var obj = math.rotate(startX, startY, math.radian(endAngle));
    
            g.append(self.chart.text({
                x : obj.x - 20,
                y : obj.y + 20,
                "text-anchor" : "middle",
				"fill" : self.chart.theme("gaugeFontColor")
            }, max + ""));

			return g;
		}

        this.drawBefore = function() {

        }

		this.drawUnit = function(index, data, group) {
			var obj = this.axis.c(index),
				value = this.getValue(data, "value", 0),
				max = this.getValue(data, "max", 100),
				min = this.getValue(data, "min", 0),
				unit = this.getValue(data, "unit");

			var startAngle = this.brush.startAngle;
			var endAngle = this.brush.endAngle;

			if (endAngle >= 360) {
				endAngle = 359.99999;
			}

			var rate = (value - min) / (max - min),
				currentAngle = endAngle * rate;

			if (currentAngle > endAngle) {
				currentAngle = endAngle;
			}

			var width = obj.width,
				height = obj.height,
				x = obj.x,
				y = obj.y;

			// center
			w = Math.min(width, height) / 2;
			centerX = width / 2 + x;
			centerY = height / 2 + y;
			outerRadius = w - this.brush.size/2;
			innerRadius = outerRadius - this.brush.size;

			group.append(this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle + currentAngle, endAngle - currentAngle, {
				fill : "transparent",
				stroke : this.chart.theme("gaugeBackgroundColor")
			}));


			group.append(this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle, currentAngle, {
				fill : "transparent",
				stroke : this.color(index)
			}));


			// startAngle, endAngle 에 따른 Text 위치를 선정해야함
			group.append(createText(startAngle, endAngle, min, max, value, unit));

			return group;
		}

		this.draw = function() {
			var group = this.chart.svg.group();

			this.eachData(function(data, i) {
				this.drawUnit(i, data, group);
			});

			return group;
		}
	}

	GaugeBrush.setup = function() {
		return {
            /** @cfg {Number} [size=30] Determines the stroke width of a gauge.  */
			size: 30,
            /** @cfg {Number} [startAngle=0] Determines the start angle(as start point) of a gauge. */
			startAngle: 0,
            /** @cfg {Number} [endAngle=360] Determines the end angle(as draw point) of a gauge. */
			endAngle: 360
		};
	}

	return GaugeBrush;
}, "chart.brush.donut");

jui.define("chart.brush.fullgauge", [ "util.math" ], function(math) {

	/**
	 * @class chart.brush.fullgauge
	 * @extends chart.brush.donut
	 */
	var FullGaugeBrush = function() {
		var self = this;
        var group, w, centerX, centerY, outerRadius, innerRadius, textScale;

		function createText(value, index) {
			var g = self.chart.svg.group().translate(centerX, centerY),
				size = self.chart.theme("gaugeFontSize");

            g.append(self.chart.text({
                "text-anchor" : "middle",
                "font-size" : size,
                "font-weight" : self.chart.theme("gaugeFontWeight"),
                "fill" : self.color(index),
                y: size / 3
            }, self.format(value, index)).scale(textScale));

			return g;
		}

        function createTitle(title, index, dx, dy) {
            var g = self.chart.svg.group().translate(centerX + dx, centerY + dy),
                anchor = (dx == 0) ? "middle" : ((dx < 0) ? "end" : "start"),
				color = self.chart.theme("gaugeTitleFontColor"),
				size = self.chart.theme("gaugeTitleFontSize");

            g.append(self.chart.text({
                "text-anchor" : anchor,
                "font-size" : size,
                "font-weight" : self.chart.theme("gaugeTitleFontWeight"),
                fill : (!color) ? self.color(index) : color,
                y: size / 3
            }, title).scale(textScale));

            return g;
        }

		this.drawUnit = function(index, data) {
			var obj = this.axis.c(index),
				value = this.getValue(data, "value", 0),
                title = this.getValue(data, "title"),
				max = this.getValue(data, "max", 100),
				min = this.getValue(data, "min", 0);

			var startAngle = this.brush.startAngle;
			var endAngle = this.brush.endAngle;

			if (endAngle >= 360) {
				endAngle = 359.99999;
			}

			var rate = (value - min) / (max - min),
				currentAngle = endAngle * rate;

			if (currentAngle > endAngle) {
				currentAngle = endAngle;
			}

			var width = obj.width,
				height = obj.height,
				x = obj.x,
				y = obj.y;

			// center
			w = Math.min(width, height) / 2;
			centerX = width / 2 + x;
			centerY = height / 2 + y;
			outerRadius = w - this.brush.size;
			innerRadius = outerRadius - this.brush.size;
            textScale = math.scaleValue(w, 40, 400, 1, 1.5);

			group.append(this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle + currentAngle, endAngle - currentAngle, {
				stroke : this.chart.theme("gaugeBackgroundColor"),
				fill : "transparent"
			}));

			group.append(this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle, currentAngle, {
				stroke : this.color(index),
				fill : "transparent"
			}));

            if(this.brush.showText) {
                group.append(createText(value, index));
            }

            if(title != "") {
                group.append(createTitle(title, index, this.brush.titleX, this.brush.titleY));
            }

			return group;
		}

		this.draw = function() {
			group = this.chart.svg.group();

			this.eachData(function(data, i) {
				this.drawUnit(i, data);
			});

			return group;
		}
	}

	FullGaugeBrush.setup = function() {
		return {
			/** @cfg {Number} [size=30] Determines the stroke width of a gauge.  */
			size: 60,
			/** @cfg {Number} [startAngle=0] Determines the start angle(as start point) of a gauge. */
			startAngle: 0,
			/** @cfg {Number} [endAngle=360] Determines the end angle(as draw point) of a gauge. */
			endAngle: 360,
			/** @cfg {Boolean} [showText=true] */
            showText: true,
			/** @cfg {Number} [titleX=0] */
            titleX: 0,
			/** @cfg {Number} [titleY=0]  */
            titleY: 0,
			/** @cfg {Function} [format=null] */
            format: null
		};
	}

	return FullGaugeBrush;
}, "chart.brush.donut");

jui.define("chart.brush.stackgauge", [ "util.math" ], function(math) {

	/**
	 * @class chart.brush.stackgauge
	 * @extends chart.brush.donut
	 */
	var StackGaugeBrush = function(chart, axis, brush) {
        var w, centerX, centerY, outerRadius;

		this.drawBefore = function() {
			if (!axis.c) {
				axis.c = function() {
					return {
						x : 0,
						y : 0,
						width : chart.area("width"),
						height : chart.area("height")
					};
				}
			}

			var obj = axis.c(),
				width = obj.width,
				height = obj.height,
				x = obj.x,
				y = obj.y,
				min = width;

			if (height < min) {
				min = height;
			}

			w = min / 2;
			centerX = width / 2 + x;
			centerY = height / 2 + y;
			outerRadius = w;
		}

		this.draw = function() {
			var group = chart.svg.group();
			
			this.eachData(function(data, i) {
				var rate = (data[brush.target] - brush.min) / (brush.max - brush.min),
                    currentAngle = (brush.endAngle) * rate,
                    innerRadius = outerRadius - brush.size + brush.cut;
				
				if (brush.endAngle >= 360) {
                    brush.endAngle = 359.99999;
				}
				
				// 빈 공간 그리기 
				var g = this.drawDonut(centerX, centerY, innerRadius, outerRadius, brush.startAngle + currentAngle, brush.endAngle - currentAngle, {
					fill : chart.theme("gaugeBackgroundColor")
				});
	
				group.append(g);
				
				// 채워진 공간 그리기 
				g = this.drawDonut(centerX, centerY, innerRadius, outerRadius, brush.startAngle, currentAngle,{
					fill : this.color(i)
				}, true);
	
				group.append(g);
				
				// draw text 
				group.append(chart.text({
					x : centerX + 2,
					y : centerY + Math.abs(outerRadius) - 5,
					fill : this.color(i),
					"font-size" : "12px",
					"font-weight" : "bold"
				}, data[brush.title] || ""))
				
				outerRadius -= brush.size;
			});

            return group;
		}
	}

	StackGaugeBrush.setup = function() {
		return {
			/** @cfg {Number} [min=0] Determines the minimum value of a stack gauge.*/
			min: 0,
			/** @cfg {Number} [max=100] Determines the maximum value of a stack gauge.*/
			max: 100,
			/** @cfg {Number} [cut=5] Determines the bar spacing of a stack gauge.*/
			cut: 5,
			/** @cfg {Number} [size=24] Determines the bar size of a stack gauge.*/
			size: 24,
			/** @cfg {Number} [startAngle=-180] Determines the start angle of a stack gauge.*/
			startAngle: -180,
			/** @cfg {Number} [endAngle=360] Determines the end angle of a stack gauge.*/
			endAngle: 360,
			/** @cfg {String} [title="title"] Sets a data key to be configured as the title of a stack gauge.*/
			title: "title"
		};
	}

	return StackGaugeBrush;
}, "chart.brush.donut");

jui.define("chart.brush.waterfall", [], function() {

	/**
	 * @class chart.brush.waterfall
	 * @extends chart.brush.core
	 */
	var WaterFallBrush = function(chart, axis, brush) {
		var g, count, zeroY, width, columnWidth, half_width;
		var outerPadding;

		this.drawBefore = function() {
			g = chart.svg.group();

            outerPadding = brush.outerPadding;
			count = this.listData().length;
			zeroY = axis.y(0);

			width = axis.x.rangeBand();
			half_width = (width - outerPadding * 2);
			columnWidth = (width - outerPadding * 2 - (brush.target.length - 1)) / brush.target.length;
		}

		this.draw = function() {
			var target = brush.target[0],
				stroke = chart.theme("waterfallLineColor");

			this.eachData(function(data, i) {
				var startX = this.offset("x", i) - half_width / 2,
					startY = axis.y(data[target]),
					r = null, l = null;

				if(i == 0 || (i == count - 1 && brush.end)) {
					var color = chart.theme("waterfallEdgeBackgroundColor");

					if (startY <= zeroY) {
						r = chart.svg.rect({
							x: startX,
							y: startY,
							width: columnWidth,
							height: Math.abs(zeroY - startY),
							fill: color
						});
					} else {
						r = chart.svg.rect({
							x: startX,
							y: zeroY,
							width: columnWidth,
							height: Math.abs(zeroY - startY),
							fill: color
						});
					}
				} else {
					var preValue = this.getData(i - 1)[target],
						nowValue = data[target],
						preStartY = axis.y(preValue),
						nowStartY = axis.y(nowValue),
						h = preStartY - nowStartY;

					if(h > 0) {
						r = chart.svg.rect({
							x: startX,
							y: preStartY - h,
							width: columnWidth,
							height: Math.abs(h),
							fill: chart.theme("waterfallBackgroundColor")
						});
					} else {
						r = chart.svg.rect({
							x: startX,
							y: preStartY,
							width: columnWidth,
							height: Math.abs(h),
							fill: chart.theme("waterfallInvertBackgroundColor")
						});
					}

					if(brush.line) {
						l = chart.svg.line({
							x1: startX - outerPadding * 2,
							y1: nowStartY + h,
							x2: startX,
							y2: nowStartY + h,
							stroke: stroke,
							"stroke-width": 1,
							"stroke-dasharray": chart.theme("waterfallLineDashArray")
						});

						g.append(l);
					}
				}

				this.addEvent(r, i, 0);
				g.append(r);

				startX += columnWidth;
			});

            return g;
		}
	}

	WaterFallBrush.setup = function() {
		return {
			/** @cfg {Boolean} [line=true] Connects with a line between columns of a waterfall.*/
			line: true,
			/** @cfg {Boolean} [end=false] Sets effects for the last column of a waterfall.*/
			end: false,
			/** @cfg {Boolean} [outerPadding=5] Determines the outer margin of a waterfall.*/
			outerPadding: 5
		};
	}

	return WaterFallBrush;
}, "chart.brush.core");

jui.define("chart.brush.splitline", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.splitline
     * @extends chart.brush.core
     */
	var SplitLineBrush = function() {
        this.createLine = function(pos, index) {
            var opts = {
                stroke: this.color(index),
                "stroke-width": this.chart.theme("lineBorderWidth"),
                fill: "transparent"
            };

            var split = this.brush.split,
                symbol = this.brush.symbol;

            var x = pos.x,
                y = pos.y,
                px, py; // curve에서 사용함

            var g = this.chart.svg.group(),
                p = this.chart.svg.path(opts).MoveTo(x[0], y[0]);

            if(symbol == "curve") {
                px = this.curvePoints(x);
                py = this.curvePoints(y);
            }

            for(var i = 0; i < x.length - 1; i++) {
                if(g.children.length == 0) {
                    if ((_.typeCheck("integer", split) && i == split) ||
                        (_.typeCheck("date", split) && this.axis.x.invert(x[i]).getTime() >= split.getTime())) {
                        var color = this.chart.theme("lineSplitBorderColor"),
                            opacity = this.chart.theme("lineSplitBorderOpacity");

                        g.append(p);

                        opts["stroke"] = (color != null) ? color : opts["stroke"];
                        opts["stroke-opacity"] = opacity;

                        p = this.chart.svg.path(opts).MoveTo(x[i], y[i]);
                    }
                }

                if(symbol == "step") {
                    var sx = x[i] + ((x[i + 1] - x[i]) / 2);

                    p.LineTo(sx, y[i]);
                    p.LineTo(sx, y[i + 1]);
                }

                if(symbol != "curve") {
                    p.LineTo(x[i + 1], y[i + 1]);
                } else {
                    p.CurveTo(px.p1[i], py.p1[i], px.p2[i], py.p2[i], x[i + 1], y[i + 1]);
                }
            }

            g.append(p);

            return g;
        }

        this.drawLine = function(path) {
            var g = this.chart.svg.group();

            for(var k = 0; k < path.length; k++) {
                var p = this.createLine(path[k], k);

                this.addEvent(p, null, k);
                g.append(p);
            }

            return g;
        }

        this.draw = function() {
            return this.drawLine(this.getXY());
        }
	}

    SplitLineBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step).  */
            symbol: "normal", // normal, curve, step
            /** @cfg {Number} [split=null] Sets the style of a line of a specified index value.  */
            split: null
        };
    }

	return SplitLineBrush;
}, "chart.brush.core");
jui.define("chart.brush.splitarea", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.splitarea
     * @extends chart.brush.splitline
     */
    var SplitAreaBrush = function() {

        this.drawArea = function(path) {
            var g = this.chart.svg.group(),
                maxY = this.chart.area('height'),
                split = this.brush.split,
                splitColor = this.chart.theme("areaSplitBackgroundColor");

            for(var k = 0; k < path.length; k++) {
                var opts = {
                    fill: this.color(k),
                    "fill-opacity": this.chart.theme("areaBackgroundOpacity"),
                    "stroke-width": 0
                };

                var line = this.createLine(path[k], k),
                    xList = path[k].x;

                // 날짜일 경우, 해당 인덱스를 구해야 함
                if(_.typeCheck("date", split)) {
                    for(var i = 0; i < xList.length - 1; i++) {
                        if(this.axis.x.invert(xList[i]).getTime() >= split.getTime()) {
                            split = i;
                            break;
                        }
                    }
                }

                line.each(function(i, p) {
                    if(i == 0) {
                        split = (split != null) ? split : xList.length - 1;

                        p.LineTo(xList[split], maxY);
                        p.LineTo(xList[0], maxY);
                        p.attr(opts);
                    } else {
                        opts["fill"] = splitColor;

                        p.LineTo(xList[xList.length - 1], maxY);
                        p.LineTo(xList[split], maxY);
                        p.attr(opts);
                    }

                    p.ClosePath();
                });

                this.addEvent(line, null, k);
                g.prepend(line);

                // Add line
                if(this.brush.line) {
                    g.prepend(this.createLine(path[k], k));
                }
            }

            return g;
        }

        this.draw = function() {
            return this.drawArea(this.getXY());
        }
    }

    SplitAreaBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step).  */
            symbol: "normal", // normal, curve, step
            /** @cfg {Number} [split=null] Sets the style of a line of a specified index value.  */
            split: null,
            /** @cfg {Boolean} [line=true]  Visible line */
            line: true
        };
    }

    return SplitAreaBrush;
}, "chart.brush.splitline");

jui.define("chart.brush.rangecolumn", [], function() {

    /**
     * @class chart.brush.rangecolumn 
     * @extends chart.brush.core
     */
	var RangeColumnBrush = function(chart, axis, brush) {
		var g, width, columnWidth, half_width;
		var outerPadding, innerPadding;
		var borderColor, borderWidth, borderOpacity;

		this.drawBefore = function() {
			g = chart.svg.group();

            outerPadding = brush.outerPadding;
            innerPadding = brush.innerPadding;

			width = axis.x.rangeBand();
			half_width = (width - outerPadding * 2);
			columnWidth = (width - outerPadding * 2 - (brush.target.length - 1) * innerPadding) / brush.target.length;

			borderColor = chart.theme("columnBorderColor");
			borderWidth = chart.theme("columnBorderWidth");
			borderOpacity = chart.theme("columnBorderOpacity");
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var startX = this.offset("x", i) - (half_width / 2);

				for(var j = 0; j < brush.target.length; j++) {
					var value = data[brush.target[j]],
						startY = axis.y(value[1]),
						zeroY = axis.y(value[0]);

					var r = chart.svg.rect({
						x : startX,
						y : startY,
						width : columnWidth,
						height : Math.abs(zeroY - startY),
						fill : this.color(j),
						stroke : borderColor,
						"stroke-width" : borderWidth,
						"stroke-opacity" : borderOpacity
					});

                    this.addEvent(r, i, j);
                    g.append(r);

					startX += columnWidth + innerPadding;
				}
			});

            return g;
		}
	}

	RangeColumnBrush.setup = function() {
		return {
            /** @cfg {Number} [outerPadding=2] Determines the outer margin of a column. */
            outerPadding: 2,
            /** @cfg {Number} [innerPadding=1] Determines the inner margin of a column. */
            innerPadding: 1
		};
	}

	return RangeColumnBrush;
}, "chart.brush.core");

jui.define("chart.brush.rangebar", [], function() {

    /**
     * @class chart.brush.rangebar 
     * @extends chart.brush.core
     */
	var RangeBarBrush = function(chart, axis, brush) {
		var g, height, half_height, barHeight;
		var outerPadding, innerPadding;
		var borderColor, borderWidth, borderOpacity;

		this.drawBefore = function() {
			g = chart.svg.group();

            outerPadding = brush.outerPadding;
            innerPadding = brush.innerPadding;

			height = axis.y.rangeBand();
			half_height = height - (outerPadding * 2);
			barHeight = (half_height - (brush.target.length - 1) * innerPadding) / brush.target.length;

			borderColor = chart.theme("barBorderColor");
			borderWidth = chart.theme("barBorderWidth");
			borderOpacity = chart.theme("barBorderOpacity");
		}

		this.draw = function() {
			this.eachData(function(data, i) {
				var group = chart.svg.group(),
					startY = this.offset("y", i) - (half_height / 2);

				for(var j = 0; j < brush.target.length; j++) {
					var value = data[brush.target[j]],
						startX = axis.x(value[1]),
						zeroX = axis.x(value[0]);

					var r = chart.svg.rect({
						x : zeroX,
						y : startY,
						height : barHeight,
						width : Math.abs(zeroX - startX),
						fill : this.color(j),
						stroke : borderColor,
						"stroke-width" : borderWidth,
						"stroke-opacity" : borderOpacity
					});

                    this.addEvent(r, i, j);
                    group.append(r);

					startY += barHeight + innerPadding;
				}
				
				g.append(group);
			});

            return g;
		}
	}

	RangeBarBrush.setup = function() {
		return {
            /** @cfg {Number} [outerPadding=2] Determines the outer margin of a bar. */
			outerPadding: 2,
            /** @cfg {Number} [innerPadding=1] Determines the inner margin of a bar. */
			innerPadding: 1
		};
	}

	return RangeBarBrush;
}, "chart.brush.core");

jui.define("chart.topology.edge", [], function() {

    /**
     * @class chart.topology.edge
     *
     */
    var TopologyEdge = function(start, end, in_xy, out_xy, scale) {
        var connect = false, element = null;

        this.key = function() {
            return start + ":" + end;
        }

        this.reverseKey = function() {
            return end + ":" + start;
        }

        this.connect = function(is) {
            if(arguments.length == 0) {
                return connect;
            }

            connect = is;
        }

        this.element = function(elem) {
            if(arguments.length == 0) {
                return element;
            }

            element = elem;
        }

        this.set = function(type, value) {
            if(type == "start") start = value;
            else if(type == "end") end = value;
            else if(type == "in_xy") in_xy = value;
            else if(type == "out_xy") out_xy = value;
            else if(type == "scale") scale = value;
        }

        this.get = function(type) {
            if(type == "start") return start;
            else if(type == "end") return end;
            else if(type == "in_xy") return in_xy;
            else if(type == "out_xy") return out_xy;
            else if(type == "scale") return scale;
        }
    }

    return TopologyEdge;
});

jui.define("chart.topology.edgemanager", [ "util.base" ], function(_) {

    /**
     * @class chart.topology.edgemanager
     *
     */
    var TopologyEdgeManager = function() {
        var list = [],
            cache = {};

        this.add = function(edge) {
            cache[edge.key()] = edge;
            list.push(edge);
        }

        this.get = function(key) {
            return cache[key];
        }

        this.is = function(key) {
            return (cache[key]) ? true : false;
        }

        this.list = function() {
            return list;
        }

        this.each = function(callback) {
            if(!_.typeCheck("function", callback)) return;

            for(var i = 0; i < list.length; i++) {
                callback.call(this, list[i]);
            }
        }
    }

    return TopologyEdgeManager;
});

jui.define("chart.brush.topologynode",
    [ "util.base", "util.math", "chart.topology.edge", "chart.topology.edgemanager" ],
    function(_, math, Edge, EdgeManager) {

    /**
     * @class chart.brush.topologynode
     * @extends chart.brush.core
     */
    var TopologyNode = function() {
        var self = this,
            edges = new EdgeManager(),
            g, tooltip, point,
            textY = 14, padding = 7, anchor = 7,
            activeEdges = [];  // 선택된 엣지 객체

        function getDistanceXY(x1, y1, x2, y2, dist) {
            var a = x1 - x2,
                b = y1 - y2,
                c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
                dist = (!dist) ? 0 : dist,
                angle = math.angle(x1, y1, x2, y2);

            return {
                x: x1 + Math.cos(angle) * (c + dist),
                y: y1 + Math.sin(angle) * (c + dist),
                angle: angle,
                distance: c
            }
        }

        function getNodeData(key) {
            for(var i = 0; i < self.axis.data.length; i++) {
                var d = self.axis.data[i],
                    k = self.getValue(d, "key");

                if(k == key) {
                    return self.axis.data[i];
                }
            }

            return null;
        }

        function getEdgeData(key) {
            for(var i = 0; i < self.brush.edgeData.length; i++) {
                if(self.brush.edgeData[i].key == key) {
                    return self.brush.edgeData[i];
                }
            }

            return null;
        }

        function getTooltipData(edge) {
            for(var j = 0; j < self.brush.edgeData.length; j++) {
                if(edge.key() == self.brush.edgeData[j].key) {
                    return self.brush.edgeData[j];
                }
            }

            return null;
        }

        function getTooltipTitle(key) {
            var names = [],
                keys = key.split(":");

            self.eachData(function(data, i) {
                var title = _.typeCheck("function", self.brush.nodeTitle) ? self.brush.nodeTitle.call(self.chart, data) : "";

                if(data.key == keys[0]) {
                    names[0] = title || data.key;
                }

                if(data.key == keys[1]) {
                    names[1] = title || data.key;
                }
            });

            if(names.length > 0) return names;
            return key;
        }

        function getNodeRadius(data) {
            var r = self.chart.theme("topologyNodeRadius"),
                scale = 1;

            if(_.typeCheck("function", self.brush.nodeScale) && data) {
                scale = self.brush.nodeScale.call(self.chart, data);
                r = r * scale;
            }

            return {
                r: r,
                scale: scale
            }
        }

        function getEdgeOpacity(data) {
            var opacity = self.chart.theme("topologyEdgeOpacity");

            if(_.typeCheck("function", self.brush.edgeOpacity) && data) {
                opacity = self.brush.edgeOpacity.call(self.chart, data);
            }

            return opacity;
        }

        function createNodes(index, data) {
            var key = self.getValue(data, "key"),
                xy = self.axis.c(index),
                color = self.color(index, 0),
                title = _.typeCheck("function", self.brush.nodeTitle) ? self.brush.nodeTitle.call(self.chart, data) : "",
                text =_.typeCheck("function", self.brush.nodeText) ? self.brush.nodeText.call(self.chart, data) : "",
                size = getNodeRadius(data);

            var node = self.svg.group({
                index: index
            }, function() {
                if(_.typeCheck("function", self.brush.nodeImage)) {
                    self.svg.image({
                        "xlink:href": self.brush.nodeImage.call(self.chart, data),
                        width: (size.r * 2) * xy.scale,
                        height: (size.r * 2) * xy.scale,
                        x: -size.r,
                        y: -size.r,
                        cursor: "pointer"
                    });
                } else {
                    self.svg.circle({
                        "class": "circle",
                        r: size.r * xy.scale,
                        fill: color,
                        cursor: "pointer"
                    });
                }

                if(text && text != "") {
                    var fontSize = self.chart.theme("topologyNodeFontSize");

                    self.chart.text({
                        "class": "text",
                        x: 0.1 * xy.scale,
                        y: (size.r / 2) * xy.scale,
                        fill: self.chart.theme("topologyNodeFontColor"),
                        "font-size": fontSize * size.scale * xy.scale,
                        "text-anchor": "middle",
                        cursor: "pointer"
                    }, text);
                }

                if(title && title != "") {
                    self.chart.text({
                        "class": "title",
                        x: 0.1 * xy.scale,
                        y: (size.r + 13) * xy.scale,
                        fill: self.chart.theme("topologyNodeTitleFontColor"),
                        "font-size": self.chart.theme("topologyNodeTitleFontSize") * xy.scale,
                        "font-weight": "bold",
                        "text-anchor": "middle",
                        cursor: "pointer"
                    }, title);
                }
            }).translate(xy.x, xy.y);

            node.on(self.brush.activeEvent, function(e) {
                onNodeActiveHandler(data);
                self.chart.emit("topology.nodeclick", [ data, e ]);
            });

            // 맨 앞에 배치할 노드 체크
            if(self.axis.cache.nodeKey == key) {
                node.order = 1;
            }

            // 노드에 공통 이벤트 설정
            self.addEvent(node, index, null);

            return node;
        }

        function createEdges() {
            edges.each(function(edge) {
                var in_xy = edge.get("in_xy"),
                    out_xy = edge.get("out_xy");

                var node = self.svg.group();
                node.append(createEdgeLine(edge, in_xy, out_xy));
                node.append(createEdgeText(edge, in_xy, out_xy));

                g.append(node);
            });
        }

        function createEdgeLine(edge, in_xy, out_xy) {
            var g = self.svg.group(),
                size = self.chart.theme("topologyEdgeWidth"),
                opacity = getEdgeOpacity(getEdgeData(edge.key()));

            if(!edge.connect()) {
                g.append(self.svg.line({
                    cursor: "pointer",
                    x1: in_xy.x,
                    y1: in_xy.y,
                    x2: out_xy.x,
                    y2: out_xy.y,
                    stroke: self.chart.theme("topologyEdgeColor"),
                    "stroke-width": size * edge.get("scale"),
                    "stroke-opacity": opacity,
                    "shape-rendering": "geometricPrecision"
                }));
            } else {
                var reverseElem = edges.get(edge.reverseKey()).element();

                reverseElem.get(0).attr({ "stroke-opacity": opacity });
                reverseElem.get(1).attr({ "fill-opacity": opacity });
            }

            g.append(self.svg.circle({
                fill: self.chart.theme("topologyEdgeColor"),
                "fill-opacity": opacity,
                stroke: self.chart.theme("backgroundColor"),
                "stroke-width": (size * 2) * edge.get("scale"),
                r: point * edge.get("scale"),
                cx: out_xy.x,
                cy: out_xy.y
            }));

            g.on(self.brush.activeEvent, function(e) {
                onEdgeActiveHandler(edge);
            });

            g.on("mouseover", function(e) {
                onEdgeMouseOverHandler(edge);
            });

            g.on("mouseout", function(e) {
                onEdgeMouseOutHandler(edge);
            });

            edge.element(g);

            return g;
        }

        function createEdgeText(edge, in_xy, out_xy) {
            var text = null;
            var edgeAlign = (out_xy.x > in_xy.x) ? "end" : "start",
                edgeData = getEdgeData(edge.key());

            if(edgeData != null) {
                var edgeText = _.typeCheck("function", self.brush.edgeText) ? self.brush.edgeText.call(self.chart, edgeData, edgeAlign) : null;

                if (edgeText != null) {
                    if (edgeAlign == "end") {
                        text = self.svg.text({
                            x: out_xy.x - 9,
                            y: out_xy.y + 13,
                            cursor: "pointer",
                            fill: self.chart.theme("topologyEdgeFontColor"),
                            "font-size": self.chart.theme("topologyEdgeFontSize") * edge.get("scale"),
                            "text-anchor": edgeAlign
                        }, edgeText)
                            .rotate(math.degree(out_xy.angle), out_xy.x, out_xy.y);
                    } else {
                        text = self.svg.text({
                            x: out_xy.x + 8,
                            y: out_xy.y - 7,
                            cursor: "pointer",
                            fill: self.chart.theme("topologyEdgeFontColor"),
                            "font-size": self.chart.theme("topologyEdgeFontSize") * edge.get("scale"),
                            "text-anchor": edgeAlign
                        }, edgeText)
                            .rotate(math.degree(in_xy.angle), out_xy.x, out_xy.y);
                    }

                    text.on(self.brush.activeEvent, function (e) {
                        onEdgeActiveHandler(edge);
                    });

                    text.on("mouseover", function (e) {
                        onEdgeMouseOverHandler(edge);
                    });

                    text.on("mouseout", function (e) {
                        onEdgeMouseOutHandler(edge);
                    });
                }
            }

            return text;
        }

        function setDataEdges(index, targetIndex) {
            var data = self.getData(index),
                key = self.getValue(data, "key"),
                targetKey = self.getValue(data, "outgoing", [])[targetIndex];

            // 자신의 키와 동일한지 체크
            if(key == targetKey) return;

            var targetData = getNodeData(targetKey),
                target = self.axis.c(targetKey),
                xy = self.axis.c(index),
                in_dist = (getNodeRadius(data).r + point + 1) * xy.scale,
                out_dist = (getNodeRadius(targetData).r + point + 1) * xy.scale,
                in_xy = getDistanceXY(target.x, target.y, xy.x, xy.y, -in_dist),
                out_xy = getDistanceXY(xy.x, xy.y, target.x, target.y, -out_dist),
                edge = new Edge(key, targetKey, in_xy, out_xy, xy.scale);

            if(edges.is(edge.reverseKey())) {
                edge.connect(true);
            }

            edges.add(edge);
        }

        function showTooltip(edge, e) {
            if(!_.typeCheck("function", self.brush.tooltipTitle) ||
                !_.typeCheck("function", self.brush.tooltipText)) return;

            var rect = tooltip.get(0),
                text = tooltip.get(1);

            // 텍스트 초기화
            rect.attr({ points: "" });
            text.element.textContent = "";

            var edge_data = getTooltipData(edge),
                in_xy = edge.get("in_xy"),
                out_xy = edge.get("out_xy"),
                align = (out_xy.x > in_xy.x) ? "end" : "start";

            // 커스텀 이벤트 발생
            self.chart.emit("topology.edgeclick", [ edge_data, e ]);

            if(edge_data != null) {
                // 엘리먼트 생성 및 추가
                var title = document.createElementNS("http://www.w3.org/2000/svg", "tspan"),
                    contents = document.createElementNS("http://www.w3.org/2000/svg", "tspan"),
                    y = (padding * 2) + ((align == "end") ? anchor : 0);

                text.element.appendChild(title);
                text.element.appendChild(contents);

                title.setAttribute("x", padding);
                title.setAttribute("y", y);
                title.setAttribute("font-weight", "bold");
                title.textContent = self.brush.tooltipTitle.call(self.chart, getTooltipTitle(edge_data.key), align);

                contents.setAttribute("x", padding);
                contents.setAttribute("y", y + textY + (padding / 2));
                contents.textContent = self.brush.tooltipText.call(self.chart, edge_data, align);

                // 엘리먼트 위치 설정
                var size = text.size(),
                    w = size.width + padding * 2,
                    h = size.height + padding * 2,
                    x = out_xy.x - (w / 2) + (anchor / 2) + (point / 2);

                text.attr({ x: w / 2 });
                rect.attr({ points: self.balloonPoints((align == "end") ? "bottom" : "top", w, h, anchor) });
                tooltip.attr({ visibility: "visible" });

                if(align == "end") {
                    tooltip.translate(x, out_xy.y + (anchor / 2) + point);
                } else {
                    tooltip.translate(x, out_xy.y - anchor - h + point);
                }
            }
        }

        function onNodeActiveHandler(data) {
            var color = self.chart.theme("topologyEdgeColor"),
                activeColor = self.chart.theme("topologyActiveEdgeColor"),
                size = self.chart.theme("topologyEdgeWidth"),
                activeSize = self.chart.theme("topologyActiveEdgeWidth");

            activeEdges = [];
            for(var i = 0; i < data.outgoing.length; i++) {
                var key = data.key + ":" + data.outgoing[i],
                    edge = edges.get(key);

                if(edge != null) {
                    activeEdges.push(edge);
                    if (edge.connect()) { // 같이 연결된 노드도 추가
                        activeEdges.push(edges.get(edge.reverseKey()));
                    }
                }
            }

            edges.each(function(edge) {
                var elem = edge.element(),
                    circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                    line = (elem.children.length == 2) ? elem.get(0) : null;

                if(_.inArray(edge, activeEdges) != -1) { // 연결된 엣지
                    var lineAttr = { stroke: activeColor, "stroke-width": activeSize * edge.get("scale") },
                        circleAttr = { fill: activeColor };

                    if(line != null) {
                        line.attr(lineAttr);
                    }
                    circle.attr(circleAttr);

                    tooltip.attr({ visibility: "hidden" });
                } else { // 연결되지 않은 엣지
                    if(line != null) {
                        line.attr({ stroke: color, "stroke-width": size * edge.get("scale") });
                    }
                    circle.attr({ fill: color });
                }
            });
        }

        function onEdgeActiveHandler(edge) {
            edges.each(function(newEdge) {
                var elem = newEdge.element(),
                    circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                    line = (elem.children.length == 2) ? elem.get(0) : null,
                    color = self.chart.theme("topologyEdgeColor"),
                    activeColor = self.chart.theme("topologyActiveEdgeColor"),
                    size = self.chart.theme("topologyEdgeWidth"),
                    activeSize = self.chart.theme("topologyActiveEdgeWidth");

                if(edge != null && (edge.key() == newEdge.key() || edge.reverseKey() == newEdge.key())) {
                    if(line != null) {
                        line.attr({ stroke: activeColor, "stroke-width": activeSize * newEdge.get("scale") });
                    }
                    circle.attr({ fill: activeColor });

                    // 툴팁에 보여지는 데이터 설정
                    if(edge.key() == newEdge.key()) {
                        // 엣지 툴팁 보이기
                        showTooltip(edge);
                    }

                    activeEdges = [ edge ];
                    if(edge.connect()) { // 같이 연결된 노드도 추가
                        activeEdges.push(edges.get(edge.reverseKey()));
                    }
                } else {
                    if(line != null) {
                        line.attr({ stroke: color, "stroke-width": size * newEdge.get("scale") });
                    }
                    circle.attr({ fill: color });
                }
            });
        }

        function onEdgeMouseOverHandler(edge) {
            if(_.inArray(edge, activeEdges) != -1) return;

            var elem = edge.element(),
                circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                line = (elem.children.length == 2) ? elem.get(0) : null,
                color = self.chart.theme("topologyHoverEdgeColor"),
                size = self.chart.theme("topologyHoverEdgeWidth");

            if(line != null) {
                line.attr({
                    stroke: color,
                    "stroke-width": size * edge.get("scale")
                });
            }

            circle.attr({
                fill: color
            });
        }

        function onEdgeMouseOutHandler(edge) {
            if(_.inArray(edge, activeEdges) != -1) return;

            var elem = edge.element(),
                circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                line = (elem.children.length == 2) ? elem.get(0) : null,
                color = self.chart.theme("topologyEdgeColor"),
                size = self.chart.theme("topologyEdgeWidth");

            if(line != null) {
                line.attr({
                    stroke: color,
                    "stroke-width": size * edge.get("scale")
                });
            }

            circle.attr({
                fill: color
            });
        }

        this.drawBefore = function() {
            g = self.svg.group();
            point = self.chart.theme("topologyEdgePointRadius");

            tooltip = self.svg.group({
                visibility: "hidden"
            }, function() {
                self.svg.polygon({
                    fill: self.chart.theme("topologyTooltipBackgroundColor"),
                    stroke: self.chart.theme("topologyTooltipBorderColor"),
                    "stroke-width": 1
                });

                self.chart.text({
                    "font-size": self.chart.theme("topologyTooltipFontSize"),
                    "fill": self.chart.theme("topologyTooltipFontColor"),
                    y: textY
                });
            });
        }

        this.draw = function() {
            var nodes = [];

            this.eachData(function(data, i) {
                for(var j = 0; j < data.outgoing.length; j++) {
                    setDataEdges(i, j);
                }
            });

            // 엣지 그리기
            createEdges();

            // 노드 그리기
            this.eachData(function(data, i) {
                var node = createNodes(i, data);
                g.append(node);

                nodes[i] = { node: node, data: data };
            });

            // 툴팁 숨기기 이벤트 (차트 배경 클릭시)
            this.on("axis.mousedown", function(e) {
                if(self.axis.root.element == e.target) {
                    onEdgeActiveHandler(null);
                    tooltip.attr({ visibility: "hidden" });
                }
            });

            // 액티브 엣지 선택 (렌더링 이후에 설정)
            if(_.typeCheck("string", self.brush.activeEdge)) {
                this.on("render", function(init) {
                    if(!init) {
                        var edge = edges.get(self.brush.activeEdge);
                        onEdgeActiveHandler(edge);
                    }
                });
            }

            // 액티브 노드 선택 (렌더링 이후에 설정)
            if(_.typeCheck("string", self.brush.activeNode)) {
                this.on("render", function(init) {
                    if(!init) {
                        onNodeActiveHandler(getNodeData(self.brush.activeNode));
                    }
                });
            }

            return g;
        }
    }

    TopologyNode.setup = function() {
        return {
            /** @cfg {Boolean} [clip=true] If the brush is drawn outside of the chart, cut the area. */
            clip: true,

            // topology options
            /** @cfg {Function} [nodeTitle=null] */
            nodeTitle: null,
            /** @cfg {Function} [nodeText=null] */
            nodeText: null,
            /** @cfg {Function} [nodeImage=null] */
            nodeImage: null,
            /** @cfg {Function} [nodeScale=null] */
            nodeScale: null,

            /** @cfg {Array} [edgeData=[]] */
            edgeData: [],
            /** @cfg {String} [edgeText=null] */
            edgeText: null,
            /** @cfg {Function} [edgeText=null] */
            edgeOpacity: null,

            /** @cfg {Function} [tooltipTitle=null] */
            tooltipTitle: null,
            /** @cfg {Function} [tooltipText=null] */
            tooltipText: null,

            /** @cfg {String} [activeNode=null] */
            activeNode: null,
            /** @cfg {String} [activeEdge=null] */
            activeEdge: null,
            /** @cfg {String} [activeEvent="click"] */
            activeEvent: "click"
        }
    }

    /**
     * @event topoloygy_nodeclick
     * Event that occurs when click on the topology node. (real name ``` topoloygy.nodeclick ```)
     * @param {Object} data The node data.
     * @param {jQueryEvent} e The event object.
     */

    /**
     * @event topoloygy_edgeclick
     * Event that occurs when click on the topology edge. (real name ``` topoloygy.edgeclick ```)
     * @param {Object} data The edge data.
     * @param {jQueryEvent} e The event object.
     */

    return TopologyNode;
}, "chart.brush.core");
jui.define("chart.brush.focus", [], function() {
	/**
	 * @class chart.brush.focus
	 * @extends chart.brush.core
	 */
	var FocusBrush = function() {
		var self = this;
		var g, grid;

		this.drawFocus = function(start, end) {
			var borderColor = this.chart.theme("focusBorderColor"),
				borderSize = this.chart.theme("focusBorderWidth"),
				bgColor = this.chart.theme("focusBackgroundColor"),
				bgOpacity = this.chart.theme("focusBackgroundOpacity");

			var width = this.axis.area("width"),
				height = this.axis.area("height"),
				x = this.axis.area("x"),
				y = this.axis.area("y");

			g = this.svg.group({}, function() {
				if(self.brush.hide || self.axis.data.length == 0) return;

				var a = self.svg.line({
					stroke: borderColor,
					"stroke-width": borderSize,
					x1: 0,
					y1: 0,
					x2: (grid == "x") ? 0 : width,
					y2: (grid == "x") ? height : 0
				});

				var b = self.svg.rect({
					width: (grid == "x") ? Math.abs(end - start) : width,
					height: (grid == "x") ? height : Math.abs(end - start),
					fill: bgColor,
					opacity: bgOpacity
				});

				var c = self.svg.line({
					stroke: borderColor,
					"stroke-width": borderSize,
					x1: 0,
					y1: 0,
					x2: (grid == "x") ? 0 : width,
					y2: (grid == "x") ? height : 0
				});

				if(grid == "x") {
					a.translate(start, y);
					b.translate(start, y);
					c.translate(end, y);
				} else {
					a.translate(x, start);
					b.translate(x, start);
					c.translate(x, end);
				}
			});

			return g;
		}

		this.drawBefore = function() {
			grid = (this.axis.y.type == "range") ? "x" : "y";
		}

		this.draw = function() {
			var start = 0, end = 0;

			if(this.brush.start == -1 || this.brush.end == -1) {
				return this.svg.g();
			}

			if(this.axis[grid].type == "block") {
				var size = this.axis[grid].rangeBand();

				start = this.axis[grid](this.brush.start) - size / 2;
				end = this.axis[grid](this.brush.end) + size / 2;
			} else  {
				start = this.axis[grid](this.brush.start);
				end = this.axis[grid](this.brush.end);
			}

			return this.drawFocus(start, end);
		}
	}

	FocusBrush.setup = function() {
		return {
			/** @cfg {Integer} [start=-1] Sets a focus start index.*/
			start: -1,

			/** @cfg {Integer} [end=-1] Sets a focus end index. */
			end: -1
		};
	}

	return FocusBrush;
}, "chart.brush.core");
jui.define("chart.brush.pin", [ "util.base" ], function(_) {
    /**
     * @class chart.brush.pin  
     * @extends chart.brush.core
     */
    var PinBrush = function() {
        var self = this;

        this.draw = function() {
            var size = this.brush.size,
                color = this.chart.theme("pinBorderColor"),
                width = this.chart.theme("pinBorderWidth"),
                fontSize = this.chart.theme("pinFontSize"),
                paddingY = fontSize / 2,
                startY = this.axis.area("y"),
                showText = _.typeCheck("function", this.brush.format);

            var g = this.svg.group({}, function() {
                var d = self.axis.x(self.brush.split),
                    x = d - (size / 2);

                if(showText) {
                    var value = self.format(self.axis.x.invert(d));

                    self.chart.text({
                        "text-anchor": "middle",
                        "font-size": fontSize,
                        "fill": self.chart.theme("pinFontColor")
                    }, value).translate(d, startY);
                }

                self.svg.polygon({
                    fill: color
                })
                .point(size, startY)
                .point(size / 2, size + startY)
                .point(0, startY)
                .translate(x, paddingY);

                self.svg.line({
                    stroke: color,
                    "stroke-width": width,
                    x1: size / 2,
                    y1: startY + paddingY,
                    x2: size / 2,
                    y2: startY + self.axis.area("height")
                }).translate(x, 0);
            });

            return g;
        }
    }

    PinBrush.setup = function() {
        return {
            /** @cfg {Number} [size=6] */
            size: 6,
            /** @cfg {Number} [split=0] Determines a location where a pin is displayed (data index). */
            split: 0,
            /** @cfg {Function} [format=null] */
            format: null,
            /** @cfg {boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip : false
        };
    }

    return PinBrush;
}, "chart.brush.core");
jui.define("chart.brush.timeline", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.timeline
     * @extends chart.brush.core
     */
    var TimelineBrush = function() {
        var self = this;
        var g, padding, domains, height, width, ticks, titleX, active, startX;
        var keyToIndex = {}, cacheRect = [], cacheRectIndex = null;

        this.setActiveRect = function(target) {
            for (var k = 0; k < cacheRect.length; k++) {
                var r1 = cacheRect[k].r1,
                    r2 = cacheRect[k].r2,
                    color = cacheRect[k].color,
                    isTarget = r2.element == target;

                r1.attr({
                    "fill": (isTarget) ?
                        this.chart.theme("timelineActiveBarBackgroundColor") : color
                })

                r2.attr({
                    "fill": (isTarget) ?
                        this.chart.theme("timelineActiveLayerBackgroundColor") : this.chart.theme("timelineHoverLayerBackgroundColor"),
                    "stroke": (isTarget) ?
                        this.chart.theme("timelineActiveLayerBorderColor") : this.chart.theme("timelineHoverLayerBorderColor"),
                    "fill-opacity": (isTarget) ? this.chart.theme("timelineLayerBackgroundOpacity") : 0,
                    "stroke-width": (isTarget) ? 1 : 0
                });

                if (isTarget) {
                    cacheRectIndex = k;
                }
            }
        }

        this.setHoverRect = function(target) {
            for(var k = 0; k < cacheRect.length; k++) {
                var r2 = cacheRect[k].r2,
                    isTarget = r2.element == target;

                r2.attr({
                    "fill": (isTarget && cacheRectIndex == k) ?
                        self.chart.theme("timelineActiveLayerBackgroundColor") : this.chart.theme("timelineHoverLayerBackgroundColor"),
                    "stroke": (isTarget && cacheRectIndex == k) ?
                        self.chart.theme("timelineActiveLayerBorderColor") : this.chart.theme("timelineHoverLayerBorderColor"),
                    "fill-opacity": (isTarget || cacheRectIndex == k) ? this.chart.theme("timelineLayerBackgroundOpacity") : 0,
                    "stroke-width": (isTarget || cacheRectIndex == k) ? 1 : 0
                });
            }
        }

        this.setHoverBar = function(target) {
            var hoverColor = this.chart.theme("timelineHoverBarBackgroundColor");

            for(var k = 0; k < cacheRect.length; k++) {
                var r1 = cacheRect[k].r1,
                    isTarget = r1.element == target;

                r1.attr({
                    "fill": (isTarget && hoverColor != null) ? hoverColor : cacheRect[k].color
                });
            }
        }

        this.drawBefore = function() {
            g = this.svg.group();
            padding = this.axis.get("padding");
            domains = this.axis.y.domain();
            height = this.axis.y.rangeBand();
            width = this.axis.x.rangeBand();
            ticks = this.axis.x.ticks(this.axis.get("x").step);
            active = this.brush.active;
            startX = (this.brush.hideTitle) ? 0 : padding.left;
            titleX = this.axis.area("x") - startX;

            // 도메인 키와 인덱스 맵팽 객체
            for(var i = 0; i < domains.length; i++) {
                keyToIndex[domains[i]] = i;
            }
        }

        this.drawGrid = function() {
            var yFormat = this.axis.get("y").format,
                rowWidth = this.axis.area("width") + startX;

            for (var j = 0; j < domains.length; j++) {
                var domain = domains[j],
                    y = this.axis.y(j);

                var fill = (j == 0) ? this.chart.theme("timelineColumnBackgroundColor") :
                    ((j % 2) ? this.chart.theme("timelineEvenRowBackgroundColor") : this.chart.theme("timelineOddRowBackgroundColor"));

                g.append(this.svg.rect({
                    width: rowWidth,
                    height: height,
                    fill: fill,
                    x: titleX,
                    y: y - height / 2
                }));

                if(startX > 0) {
                    var txt = this.chart.text({
                        "text-anchor": "start",
                        dx: 5,
                        dy: this.chart.theme("timelineTitleFontSize") / 2,
                        "font-size": this.chart.theme("timelineTitleFontSize"),
                        fill: this.chart.theme("timelineTitleFontColor"),
                        "font-weight": 700
                    }).translate(titleX, y);

                    if (_.typeCheck("function", yFormat)) {
                        txt.text(yFormat.apply(this.chart, [ domain, j ]));
                    } else {
                        txt.text(domain);
                    }

                    g.append(txt);
                }
            }
        }

        this.drawLine = function() {
            var y = this.axis.y(0) - height / 2,
                xFormat = this.axis.get("x").format;

            for(var i = 0; i < ticks.length; i++) {
                var x = this.axis.x(ticks[i]);

                if(i < ticks.length - 1) {
                    var vline = this.svg.line({
                        stroke: this.chart.theme("timelineVerticalLineColor"),
                        "stroke-width": 1,
                        x1: x,
                        x2: x,
                        y1: y,
                        y2: y + this.axis.area("height"),
                        visibility: (startX == 0 && i == 0) ? "hidden" : "visible"
                    });

                    g.append(vline);
                }

                if(i > 0) {
                    var txt = this.chart.text({
                        "text-anchor": "end",
                        dx: -5,
                        dy: this.chart.theme("timelineColumnFontSize") / 2,
                        "font-size": this.chart.theme("timelineColumnFontSize"),
                        fill: this.chart.theme("timelineColumnFontColor")
                    })
                    .translate(x, this.axis.y(0));

                    if (_.typeCheck("function", xFormat)) {
                        txt.text(xFormat.apply(this.chart, [ ticks[i], i ]));
                    } else {
                        txt.text(ticks[i]);
                    }

                    g.append(txt);
                }
            }

            var hline = this.svg.line({
                stroke: this.chart.theme("timelineHorizontalLineColor"),
                "stroke-width": 1,
                x1: titleX,
                x2: this.axis.area("width") + padding.left,
                y1: y + height,
                y2: y + height
            });

            g.append(hline);
        }

        this.drawData = function() {
            var bg_height = this.axis.area("height"),
                len = this.axis.data.length,
                size = this.brush.barSize;

            for(var i = 0; i < len; i++) {
                var d = this.axis.data[i],
                    x1 = this.axis.x(this.getValue(d, "stime", 0)),
                    x2 = this.axis.x(this.getValue(d, "etime", this.axis.x.max())),
                    y = this.axis.y(keyToIndex[this.getValue(d, "key")]),
                    h = (_.typeCheck("function", size)) ? size.apply(this.chart, [ d, i ]) : size,
                    color = this.color(i, 0);

                if(x2 - x1 < 0 || isNaN(x2)) { // 음수 처리
                    continue;
                }

                var r1 = this.svg.rect({
                    width: x2 - x1,
                    height: h,
                    fill: color,
                    x: x1,
                    y: y - h / 2,
                    cursor: "pointer"
                });

                var r2 = this.svg.rect({
                    width: x2 - x1,
                    height: bg_height - 6,
                    "fill-opacity": 0,
                    "stroke-width": 0,
                    x: x1,
                    y: 3,
                    cursor: "pointer"
                });

                if(i < len - 1) {
                    var dd = this.axis.data[i + 1],
                        xx1 = this.axis.x(this.getValue(dd, "stime", 0)),
                        yy = this.axis.y(keyToIndex[this.getValue(dd, "key")]);

                    var l = this.svg.line({
                        x1: x2,
                        y1: y,
                        x2: xx1,
                        y2: yy,
                        stroke: color,
                        "stroke-width": this.brush.lineWidth
                    });

                    g.append(l);
                }

                g.append(r1);
                g.append(r2);

                // 브러쉬 공통 이벤트 설정
                this.addEvent(r1, i);

                // 마우스 오버 효과 엘리먼트
                cacheRect[i] = {
                    r1: r1,
                    r2: r2,
                    color: color
                };

                // 액티브 이벤트 설정
                if(active != null) {
                    (function(data) {
                        r2.on(self.brush.activeEvent, function (e) {
                            self.setActiveRect(e.target);
                            self.chart.emit("timeline.active", [ data, e ]);
                        });
                    })(d);

                    r2.on("mouseover", function(e) {
                        self.setHoverRect(e.target);
                    });
                } else {
                    r2.attr({ "visibility": "hidden" });

                    r1.on("mouseover", function(e) {
                        self.setHoverBar(e.target);
                    });
                }
            }

            // 엑티브 대상 효과 설정
            if(_.typeCheck("integer", active) && cacheRect.length > 0) {
                if(active < 0) return;

                cacheRectIndex = active;
                this.setActiveRect(cacheRect[cacheRectIndex].r2.element);
            }
        }

        this.draw = function() {
            this.drawGrid();
            this.drawLine();
            this.drawData();

            // 마우스가 차트 밖으로 나가면 Hover 효과 제거
            g.on("mouseout", function(e) {
                if(active != null) {
                    self.setHoverRect(null);
                } else {
                    self.setHoverBar(null);
                }
            });

            return g;
        }
    }

    TimelineBrush.setup = function() {
        return {
            barSize: 7,
            lineWidth: 1,
            active: null,
            activeEvent: "click",
            hideTitle : false,
            clip : false
        };
    }

    return TimelineBrush;
}, "chart.brush.core");
jui.define("chart.brush.hudbar", [], function() {

    /**
     * @class chart.brush.hudbar
     * @extends chart.brush.core
     */
	var HUDBarBrush = function() {
		var g;
		var domains, zeroX, height, col_height, half_height;
		var x1, x2, y1, y2;

		this.drawBefore = function() {
			var op = this.brush.outerPadding,
				ip = this.brush.innerPadding,
				len = 2;

			g = this.chart.svg.group();
			zeroX = this.axis.x(0) + ip;
			height = this.axis.y.rangeBand();
			domains = this.axis.y.domain();

			half_height = (height - op * 2);
			col_height = (height - op * 2 - (len - 1) * ip) / len;
			col_height = (col_height < 0) ? 0 : col_height;

			x1 = this.axis.area("x");
			x2 = this.axis.area("x2");
			y1 = this.axis.area("y");
			y2 = this.axis.area("y2");
		}

		this.draw = function() {
			var data = this.axis.data,
				padding = this.brush.innerPadding,
				linePadding = this.chart.theme("hudBarTextLinePadding");

			for(var i = 0; i < data.length; i++) {
				var top = this.getValue(data[i], "top", 0),
					bottom = this.getValue(data[i], "bottom", 0),
					moveY = this.axis.y(i) - (half_height / 2) + padding/2;

				for(var j = 0; j < 2; j++) {
					var moveX = this.axis.x((j == 0) ? top : bottom),
						width = moveX - zeroX;

					var rect = this.svg.rect({
						fill: this.chart.theme((j == 0) ? "hudBarTopBackgroundColor" : "hudBarBottomBackgroundColor"),
						"fill-opacity": this.chart.theme("hudBarBackgroundOpacity"),
						width: width,
						height: col_height - padding/2,
						x: zeroX,
						y: moveY
					});

					var path = this.svg.path({
						stroke: this.chart.theme("hudBarTextLineColor"),
						"stroke-width": this.chart.theme("hudBarTextLineWidth"),
						fill: "transparent"
					});

					var text = this.chart.text({
						x: padding + width + linePadding,
						y: moveY,
						dx: 3,
						dy: col_height,
						fill: this.chart.theme("hudBarTextLineFontColor"),
						"font-size": this.chart.theme("hudBarTextLineFontSize")
					}, (j == 0) ? this.format(top, "top") : this.format(bottom, "bottom"));

					path.MoveTo(padding + width, moveY + 1);
					path.LineTo(padding + width + linePadding, moveY + 1);
					path.LineTo(padding + width + linePadding, moveY + col_height + 1);

					g.append(rect);
					g.append(path);
					g.append(text);

					this.addEvent(rect, i, null);
					moveY += col_height + padding/2;
				}
			}

			this.drawGrid();

            return g;
		}

		this.drawGrid = function() {
			var barWidth = height / 3.5;

			for(var i = 0; i < domains.length; i++) {
				var domain = domains[i],
					move = this.axis.y(i),
					moveStart = move - (half_height / 2),
					moveEnd = move + (half_height / 2);

				var p = this.svg.polygon({
					"stroke-width": 0,
					fill: this.chart.theme("hudBarGridBackgroundColor"),
					"fill-opacity": this.chart.theme("hudBarGridBackgroundOpacity")
				});

				var l = this.svg.line({
					stroke: this.chart.theme("hudBarGridLineColor"),
					"stroke-width": this.chart.theme("hudBarGridLineWidth"),
					"stroke-opacity": this.chart.theme("hudBarGridLineOpacity"),
					x1: x1 - barWidth * 2,
					y1: move,
					x2: x1 - barWidth * 3,
					y2: move
				});

				var t = this.chart.text({
					x: x1 - barWidth * 3,
					y: move,
					dx: -7,
					dy: this.chart.theme("hudBarGridFontSize") / 3,
					fill: this.chart.theme("hudBarGridFontColor"),
					"text-anchor": "end",
					"font-size": this.chart.theme("hudBarGridFontSize"),
					"font-weight": "bold"
				}, domain);

				p.point(x1, moveStart);
				p.point(x1, moveEnd);
				p.point(x1 - barWidth, moveEnd);
				p.point(x1 - barWidth * 2, move);
				p.point(x1 - barWidth, moveStart);
				p.point(x1, moveStart);

				g.append(p);
				g.append(l);
				g.append(t);
			}
		}
	}

	HUDBarBrush.setup = function() {
		return {
			/** @cfg {Number} [outerPadding=2] Determines the outer margin of a hud column.  */
			outerPadding: 7,
			/** @cfg {Number} [innerPadding=1] Determines the inner margin of a hud column. */
			innerPadding: 7,

			clip: false,
			format: null
		};
	}

	return HUDBarBrush;
}, "chart.brush.core");

jui.define("chart.brush.hudcolumn", [], function() {

    /**
     * @class chart.brush.hudcolumn
     * @extends chart.brush.core
     */
	var HUDColumnBrush = function() {
		var g;
		var domains, zeroY, width, col_width, half_width;
		var x1, x2, y1, y2;

		this.drawBefore = function() {
			var op = this.brush.outerPadding,
				ip = this.brush.innerPadding,
				len = 2;

			g = this.chart.svg.group();
			zeroY = this.axis.y(0);
			width = this.axis.x.rangeBand();
			domains = this.axis.x.domain();

			half_width = (width - op * 2);
			col_width = (width - op * 2 - (len - 1) * ip) / len;
			col_width = (col_width < 0) ? 0 : col_width;

			x1 = this.axis.area("x");
			x2 = this.axis.area("x2");
			y1 = this.axis.area("y");
			y2 = this.axis.area("y2");
		}

		this.draw = function() {
			var data = this.axis.data;

			for(var i = 0; i < data.length; i++) {
				var left = this.getValue(data[i], "left", 0),
					right = this.getValue(data[i], "right", 0),
					moveX = this.axis.x(i) - (half_width / 2);

				for(var j = 0; j < 2; j++) {
					var moveY = this.axis.y((j == 0) ? left : right);

					var rect = this.createColumn(j, {
						fill: (j == 0) ? this.chart.theme("hudColumnLeftBackgroundColor") :
							this.chart.theme("hudColumnRightBackgroundColor")
					}, moveX, moveY);

					g.append(rect);
					moveX += col_width + this.brush.innerPadding;
				}
			}

			this.drawGrid();

            return g;
		}

		this.drawGrid = function() {
			var r = this.chart.theme("hudColumnGridPointRadius"),
				stroke = this.chart.theme("hudColumnGridPointBorderColor"),
				width = this.chart.theme("hudColumnGridPointBorderWidth");

			g.append(this.svg.line({
				stroke: stroke,
				"stroke-width": width,
				x1: x1,
				x2: x2,
				y1: y2,
				y2: y2
			}));

			for(var i = 0; i < domains.length; i++) {
				var domain = domains[i],
					move = this.axis.x(i),
					moveX = move - (half_width / 2);

				var point1 = this.svg.circle({
					r: r,
					fill: this.chart.theme("axisBackgroundColor"),
					stroke: stroke,
					"stroke-width": width,
					cx: move,
					cy: y2
				});

				var point2 = this.svg.circle({
					r: r * 0.65,
					fill: stroke,
					"stroke-width": 0,
					cx: move,
					cy: y2,
					"fill-opacity": 0
				});

				var text = this.chart.text({
					x: move,
					y: y2,
					dy: this.chart.theme("hudColumnGridFontSize") * 2,
					fill: this.chart.theme("hudColumnGridFontColor"),
					"text-anchor": "middle",
					"font-size": this.chart.theme("hudColumnGridFontSize"),
					"font-weight": this.chart.theme("hudColumnGridFontWeight")
				}, domain);

				var group = this.svg.group();

				for(var j = 0; j < 2; j++) {
					var rect = this.createColumn(j, {
						fill: "transparent",
						stroke: stroke,
						"stroke-width": 2
					}, moveX, y1);

					this.addEvent(rect, i, null);
					group.append(rect);

					moveX += col_width + this.brush.innerPadding;
				}

				(function(g, p) {
					g.hover(function() {
						p.attr({ "fill-opacity": 1 });

					}, function() {
						p.attr({ "fill-opacity": 0 });
					});
				})(group, point2);

				g.append(group);
				g.append(point1);
				g.append(point2);
				g.append(text);
			}
		}

		this.createColumn = function(type, attr, moveX, moveY) {
			var padding = 20, dist = 15 + padding;
			var rect = this.svg.polygon(attr);

			rect.point(moveX, moveY);
			rect.point(moveX + col_width, moveY);

			if(type == 0) {
				rect.point(moveX + col_width, y2 - padding);
				rect.point(moveX, y2 - dist);
			} else {
				rect.point(moveX + col_width, y2 - dist);
				rect.point(moveX, y2 - padding);
			}

			if(moveY >= zeroY - dist) {
				rect.attr({ visibility: "hidden" });
			}

			return rect;
		}
	}

	HUDColumnBrush.setup = function() {
		return {
			/** @cfg {Number} [outerPadding=2] Determines the outer margin of a hud column.  */
			outerPadding: 5,
			/** @cfg {Number} [innerPadding=1] Determines the inner margin of a hud column. */
			innerPadding: 5,

			clip: false
		};
	}

	return HUDColumnBrush;
}, "chart.brush.core");

jui.define("chart.brush.heatmap", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.heatmap
     * @extends chart.brush.core
     */
	var HeatmapBrush = function() {
		var self = this;

		this.draw = function() {
			var bw = this.chart.theme("heatmapBorderWidth"),
				fs = this.chart.theme("heatmapFontSize"),
				g = this.svg.group(),
				w = this.axis.x.rangeBand() - bw,
				h = this.axis.y.rangeBand() - bw;

			for(var i = 0; i < this.axis.data.length; i++) {
				var group = this.svg.group(),
					color = this.color(i, null),
					data = this.axis.data[i],
					text = this.getValue(data, "text"),
					cx = this.axis.x(i),
					cy = this.axis.y(i);

				if(color == "none") {
					color = this.chart.theme("heatmapBackgroundColor");
				}

				var r = this.svg.rect({
					x: cx - w/2,
					y: cy - h/2,
					width: w,
					height: h,
					fill: color,
					"fill-opacity": this.chart.theme("heatmapBackgroundOpacity"),
					stroke: this.chart.theme("heatmapBorderColor"),
					"stroke-opacity": this.chart.theme("heatmapBorderOpacity"),
					"stroke-width": bw
				});

				var t = this.chart.text({
					"text-anchor": "middle",
					"font-color": this.chart.theme("heatmapFontColor"),
					"font-size": fs,
					width: w,
					height: h,
					x: cx,
					y: cy + fs/2
				}).text(_.typeCheck("function", this.brush.format) ? this.format(data) : text);

				this.addEvent(group, i, null);

				group.append(r);
				group.append(t);
				g.append(group);

				// Hover effects
				(function(rr) {
					group.hover(function() {
						rr.attr({
							"fill-opacity": self.chart.theme("heatmapHoverBackgroundOpacity")
						});
					}, function() {
						rr.attr({
							"fill-opacity": self.chart.theme("heatmapBackgroundOpacity")
						});
					})
				})(r);
			}

            return g;
		}
	}

	HeatmapBrush.setup = function() {
		return {
			format: null
		};
	}

	return HeatmapBrush;
}, "chart.brush.core");

jui.define("chart.brush.pyramid", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.pie
     * @extends chart.brush.core
     */
    var PyramidBrush = function() {
        function getCalculatedData(obj, targets) {
            var total = 0,
                list = [];

            for(var key in obj) {
                var index = _.inArray(key, targets);
                if(index == -1) continue;

                total += obj[key];

                list.push({
                    key: key,
                    value: obj[key],
                    rate: 0,
                    index: index
                });
            }

            for(var i = 0; i < list.length; i++) {
                list[i].rate = list[i].value / total;
            }

            list.sort(function(a, b) {
                return b.value - a.value;
            });

            return list;
        }

        this.createText = function(text, cx, cy, dist) {
            var l_size = this.chart.theme("pyramidTextLineSize"),
                f_size = this.chart.theme("pyramidTextFontSize"),
                x = cx + l_size,
                y = cy + ((dist > 0 && dist < l_size) ? cy - dist/2 : 0);

            var g = this.svg.group();

            var l = this.svg.line({
                stroke: this.chart.theme("pyramidTextLineColor"),
                "stroke-width": this.chart.theme("pyramidTextLineWidth"),
                x1: cx,
                y1: cy,
                x2: x,
                y2: y
            });

            var t = this.chart.text({
                "font-size": this.chart.theme("pyramidTextFontSize"),
                fill: this.chart.theme("pyramidTextFontColor"),
                x: x,
                y: y,
                dx: 3,
                dy: f_size / 3
            }).text(text)

            g.append(l);
            g.append(t);

            return g;
        }

        this.draw = function() {
            var g = this.svg.group(),
                obj = (this.axis.data.length > 0) ? this.axis.data[0] : {},
                data = getCalculatedData(obj, this.brush.target),
                area = this.axis.area(),
                dx = area.width / 2,
                dy = area.height;

            var startX = 0,
                endX = dx * 2,
                startRad = Math.atan2(dy, dx),
                distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)),
                textY = 0,
                isReverse = this.brush.reverse;

            if(isReverse) dy = 0;

            for(var i = 0; i < data.length; i++) {
                var d = data[i],
                    dist = d.rate * distance,
                    sx = startX + (dist * Math.cos(startRad)),
                    ex = endX - (dist * Math.cos(-startRad)),
                    ty = dist * Math.sin(startRad),
                    y = (isReverse) ? dy + ty : dy - ty;

                var poly = this.svg.polygon({
                    fill: this.color(i),
                    "stroke-width": 0
                });

                this.addEvent(poly, 0, d.index);
                g.append(poly);

                // 라인 그리기
                if(i > 0) {
                    var width = this.chart.theme("pyramidLineWidth");

                    var line = this.svg.line({
                        stroke: this.chart.theme("pyramidLineColor"),
                        "stroke-width": width,
                        x1: startX - width/2,
                        y1: dy,
                        x2: endX + width/2,
                        y2: dy
                    });

                    line.translate(area.x, area.y);
                    g.append(line);
                }

                // 텍스트 그리기
                if(this.brush.showText) {
                    var tx = (ex + endX) / 2,
                        ty = (y + dy) / 2;

                    var text = this.createText(
                        _.typeCheck("function", this.brush.format) ? this.format(d.key, d.value, d.rate) : d.value,
                        tx, ty, textY - ty);

                    text.translate(area.x, area.y);

                    g.append(text);
                    textY = ty;
                }

                poly.point(startX, dy);
                poly.point(sx, y);
                poly.point(ex, y);
                poly.point(endX, dy);
                poly.translate(area.x, area.y);

                startX = sx;
                endX = ex;
                dy = y;
            }

            return g;
        }
    }

    PyramidBrush.setup = function() {
        return {
            /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip: false,
            /** @cfg {Boolean} [showText=false] Set the text appear. */
            showText: false,
            /** @cfg {Function} [format=null] Returns a value from the format callback function of a defined option. */
            format: null,
            /** @cfg {Boolean} [reverse=false]  */
            reverse: false
        }
    }

    return PyramidBrush;
}, "chart.brush.core");

jui.define("chart.brush.map.core", [], function() {
    /**
     * @class chart.brush.map.core
     * @abstract
     * @extends chart.brush.core
     * @requires jquery
     * @requires util.base
     */
	var MapCoreBrush = function() {
	}

	return MapCoreBrush;
}, "chart.brush.core");
jui.define("chart.brush.map.selector", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.over 
     * @extends chart.brush.core
     */
	var MapSelectorBrush = function(chart, axis, brush) {
		var g = null,
			activePath = null;

		this.drawBefore = function() {
			g = chart.svg.group();
		}

		this.draw = function() {
			var originFill = null;

			this.on("map.mouseover", function(obj, e) {
				if(activePath == obj.path) return;

				originFill = obj.path.styles.fill || obj.path.attributes.fill;
				obj.path.css({
					fill: chart.theme("mapSelectorHoverColor")
				});
			});

			this.on("map.mouseout", function(obj, e) {
				if(activePath == obj.path) return;

				obj.path.css({
					fill: originFill
				});
			});

			if(brush.activeEvent != null) {
				this.on(brush.activeEvent, function(obj, e) {
					activePath = obj.path;

					axis.map.each(function(i, obj) {
						obj.path.css({
							fill: originFill
						});
					});

					obj.path.css({
						fill: chart.theme("mapSelectorActiveColor")
					});
				});
			}

			if(brush.active.length > 0) {
				activePath = [];

				axis.map.each(function(i, obj) {
					if(_.inArray(axis.getValue(obj.data, "id"), brush.active) != -1) {
						activePath.push(obj.path);

						obj.path.css({
							fill: chart.theme("mapSelectorActiveColor")
						});
					}
				});
			}

			return g;
		}
	}

	MapSelectorBrush.setup = function() {
		return {
			active: [],
			activeEvent: null
		}
	}

	return MapSelectorBrush;
}, "chart.brush.map.core");

jui.define("chart.brush.map.note", [ "util.base" ], function(_) {
	var PADDING = 7,
		ANCHOR = 7,
		TEXT_Y = 14;

    /**
     * @class chart.brush.over 
     * @extends chart.brush.core
     */
	var MapNoteBrush = function(chart, axis, brush) {
		var self = this;
		var g = null,
			tooltips = {};

		this.drawBefore = function() {
			g = chart.svg.group();
		}

		this.draw = function() {
			if(brush.activeEvent != null) {
				this.on(brush.activeEvent, function(obj, e) {
					var targetId = axis.getValue(obj.data, "id");

					if(tooltips[targetId]) {
						for (var id in tooltips) {
							tooltips[id].attr({ visibility: (targetId == id) ? "visibility" : "hidden" });
						}
					}
				});
			}

			this.eachData(function(d, i) {
				var id = axis.getValue(d, "id"),
					value = axis.getValue(d, "value", 0),
					texts = axis.getValue(d, "texts", []),
					text = id + ": " + value,
					xy = axis.map(id);

				if(_.typeCheck("function", brush.format)) {
					text = self.format(d);
				}

				var size = chart.svg.getTextSize(text),
					w = size.width + (PADDING * 2),
					h = size.height;

				if(xy != null) {
					var tooltip = chart.svg.group({
						visibility: (_.inArray(id, brush.active) != -1) ? "visibility" : "hidden"
					}, function() {
						chart.svg.polygon({
							points: self.balloonPoints("top", w, h, ANCHOR),
							fill: chart.theme("tooltipBackgroundColor"),
							"fill-opacity": chart.theme("tooltipBackgroundOpacity"),
							stroke: chart.theme("tooltipBorderColor"),
							"stroke-width": 1
						});

						chart.text({
							"font-size": chart.theme("tooltipFontSize"),
							"fill": chart.theme("tooltipFontColor"),
							"text-anchor": "middle",
							x: w / 2,
							y: TEXT_Y
						}, text);

						chart.texts({
							"font-size": chart.theme("tooltipFontSize"),
							"fill": chart.theme("tooltipFontColor"),
							"text-anchor": "start"
						}, texts, 1.2).translate(0, -(TEXT_Y * texts.length));

					}).translate(xy.x - (w / 2), xy.y - h - ANCHOR);

					tooltips[id] = tooltip;
					g.append(tooltip);
				}
			});

			return g;
		}
	}

	MapNoteBrush.setup = function() {
		return {
			active: [],
			activeEvent: null,
			format: null
		}
	}

	return MapNoteBrush;
}, "chart.brush.map.core");

jui.define("chart.brush.map.bubble", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.brush.map.bubble
     * @extends chart.brush.core
     */
	var MapBubbleBrush = function(chart, axis, brush) {
        var self = this;

        function getMinMaxValues() {
            var min = 0,
                max = 0,
                dataList = self.listData();

            for(var i = 0; i < dataList.length; i++) {
                var value = axis.getValue(dataList[i], "value", 0);

                min = (i == 0) ? value : Math.min(value, min);
                max = (i == 0) ? value : Math.max(value, max);
            }

            return {
                min: min,
                max: max
            }
        }

        this.drawText = function(value, x, y) {
            var text = value;

            if(_.typeCheck("function", this.brush.format)) {
                text = this.format(value);
            }

            var elem = this.chart.text({
                "font-size" : this.chart.theme("mapBubbleFontSize"),
                fill : this.chart.theme("mapBubbleFontColor"),
                x : x,
                y : y + 3,
                "text-anchor" : "middle"
            }, text);

            return elem;
        }

		this.draw = function() {
            var g = chart.svg.group(),
                minmax = getMinMaxValues();

            this.eachData(function(d, i) {
                var value = axis.getValue(d, "value", 0),
                    size = math.scaleValue(value, minmax.min, minmax.max, brush.min, brush.max),
                    xy = axis.map(axis.getValue(d, "id", null)),
                    color = this.color(i, 0);

                if(xy != null) {
                    var c = chart.svg.circle({
                        cx: xy.x,
                        cy: xy.y,
                        r: size,
                        "fill": color,
                        "fill-opacity": chart.theme("mapBubbleBackgroundOpacity"),
                        "stroke": color,
                        "stroke-width": chart.theme("mapBubbleBorderWidth")
                    });

                    g.append(c);

                    // 가운데 텍스트 보이기
                    if(this.brush.showText) {
                        g.append(this.drawText(value, xy.x, xy.y));
                    }
                }
            });

			return g;
		}
	}

    MapBubbleBrush.setup = function() {
        return {
            min : 10,
            max : 30,
            showText : false,
            format : null
        }
    }

	return MapBubbleBrush;
}, "chart.brush.map.core");

jui.define("chart.brush.map.comparebubble", [ "util.base", "util.math" ], function(_, math) {
    var BORDER_WIDTH = 1.5,
        MAX_OPACITY = 0.8,
        MIN_OPACITY = 0.6,
        LINE_ANGLE = 315,
        TITLE_RATE = 0.6;

    /**
     * @class chart.brush.map.bubble
     * @extends chart.brush.core
     */
	var MapCompareBubbleBrush = function(chart, axis, brush) {
        var self = this;
        var g, min, max, minValue, maxValue;

        function getTextInBubble(color, align, size, title, value, x, y) {
            return self.chart.svg.text({
                fill: color,
                "text-anchor": align,
                y: 7
            }, function() {
                self.chart.svg.tspan({
                    "font-size": size
                }, value);
                self.chart.svg.tspan({
                    "font-size": size * TITLE_RATE,
                    x: 0,
                    y: size
                }, title);
            }).translate(x, y);
        }

        this.drawBefore = function() {
            var data = this.listData();
            g = chart.svg.group();

            if(data.length == 2) {
                min = data[0];
                max = data[1];
                minValue = axis.getValue(min, "value");
                maxValue = axis.getValue(max, "value");

                // 맥스 값 설정
                if (minValue > maxValue) {
                    min = data[1];
                    max = data[0];
                    minValue = axis.getValue(min, "value");
                    maxValue = axis.getValue(max, "value");
                }
            }
        }

        this.drawMaxText = function(centerX, centerY, gap) {
            var r = gap * 2.5,
                cx = centerX + Math.cos(math.radian(LINE_ANGLE)),
                cy = centerY + Math.sin(math.radian(LINE_ANGLE)),
                tx = centerX + (Math.cos(math.radian(LINE_ANGLE)) * r),
                ty = centerY + (Math.sin(math.radian(LINE_ANGLE)) * r),
                ex = tx + brush.size,
                title = axis.getValue(max, "title", ""),
                value = axis.getValue(max, "value", 0),
                size = self.chart.theme("mapCompareBubbleMaxFontSize");

            if(_.typeCheck("function", brush.format)) {
                value = this.format(value);
            }

            var group = chart.svg.group({}, function() {
                var path = self.chart.svg.path({
                    fill: "transparent",
                    stroke: self.chart.theme("mapCompareBubbleMaxLineColor"),
                    "stroke-width": BORDER_WIDTH,
                    "stroke-dasharray": self.chart.theme("mapCompareBubbleMaxLineDashArray")
                });

                path.MoveTo(cx, cy)
                    .LineTo(tx, ty)
                    .LineTo(ex, ty);

                self.chart.svg.circle({
                    cx: cx,
                    cy: cy,
                    r: 3,
                    fill: self.chart.theme("mapCompareBubbleMaxLineColor")
                });
            });

            group.append(getTextInBubble(
                self.chart.theme("mapCompareBubbleMaxFontColor"), "start",
                size, title, value, ex + 5, ty
            ));

            return group;
        }

        this.drawMinText = function(centerX, centerY) {
            var title = axis.getValue(min, "title", ""),
                value = axis.getValue(min, "value", 0),
                group = chart.svg.group(),
                size = self.chart.theme("mapCompareBubbleMinFontSize");

            if(_.typeCheck("function", brush.format)) {
                value = this.format(value);
            }

            group.append(getTextInBubble(
                self.chart.theme("mapCompareBubbleMinFontColor"), "middle",
                size, title, value, centerX, centerY - (size * TITLE_RATE / 2)
            ));
        }

		this.draw = function() {
            if(min != null && max != null) {
                var maxSize = brush.size,
                    minSize = brush.size * (minValue / maxValue),
                    gap = maxSize - minSize,
                    cx = axis.area("width") / 2,
                    cy = axis.area("height") / 2;

                var c1 = chart.svg.circle({
                    r: maxSize,
                    fill: this.color(0),
                    "fill-opacity": MAX_OPACITY,
                    stroke: chart.theme("mapCompareBubbleMaxBorderColor"),
                    "stroke-width": BORDER_WIDTH,
                    cx: cx,
                    cy: cy
                });

                var c2 = chart.svg.circle({
                    r: minSize,
                    fill: this.color(1),
                    "fill-opacity": MIN_OPACITY,
                    stroke: chart.theme("mapCompareBubbleMinBorderColor"),
                    "stroke-width": BORDER_WIDTH,
                    cx: cx,
                    cy: cy + gap - BORDER_WIDTH
                });

                g.append(c1);
                g.append(c2);
                g.append(this.drawMaxText(cx, cy - minSize, gap));
                g.append(this.drawMinText(cx, cy + gap - BORDER_WIDTH));
            }

			return g;
		}
	}

    MapCompareBubbleBrush.setup = function() {
        return {
            size: 100,
            format: null
        }
    }

	return MapCompareBubbleBrush;
}, "chart.brush.map.core");

jui.define("chart.brush.map.flightroute", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.map.flightroute
     * @extends chart.brush.core
     */
	var MapFlightRouteBrush = function(chart, axis, brush) {
        var self = this;
        var g, tooltip;
        var smallColor, largeColor, borderWidth, lineColor, lineWidth, outerSize;
        var smallRate = 0.4, largeRate = 1.33, padding = 7, anchor = 7, textY = 14;

        function printTooltip(obj) {
            var msg = obj.data.title;

            if(_.typeCheck("string", msg) && msg != "") {
                tooltip.get(1).text(msg);
                tooltip.get(1).attr({ "text-anchor": "middle" });
            }

            return msg;
        }

        function setOverEffect(type, xy, outer, inner) {
            outer.hover(over, out);
            inner.hover(over, out);

            function over(e) {
                if(!printTooltip(xy)) return;

                var color = (type == "large") ? smallColor : largeColor,
                    size = tooltip.get(1).size(),
                    innerSize = outerSize * smallRate,
                    w = size.width + (padding * 2),
                    h = size.height + padding;

                tooltip.get(1).attr({ x: w / 2 });
                tooltip.get(0).attr({
                    points: self.balloonPoints("top", w, h, anchor),
                    stroke: color
                });
                tooltip.attr({ visibility: "visible" });
                tooltip.translate(xy.x - (w / 2), xy.y - h - anchor - innerSize);

                outer.attr({ stroke: color });
                inner.attr({ fill: color });
            }

            function out(e) {
                var color = (type == "large") ? largeColor : smallColor;

                tooltip.attr({ visibility: "hidden" });
                outer.attr({ stroke: color });
                inner.attr({ fill: color });
            }
        }

        this.drawAirport = function(type, xy) {
            var color = (type == "large") ? largeColor : smallColor,
                innerSize = outerSize * smallRate;

            var outer = chart.svg.circle({
                r: (type == "large") ? outerSize * largeRate : outerSize,
                "stroke-width": (type == "large") ? borderWidth * largeRate : borderWidth,
                "fill": "transparent",
                "fill-opacity": 0,
                "stroke": color
            }).translate(xy.x, xy.y);

            var inner = chart.svg.circle({
                r: (type == "large") ? innerSize * largeRate : innerSize,
                "stroke-width": 0,
                "fill": color
            }).translate(xy.x, xy.y);

            g.append(outer);
            g.append(inner);

            // 마우스오버 이벤트 설정
            setOverEffect(type, xy, outer, inner);
        }

        this.drawRoutes = function(target, xy) {
            var line = chart.svg.line({
                x1: xy.x,
                y1: xy.y,
                x2: target.x,
                y2: target.y,
                stroke: lineColor,
                "stroke-width": lineWidth
            });

            g.append(line);
        }

        this.drawBefore = function() {
            g = chart.svg.group();
            tooltip = chart.svg.group({
                visibility: "hidden"
            }, function() {
                chart.svg.polygon({
                    fill: chart.theme("tooltipBackgroundColor"),
                    "fill-opacity": chart.theme("tooltipBackgroundOpacity"),
                    stroke: chart.theme("tooltipBorderColor"),
                    "stroke-width": 2
                });

                chart.text({
                    "font-size": chart.theme("tooltipFontSize"),
                    "fill": chart.theme("tooltipFontColor"),
                    y: textY
                });
            });

            smallColor = chart.theme("mapFlightRouteAirportSmallColor");
            largeColor = chart.theme("mapFlightRouteAirportLargeColor");
            borderWidth = chart.theme("mapFlightRouteAirportBorderWidth");
            outerSize = chart.theme("mapFlightRouteAirportRadius");
            lineColor = chart.theme("mapFlightRouteLineColor");
            lineWidth = chart.theme("mapFlightRouteLineWidth");
        }

		this.draw = function() {
            this.eachData(function(d, i) {
                var id = axis.getValue(d, "id", null),
                    type = axis.getValue(d, "airport", null),
                    routes = axis.getValue(d, "routes", []),
                    xy = axis.map(id);

                if(type != null && xy != null) {
                    for(var j = 0; j < routes.length; j++) {
                        var target = axis.map(routes[j]);

                        if(target != null) {
                            this.drawRoutes(target, xy);
                        }
                    }

                    this.drawAirport(type, xy);
                }
            });

			return g;
		}
	}

	return MapFlightRouteBrush;
}, "chart.brush.map.core");

jui.define("chart.brush.map.marker", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.map.flightroute
     * @extends chart.brush.core
     */
	var MapMarkerBrush = function(chart, axis, brush) {
		this.draw = function() {
            var g = chart.svg.group(),
                w = brush.width,
                h = brush.height;

            this.eachData(function(d, i) {
                var id = axis.getValue(d, "id", null),
                    xy = axis.map(id);

                if(xy != null) {
                    var html = _.typeCheck("function", brush.html) ? brush.html.call(chart, d) : brush.html,
                        svg = _.typeCheck("function", brush.svg) ? brush.svg.call(chart, d) : brush.svg,
                        cx = xy.x - w / 2,
                        cy = xy.y - h / 2;

                    if(_.typeCheck("string", html) && html != "") {
                        var obj = chart.svg.foreignObject({
                            width: w,
                            height: h
                        }).html(html).translate(cx, cy);

                        g.append(obj);
                    }

                    if(_.typeCheck("string", svg) && svg != "") {
                        var obj = chart.svg.group();
                        obj.html(svg).translate(cx, cy);

                        g.append(obj);
                    }
                }
            });

			return g;
		}
	}

    MapMarkerBrush.setup = function() {
        return {
            width : 0,
            height : 0,
            html : null,
            svg : null
        }
    }

	return MapMarkerBrush;
}, "chart.brush.map.core");

jui.define("chart.brush.map.weather", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.map.bubble
     * @extends chart.brush.core
     */
	var MapWeatherBrush = function(chart, axis, brush) {
        var self = this;
        var W = 66,
            H = 60,
            R = 5,
            IMAGES = {
                sunny: "data:image/gif;base64,R0lGODlhQAAuAPcAAP3ttf7xt/3mc/3cZf+8Gv7tof+5Bv/62P3ke/7zav/65v/WTP/1zf7uqv/5vP/53f3oXf7ONf/EPf/1xf/95PzbRP732P/94f7ZTf/2e/7IJP7tmf7CKf7cUf7eVf/2yf3SHP3iTP3iWv+9Cf++Jf/50v/4zfzTNP3mYf/6s/+9BP/20f/LRP7wcP7ZSv/51f/6w/7ynP/yuv7OMf7UQ/3mi/7GKf7ylP7WR/7RPf71vv/2wv/+8/7ywv3bNf/6yv+yBvzdXf7xsv3wxf7viv3lgf/88v+2Bv7FLP7yjf7pZf7qkv/yvv/1dv7taf/BA/7raP3WU/3ukv7FJv3qmv7qlf7OOf/4fv/8yP/87/3ZUP+/A/3tjP/31P7wqv/80v7lXv/66v/76f7JHf/3fP/92v70qv3pnv3pbP7OLv/93v/4qv/+7//+9/7zrf3phf7spv7snv7KLv/2rvzgdf/86/7OPP3YOP7pjv7hV/7ulf/74//+8P7og/7ubP7zzv3mhv3XP//8zf/99P7FFf7KKf7GHP/0sf/96f/76/7BIfziYv+/Nv3qiv7SSf7CGf7ADf7tf//JDv7JLP/GCv3sev7JMPzVOv7SQP/88P+/FP/ACP7DJv7EDv/+6//HF//ztv//9P/64f/81f723P7uYv7RL//1ov7yp/7ypP3iUf3trf7KFf7nYf3TKf/54P+vBf7jXP7NGf/wpf/vo/7SQ/7ILvzmaf7HMf7GE//+6P7RO//3vP3of/3od/3rcP3lbv3WJv7ILP/97f/44//34f7zyP3ugf7QQ/7NLv///f///v//+P///P/++v//+//++P//+f7MLv/+/P//+v/++f/++/7ML/zibf7bTv3nnf3bLf/9+f3cSPzPKP7yc/7NLf7wof3sp/7shP/+7P3naP/78f/99//+/fzqrP7FJP7mUP3nV/3XKv+7Bf3tdP3hLv3oe/zlk/7NIf7MN/vgb/7rWPzfaP3jg/7IGf7MM/7xgP3wqP7DEfvVL////yH5BAAAAAAALAAAAABAAC4AAAj/AP8JHEiwoMGDCBMqXMiwIbQ2Ap05a0ixokVoogQaqTNw2UBoFkMyXBbN4z9oHwQqOBCRh8BMRkTKTBjNk0B0oAYtO/Dj3zIKNpWtmDaz6D9lzwRG+zIInbMdFrJ84JUojAkx3F6tUCYwi9GQzXTFfDbKhDkFAYSQchOD1AozFooFOGBt2R6OXxlK9Mnmi5hqD+YwsNBgwxApx4asIvIHQIMPYRR8aCaQa16EyvaI+RcNiwlSFm4UGELljbZeKNL1QQOgyAZjfxo8gLZsUJaklw0q0zWhS7U9pxoYk1KOjpY7dwIFopEDU5QgvgDUaMAgzKsuFCgLhJhbIDMsoJhY/0AViUo9fz7WlUqQoBSEPBiQ0XOOYENjJj/YHBVzYGJuZdMsw0YKQiwhBBQV3LFOAk1k4GAGLSgRSweOsGDJJTUAEkcqJUCjgAwMVNOdQIm8MkgJSUiBwHH2JJDBFTDCCKESImhRoS3eYPMOKn8EUMBWI/rkCQUy9MAPBBUEkocTL8ZIBhlNtAAFGB4sgAwLSIAgQBUIxHGAS90RdZQaOsQBSBCmdABGC2TI2EQT37TghxJUYlCLHRJwckkHVYDygDUjQvOKBXUkMgERApyAgwcotOAgnHI64YQSrYjggZ1WSMDIGItwYUwxYnjVnTIKMCEOHOJUYEoUHrTSwjdx+v8BhRJKoACGpdm4UIsVuDCiyCXanAHAKzzgdtkyWYyiAxX3+GPHAq1CIemsrYARSx4eeJArc/QgwQEJY9xTACgmDJKXMkYooIAY6fYghQDesIBDB7G0Yq+tImDbQa44cGuJDd920g0XPRBzTm6DWCBEAUsUgc8AGrBAgxYeiBBLvtnu6wIOOGBiRwT6yAEwAZtoIY84MlgwDDPRRPMVD2p8wQstjUQxBQuY4JBNBzxrzDENmORgRQQzJCMyBwSocEkjeqCSggOCUMDMZcOUkEolFdggQQ404ODC1z8HvcvQM6SRRjLSCMOBJiqAAMExbhzAXVHpriADLQXgUUQNA0z/IQE9OXANdNBCR0B02WcbjYQiI6hwgt7TgcKAKKKKFA0fF3wBgwNrEIGgOozgog89VpQ+9OFmm53M6nIg8YgKKriCBheowCDIBWxQMxM1oXiSOQwpJPFLCIYwMoUwcsygvPKpq7660baoA4k7KviABhFm/FAGBXzo/lUbDzBRgJnzkMCBDciv3nziz0sjcj9bHAFJEDWsYkFMlykziLolHEIEGsF4hPlsMAlwPO+A7RMZIbZggCPIQgRcEMIHTGSZr1xOFxdgQAEQEIRPmO98k5AGAlcnjWvIQQOdYCAQRoCBKvADFD8YBTm0cxkjTKAKgGgECkCgiQ8iAXlykEYJ/69BxEIYghIqMAAQgCAJVUihARbQSXes0QVazGIHbtBDIxbBCk0QQBGcsAESbGEJS8ihEBoYQyeekEQgwAIS3YCAE5Kwgwf45yvKSIQJsHMBCnShCn0oxzYo4Y4RQEITjzCEIj+RizVuwR1HcKM7gtGLOAjBDGtIQRkqWBRoTIQazVCGBTYwCyJUohcdkIQKqLeFJ7jyCVtYpRJhAYsRBAIFEOBCAV6BOUF8gQ0mORcDNsALB5SpF+zwgCye4A4DGMAdzWygG2FxBEP4QARU4McN5gAKBQikGTyYWl6mwYAPjEINfJBBFYgghTfAox1jYKY0lwgEAxACBBVYwi/G0f+DBwjCATvYw4icoYAssGFqKyDmBITwC3u8IQTdcMU88pGLMbBiF3e4xy1CsAQZpOIQCpgGH8qgBrzk7x+4EYMXvoAIBbhhH6nYwC+oIIJ4eMAHfQgBFQQQD35EIhIfEIUgfgCRZYSCB8HsThs+gIipfWANDlhBDLwgBF80ABiqKAAwGiAEfu4gBryoBjPKgIikBkkZYoAGVzLxAyzw4AUOCF84/tAIXxhjA0wgBSgmUIcvnOICy1CGJ8QZpMoQhAJfCMU/SqCGQUxgAsSYhR5I0YMJhGEPH7BGKLAAA8sww6yFFYgukOqMC0zNBLr4xyFiwIw6mMAjcvsHD35Q1tBbIoQZofCIMnL7jwNMbQdzaEYzHuARZvDBI2xQAydtO5DPftMydfBIF2CQlGGY5Bkm8QRSmdsQ3IjiBZRpBjXMqgw2LJe7CsnCHs5LEKSAFr0H4UEW3gvf+lIkIAA7",
                cloudy: "data:image/gif;base64,R0lGODlhQAAuAPcAAP3KRf3GG/z23Nzd4b2+wfzTON3d3vLy8dTV2cTFyufk0//64tXW1/7ELOnp6cXGxtHR0tna3f7xbP7qlf//fv7lev71yvz8/NfY3Pzdaty6VuXm6efo6uTbtf7snf3JOP7xtf7CJv7oXt3Ywf/++u/w8v3ZTf6+JsbIy/7fVd7g4v/20f/87uvq5/3SRKaoq9HS1La4u/3NPv/76f71cM3O0P7hVv7pi+Xl5v/1zv7EMf/31P/88PHy9P3XS/j4+P3JLvX2+P3EQ//53urZqv7uoejq7OvERf/65v7tqfby5cnJy/P09vv6+v/4dfb29//wp9nZ2v/++PHx6vT09P7tZpKVmv7VTf/+9v7ywv3ZQv7yvf7lgrK1uOXLhv/21MrLzv7dU//99M/Q0/7iTf/86v3JNbm6vf7speDg4Ovt8NLPx83Nzv7mXf7qYv3URu7u7v/DO9LU1svMzP7miezs7P7idMHBwbW2t/LpxuLi4r28vfPEO//42Pv8/f/xuqutsff4+vHktrq8v/+9NP7iWPT29/3JMuno4L/Bxf7kWvz9/v/98v7TSv7vra6ws/3QQe3GUv7zyeDi5fv7+/zNIv/0wv3LPP++OZqdours7v/8efTz8tvc3f/1uf3cWf7cT//85fT19sPExs7P1v/6eODg4v7uaNjX1v/zx7Gys/3+/v/+9P/99v767/r37O3t6ePl5bi5uf3bUP3TTbCytfn6+8rM0cjL0LK0t////v///f7+/v///P/+/Pn5+f7+/f/+/uTj5P79/P7//9PT05+ipt7e2fbnpN/BV+Tk5O7hpuTj4/+/HvC/N/z7+Ovr6//MSfLVX//UUfft0P/34P7iZ/7ia/v7+fzPMfTKTff39sHDx+y7S/3POv7vuvz8+PDGUfz9+/f39+jRkf3YVvDbrN+/YfPz8//xYP7+//zRLf7//v39/frwwP/1xPzINPj49vzMNdDP1f/98f//8v7rZPvsqf7rqtTT1P7qpf/3zODi4+Hf2P3ZSf///yH5BAAAAAAALAAAAABAAC4AAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLAnvRa/VPChaDvXRhHPmv1wwW/1jMECjyHwkpu0hW3NXr364FC/4N6eMSS8wZWFrKlKiRxM1UYva9EzNjAQkeX0j8wyJ1aMNdrKT8CzVEzIok1UBAQSJpxYxUK16G+mg1IYmgu8osaLUAhIAcXLLcuLHCQ5YcE1a42oHEl8uYbQv2kuuLxb4c1YqgwafligtvtGhlsMMlhyQQM3zN4FFTIOLELHLkcOxhSxEfPrSQKUQGlI9Gl8rpo7Ol2pc+9ESKoVfVqi6aQ6Bs2Xcjwxsy6ZxsKuVEgogUV2TI+/Ttm6M+UsQs/xjCQ+jQXWJ40PNUgU6GAiJoUJg/v5R17NGAmKjwfYglSygl9o8u9AzxhQU3FOCNIhLQR98mNNijiAkuANCAP46gMcEWYgi4i0ckIAECGnRkE4YbTjxIHQ0SuKFIGG9cIkQAPljjSGGGtdXYEHJlMUEBjaRQRSmbbOIEixKc4kYbhcwSYxyYVHKDJNWwwFFiu8xggSNJcAHENELScGSSVdgjQhs2hOGDC5foQEgzGSSRhVNDHfcSCSTMsEUFBVwSpBunBGrPkooUksIsPrwhwwcNnHBCJRNYMAMJ5l2ky1ML9LHCCj5WAoALYSgiwplMpjmLCW+4sCg8DYTQTABcpP/SBwuUVmqRLmIM8c4EdoQRgBCQmJCCDTakcKgJiboAySUfHNKAM14QoUEyyEgiAAtSlGbpcbuQwEIfRXwSQhwyvGHCuci+kaoMzJpxCBB8EDEQOAog0sIxsISEUXoL7AMCCB7wGQImH8jgwsHKQrKoGe4CAcQR1AjESyCLCNTOD2sowQhG3dLTrycB+4qJDvBcIgO7H3xgBgCRaOAMvPL+s4ototjiRxBqqDDGKAeMRBMW9YSyjyN2BEBICA3ocMjS8ABwTh69SCEtOYwQ8w8lPdjyzyKGMKEJBqTIUUc7I/WS6xYkruMo0g4DEYkgAwXzjyuviMOOLuow0cQqvwT/8sQ4cHQyTwQljEQCPfSEYoEHWjRzAtINaBMOOU0A084iw2BDyS9PUPJPEByUIDovwVzwCycGsJHGDyPpIsUCRVwjzRGOC+EFIg4g0g4wWwdhSCCibNCDHxtgEMEAQVz9AxV1dMIGA8KwfusMfxRxzzKCwNJBN+Yc5IcaHBgheglqTBIBBgOUsAolTxwAjTIMzAEDNJS0w8tEr++wQBkCdKBEC3CoAyeoEIQfXEBmfggeBhCgAg70gAobmIQmesCE3zGhBA6IBQIesIROwOEX94tIt8Qghm65owPKSIMD6hA+OByACuNgghFUgAEY3AIXKjjABiLAAVEEogQ9CEL7/zpRAzbUoAb5wME2QggRXbTkFXkYgR6YoYc0RIEBk4BGHeDwA1GoQA6kwEUCUAADORAgARvgwCQGYARDGCIWKBhFDaIQhQgwIA3oqJhExDEFBfQjDcxIQwQggIIHQKATenBADGcoxkQMIgaPqEUCGGAAU2AAA5OYBAJQgAI5mMIABugEAzgwjonEAxGo6EQKi/GAO9zhDF3owiBqIDwjDAAFBBgEIDLxgkHMQQ5y6MQAzoeAGtziFjAYAA0xEAVUHICJDwHGNlCRhjQYgAGtJAAecnGGQSRiAD2IRQQigIIXWCETo4DBHNggB0qCjZMJAEMNYcAABhQjCs+cCCUcgOeKNRSDlWdQBQHuMAgCoCACKkBAAhJAAGOc06BzJCQBcglLQBBgDoVcwiEPcECK8OIZB0hdMVAxh4E+4IxzGIUs8MDSWjwiFzHgBjNRMIhIvuCmMXhePgzAAWhQoaMW4YUo4ACLKcABGscwgCxUgYeTEuABc4AADCCAClOoYJBLOCkeCLCEGkCAAXo4wC8uAE2LtOMClOLFL7aBgzns4QwP4Ckc0DGOH/yAEpQYBzpKAA09JLIOG8BBHURBVolZ5X6m+wUVFkuFX0DED+PwnIAUYquF8OICZJusZjfL2c569rOgDe1AAgIAOw==",
                murky: "data:image/gif;base64,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",
                rain: "data:image/gif;base64,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",
                snow: "data:image/gif;base64,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"
            };

        function getFormat(id) {
            var name = null;

            if(_.typeCheck("function", brush.format)) {
                name = self.format(id);
            }

            return (name && name != "") ? name : id;
        }

        function createWeather(id, name, uri, temp) {
            var xy = axis.map(id);
            if(xy == null) return;

            var g = chart.svg.group(),
                rect = chart.svg.rect({
                    width: W + 2,
                    height: H,
                    rx: R,
                    ry: R,
                    fill: chart.theme("mapWeatherBackgroundColor"),
                    stroke: chart.theme("mapWeatherBorderColor"),
                    "stroke-width": 1
                }),
                img = chart.svg.image({
                    x: 1,
                    y: 2,
                    width: W,
                    height: 45,
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xlink:href": uri
                }),
                title = chart.svg.text({
                    x: W / 2,
                    dy: -4,
                    "font-size" : chart.theme("mapWeatherFontSize"),
                    "font-weight": "bold",
                    "text-anchor": "middle",
                    fill: chart.theme("mapWeatherTitleFontColor")
                }).text(name),
                info = chart.svg.text({
                    x: W / 2,
                    dy: 54,
                    "font-size" : chart.theme("mapWeatherFontSize"),
                    "text-anchor": "middle",
                    fill: chart.theme("mapWeatherInfoFontColor")
                }).text(temp);

            g.append(rect);
            g.append(img);
            g.append(title);
            g.append(info);
            g.translate(xy.x - W/2, xy.y - H/2);

            return g;
        }

		this.draw = function() {
            var g = chart.svg.group();

            this.eachData(function(d, i) {
                var id = axis.getValue(d, "id", null),
                    temp = axis.getValue(d, "temperature", 0),
                    icon = axis.getValue(d, "weather", "sunny");

                g.append(createWeather(id, getFormat(id), IMAGES[icon], temp));
            });

			return g;
		}
	}

    MapWeatherBrush.setup = function() {
        return {
            format: null
        }
    }

	return MapWeatherBrush;
}, "chart.brush.map.core");

jui.define("chart.brush.polygon.core", [], function() {
    var PolygonCoreBrush = function() {
        this.createPolygon = function(polygon, callback) {
            this.calculate3d(polygon);

            var element = callback.call(this, polygon);
            if(element) {
                element.order = this.axis.depth - polygon.max().z;
                return element;
            }
        }
    }

    PolygonCoreBrush.setup = function() {
        return {
            id: null,
            clip: false
        }
    }

    return PolygonCoreBrush;
}, "chart.brush.core");
jui.define("chart.brush.polygon.scatter3d",
	[ "util.base", "util.math", "util.color", "chart.polygon.point" ],
	function(_, MathUtil, ColorUtil, PointPolygon) {

	/**
	 * @class chart.brush.polygon.scatter3d
	 * @extends chart.brush.polygon.core
	 */
	var PolygonScatter3DBrush = function() {
		this.createScatter = function(data, target, dataIndex, targetIndex) {
			var color = this.color(dataIndex, targetIndex),
				r = this.brush.size / 2,
				x = this.axis.x(dataIndex),
				y = this.axis.y(data[target]),
				z = this.axis.z(dataIndex);

			if(color.indexOf("radial") == -1) {
				color = this.chart.color(
					"radial(40%,40%,100%,0%,0%) 0% " +
					ColorUtil.lighten(color, this.chart.theme("polygonScatterRadialOpacity")) +
					",70% " +
					color
				);
			}

			return this.createPolygon(new PointPolygon(x, y, z), function(p) {
				var elem = this.chart.svg.circle({
					r: r * MathUtil.scaleValue(z, 0, this.axis.depth, 1, p.perspective),
					fill: color,
					"fill-opacity": this.chart.theme("polygonScatterBackgroundOpacity"),
					cx: p.vectors[0].x,
					cy: p.vectors[0].y
				});

				if(data[target] != 0) {
					this.addEvent(elem, dataIndex, targetIndex);
				}

				return elem;
			});
		}

		this.draw = function() {
			var g = this.chart.svg.group(),
				datas = this.listData(),
				targets = this.brush.target;

			for(var i = 0; i < datas.length; i++) {
				for(var j = 0; j < targets.length; j++) {
					g.append(this.createScatter(datas[i], targets[j], i, j));
				}
			}

			return g;
		}
	}

	PolygonScatter3DBrush.setup = function() {
		return {
			/** @cfg {Number} [size=7]  Determines the size of a starter. */
			size: 7,
			/** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
			clip: false
		};
	}

	return PolygonScatter3DBrush;
}, "chart.brush.polygon.core");

jui.define("chart.brush.polygon.column3d",
	[ "util.base", "util.math", "util.color", "chart.polygon.cube" ],
	function(_, MathUtil, ColorUtil, CubePolygon) {

	/**
	 * @class chart.brush.polygon.column3d
	 * @extends chart.brush.polygon.core
	 */
	var PolygonColumn3DBrush = function() {
		var col_width, col_height;

		this.createColumn = function(data, target, dataIndex, targetIndex) {
			var w = col_width,
				h = col_height,
				x = this.axis.x(dataIndex) - w/2,
				y = this.axis.y(data[target]),
				yy = this.axis.y(0),
				z = this.axis.z(targetIndex) - h/2,
				color = this.color(targetIndex);

			return this.createPolygon(new CubePolygon(x, yy, z, w, y - yy, h), function(p) {
				var g = this.svg.group();

				for(var i = 0; i < p.faces.length; i++) {
					var key = p.faces[i];

					var face = this.svg.polygon({
						fill: color,
						"fill-opacity": this.chart.theme("polygonColumnBackgroundOpacity"),
						stroke: ColorUtil.darken(color, this.chart.theme("polygonColumnBorderOpacity")),
						"stroke-opacity": this.chart.theme("polygonColumnBorderOpacity")
					});

					for (var j = 0; j < key.length; j++) {
						var vector = p.vectors[key[j]];
						face.point(vector.x, vector.y);
					}

					g.append(face);
				}

				if(data[target] != 0) {
					this.addEvent(g, dataIndex, targetIndex);
				}

				return g;
			});
		}

		this.drawBefore = function() {
			var padding = this.brush.padding,
				width = this.axis.x.rangeBand(),
				height = this.axis.z.rangeBand();

			col_width = (this.brush.width > 0) ? this.brush.width : width - padding * 2;
			col_height = (this.brush.height > 0) ? this.brush.height : height - padding * 2;
		}

		this.draw = function() {
			var g = this.chart.svg.group(),
				datas = this.listData(),
				targets = this.brush.target;

			for(var i = 0; i < datas.length; i++) {
				for(var j = 0; j < targets.length; j++) {
					g.append(this.createColumn(datas[i], targets[j], i, j));
				}
			}

			return g;
		}
	}

	PolygonColumn3DBrush.setup = function() {
		return {
			/** @cfg {Number} [width=50]  Determines the size of a starter. */
			width: 0,
			/** @cfg {Number} [height=50]  Determines the size of a starter. */
			height: 0,
			/** @cfg {Number} [padding=20] Determines the outer margin of a bar.  */
			padding: 20,
			/** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
			clip: false
		};
	}

	return PolygonColumn3DBrush;
}, "chart.brush.polygon.core");

jui.define("chart.brush.polygon.line3d",
	[ "util.base", "util.color", "util.math", "chart.polygon.point" ],
	function(_, ColorUtil, MathUtil, PointPolygon) {

	/**
	 * @class chart.brush.polygon.line3d
	 * @extends chart.brush.polygon.core
	 */
	var PolygonLine3DBrush = function() {
		this.createLine = function(datas, target, dataIndex, targetIndex) {
			var color = this.color(dataIndex, targetIndex),
				d = this.axis.z.rangeBand() - this.brush.padding * 2,
				x1 = this.axis.x(dataIndex),
				y1 = this.axis.y(datas[dataIndex][target]),
				z1 = this.axis.z(targetIndex) - d / 2,
				x2 = this.axis.x(dataIndex + 1),
				y2 = this.axis.y(datas[dataIndex + 1][target]),
				z2 = this.axis.z(targetIndex) + d / 2,
				maxPoint = null;

			var elem = this.chart.svg.polygon({
				fill: color,
				"fill-opacity": this.chart.theme("polygonLineBackgroundOpacity"),
				stroke: ColorUtil.darken(color, this.chart.theme("polygonLineBorderOpacity")),
				"stroke-opacity": this.chart.theme("polygonLineBorderOpacity")
			});

			var points = [
				new PointPolygon(x1, y1, z1),
				new PointPolygon(x1, y1, z2),
				new PointPolygon(x2, y2, z2),
				new PointPolygon(x2, y2, z1)
			];

			for(var i = 0; i < points.length; i++) {
				this.createPolygon(points[i], function(p) {
					var vector = p.vectors[0];
					elem.point(vector.x, vector.y);

					if(maxPoint == null) {
						maxPoint = p;
					} else {
						if(vector.z > maxPoint.vectors[0].z) {
							maxPoint = p;
						}
					}
				});
			}

			// 별도로 우선순위 설정
			elem.order = this.axis.depth - maxPoint.max().z;

			return elem;
		}

		this.draw = function() {
			var g = this.chart.svg.group(),
				datas = this.listData(),
				targets = this.brush.target;

			for(var i = 0; i < datas.length - 1; i++) {
				for(var j = 0; j < targets.length; j++) {
					g.append(this.createLine(datas, targets[j], i, j));
				}
			}

			return g;
		}
	}

	PolygonLine3DBrush.setup = function() {
		return {
			/** @cfg {Number} [padding=20] Determines the outer margin of a bar.  */
			padding: 10,
			/** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
			clip: false
		};
	}

	return PolygonLine3DBrush;
}, "chart.brush.polygon.core");

jui.define("chart.brush.canvas.core", [ "util.base" ], function(_) {
    var CanvasCoreBrush = function() {
        this.addPolygon = function(polygon, callback) {
            if(!_.typeCheck("array", this.polygons)) {
                this.polygons = [];
            }

            // 폴리곤 각도 및 깊이 연산
            this.calculate3d(polygon);

            // 연산된 폴리곤 객체 추가
            this.polygons.push({
                polygon: polygon,
                order: this.axis.depth - polygon.max().z,
                handler: callback
            });
        }

        this.drawAfter = function() {
            // 폴리곤 기반의 브러쉬일 경우
            if(_.typeCheck("array", this.polygons)) {
                var list = this.polygons;

                list.sort(function(a, b) {
                    return a.order - b.order;
                });

                for(var i = 0, len = list.length; i < len; i++) {
                    var p = list.shift();
                    p.handler.call(this, p.polygon);
                }
            }
        }
    }

    return CanvasCoreBrush;
}, "chart.brush.core");
jui.define("chart.brush.canvas.scatter", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.canvas.scatter
     * @extends chart.brush.canvas.core
     */
    var CanvasScatterBrush = function () {
        this.createScatter = function(data, target, dataIndex, targetIndex) {
            var symbol = this.brush.symbol,
                type = (_.typeCheck("function", symbol)) ? symbol.apply(this.chart, [ target, data[target] ]) : symbol,
                color = this.color(dataIndex, targetIndex),
                r = this.brush.size / 2,
                x = this.axis.x(dataIndex),
                y = this.axis.y(data[target]);

            if(type == "circle") {
                this.canvas.fillStyle = color;
                this.canvas.beginPath();
                this.canvas.arc(x, y, r, 0, 2 * Math.PI, false);
                this.canvas.fill();
                this.canvas.closePath();
            } else if(type == "rect" || type == "rectangle") {
                this.canvas.fillStyle = color;
                this.canvas.fillRect(x - r, y - r, r * 2, r * 2);
            } else if(type == "triangle") {
                this.canvas.fillStyle = color;
                this.canvas.beginPath();
                this.canvas.moveTo(x, y - r);
                this.canvas.lineTo(x - r, y + r);
                this.canvas.lineTo(x + r, y + r);
                this.canvas.lineTo(x, y - r);
                this.canvas.fill();
                this.canvas.closePath();
            } else if(type == "cross") {
                this.canvas.strokeStyle = color;
                this.canvas.beginPath();
                this.canvas.moveTo(x - r, y - r);
                this.canvas.lineTo(x + r, y + r);
                this.canvas.stroke();
                this.canvas.closePath();
                this.canvas.beginPath();
                this.canvas.moveTo(x + r, y - r);
                this.canvas.lineTo(x - r, y + r);
                this.canvas.stroke();
                this.canvas.closePath();
            }
        }

        this.draw = function() {
            var datas = this.listData(),
                targets = this.brush.target;

            for(var i = 0; i < datas.length; i++) {
                for(var j = 0; j < targets.length; j++) {
                    this.createScatter(datas[i], targets[j], i, j);
                }
            }
        }
    }

        CanvasScatterBrush.setup = function() {
        return {
            /** @cfg {"circle"/"triangle"/"rectangle"/"cross"/"callback"} [symbol="circle"] Determines the shape of a (circle, rectangle, cross, triangle).  */
            symbol: "circle",
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7
        };
    }

    return CanvasScatterBrush;
}, "chart.brush.canvas.core");
jui.define("chart.brush.canvas.line.tooltip", [], function() {

    /**
     * Tooltip Object
     * @param {String} text Sets the Value of tooltip
     * @param {Number} x    Sets the X coordinate of tooltip
     * @param {Number} y    Sets the Y coordinate of tooltip
     */
    var Tooltip = function(text, x, y) {
        this.text = text || '';
        this.x = x || 0;
        this.y = y || 0;
        this.textAlign = "center";
        this.fontStyle = "600 10px sans-serif";

        this.render = function(ctx, color) {
            ctx.save();
            ctx.font = this.fontStyle;
            ctx.textAlign = this.textAlign;
            ctx.fillText(this.text, this.x, this.y);
            ctx.restore();
        }
    };

    return Tooltip;
});

jui.define("chart.brush.canvas.line.pathpoint", ["chart.brush.canvas.line.tooltip"], function(Tooltip) {

    /**
     * The point that organize the path
     * @param {Number}  value Sets the value of
     * @param {Number}  x     Sets the X coordinate of point
     * @param {Number}  y     Sets the Y coordinate of point
     * @param {Boolean} isMax
     * @param {Boolean} isMin
     */
    var PathPoint = function(value, x, y, isMax, isMin) {
        this.value = value || '';
        this.x = x || 0;
        this.y = y || 0;
        this.isMax = isMax || false;
        this.isMin = isMin || false;

        this.render = function(ctx, color) {
            if (!this.tooltip) {
                this.tooltip = new Tooltip(this.value, this.x, this.y - 5);
            }

            ctx.save();
            ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();

            this.tooltip.render(ctx, color);
        };
    }

    return PathPoint;
});

jui.define("chart.brush.canvas.line", ["chart.brush.canvas.line.pathpoint"],
    function(PathPoint) {
    /**
     * @class chart.brush.canvas.line
     * @extends chart.brush.canvas.core
     */

	var LineBrush = function() {
        this.getPoints = function(data) {
            var points = [];

            for (var i = 0; i < data.length; i++) {
                var value = data.value[i];
                var x = this.axis.x(i);
                var y = this.axis.y(value);
                var isMax = data.max[i];
                var isMin = data.min[i];
                var symbol = this.brush.symbol;

                points.push(new PathPoint(value, x, y, isMax, isMin));
            }

            return points;
        };

        this.renderPoints = function(points, index) {
            var prevPoint = null;
            var symbol = this.brush.symbol;

            this.canvas.lineWidth = 2;

            for (var i = 0; i < points.length; i++) {
                var currentPoint = points[i];
                var currentColor = this.color(i, index);

                // Skip the first index
                if (prevPoint) {
                    this.canvas.strokeStyle = currentColor;

                    if (symbol == 'curve') {
                        this.drawCurvedLine(prevPoint, currentPoint);
                    }
                    else if (symbol == 'step') {
                        var halfPoint = prevPoint.x + (currentPoint.x - prevPoint.x) / 2;
                        this.drawLine(
                            { x: prevPoint.x, y: prevPoint.y },
                            { x: halfPoint, y: prevPoint.y }
                        );
                        this.drawLine(
                            { x: halfPoint, y: prevPoint.y },
                            { x: halfPoint, y: currentPoint.y }
                        );
                        this.drawLine(
                            { x: halfPoint, y: currentPoint.y },
                            { x: currentPoint.x, y: currentPoint.y }
                        );
                    }
                    else {
                        this.drawLine(prevPoint, currentPoint);
                    }
                }

                // Check the condition to display tooltip
                if ((this.brush.display == 'all') ||
                    (this.brush.display == 'max' && currentPoint.isMax) ||
                    (this.brush.display == 'min' && currentPoint.isMin)) {
                    currentPoint.render(this.canvas, currentColor);
                }

                prevPoint = points[i];
            };
        };

        this.drawLine = function(prevPoint, point) {
            this.canvas.beginPath();
            this.canvas.moveTo(prevPoint.x, prevPoint.y);
            this.canvas.lineTo(point.x, point.y);
            this.canvas.stroke();
            this.canvas.closePath();
        };

        this.drawCurvedLine = function(prevPoint, point) {
            var refractionPoint = {
                x: (point.x - prevPoint.x) / 2,
                y: Math.abs((point.y - prevPoint.y) / 6)
            };

            if (point.y - prevPoint.y < 0) refractionPoint.y = refractionPoint.y * -1;

            this.canvas.beginPath();
            this.canvas.moveTo(prevPoint.x, prevPoint.y);
            this.canvas.bezierCurveTo(
                prevPoint.x + refractionPoint.x,
                prevPoint.y + refractionPoint.y,
                point.x - refractionPoint.x,
                point.y + (refractionPoint.y * -1),
                point.x, point.y
            );
            this.canvas.stroke();
            this.canvas.closePath();
        };

        this.draw = function() {
            var data = this.getXY();
            var points = [];

            for (var i = 0; i < data.length; i++) {
                points[i] = this.getPoints(data[i]);
            }

            for (var i = 0; i < points.length; i++) {
                this.renderPoints(points[i], i);
            }
        };
	}

    LineBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step). */
            symbol: "normal",
            /** @cfg {"max"/"min"/"all"} [display=null]  Shows a tool tip on the bar for the minimum/maximum value.  */
            display: null
        };
    }

	return LineBrush;
}, "chart.brush.canvas.core");
jui.define("chart.brush.canvas.scatter3d",
    [ "util.base", "util.math", "util.color", "chart.polygon.point" ],
    function(_, MathUtil, ColorUtil, PointPolygon) {

    /**
     * @class chart.brush.canvas.scatter3d
     * @extends chart.brush.canvas.core
     */
    var CanvasScatter3DBrush = function () {
        this.createScatter = function(data, target, dataIndex, targetIndex) {
            var color = this.color(dataIndex, targetIndex),
                r = this.brush.size / 2,
                x = this.axis.x(dataIndex),
                y = this.axis.y(data[target]),
                z = this.axis.z(dataIndex);

            this.addPolygon(new PointPolygon(x, y, z), function(p) {
                var tx = p.vectors[0].x,
                    ty = p.vectors[0].y,
                    tr = r * MathUtil.scaleValue(z, 0, this.axis.depth, 1, p.perspective),
                    tc = ColorUtil.lighten(color, this.chart.theme("polygonScatterRadialOpacity"));

                var grd = this.canvas.createRadialGradient(tx, ty, tr / 2, tx, ty, tr);
                grd.addColorStop(0, color);
                grd.addColorStop(1, tc);

                this.canvas.beginPath();
                this.canvas.arc(tx, ty, tr, 0, 2 * Math.PI, false);
                this.canvas.fillStyle = grd;
                this.canvas.fill();
            });
        }

        this.draw = function() {
            var datas = this.listData(),
                targets = this.brush.target;

            for(var i = 0; i < datas.length; i++) {
                for(var j = 0; j < targets.length; j++) {
                    this.createScatter(datas[i], targets[j], i, j);
                }
            }
        }
    }

    CanvasScatter3DBrush.setup = function() {
        return {
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7
        };
    }

    return CanvasScatter3DBrush;
}, "chart.brush.canvas.core");
jui.define("chart.brush.canvas.model3d", [ "util.base", "util.math" ], function(_, MathUtil) {

    /**
     * @class chart.brush.canvas.model3d
     * @extends chart.brush.canvas.core
     */
    var CanvasModel3DBrush = function () {
        var data = null;

        this.drawBefore = function() {
            var Model3D = jui.include("chart.polygon." + this.brush.model);

            if(Model3D != null) {
                data = new Model3D();

                for (var i = 0, len = data.sources.length; i < len; i++) {
                    var x = this.axis.x(data.sources[i][0]),
                        y = this.axis.y(data.sources[i][1]),
                        z = this.axis.z(data.sources[i][2]);

                    data.vertices[i] = new Float32Array([x, y, z, 1])
                }
            }
        }

        this.draw = function() {
            if(data == null) return;

            this.canvas.lineWidth = 0.5;
            this.canvas.strokeStyle = this.color(0);
            this.canvas.beginPath();

            this.addPolygon(data, function(p) {
                var cache = [],
                    vertices = p.vertices,
                    faces = p.faces;

                for (var i = 0, len = vertices.length; i < len; i++) {
                    var v = vertices[i];
                    cache.push(new Float32Array([ v[0], v[1] ]));
                }

                for (var i = 0, len = faces.length; i < len; i++) {
                    var f = faces[i]

                    for (var j = 0, len2 = f.length; j < len2; j++) {
                        var targetPoint = cache[f[j]];

                        if (targetPoint) {
                            var x = targetPoint[0],
                                y = targetPoint[1];

                            if (j == 0) {
                                this.canvas.moveTo(x, y);
                            } else {
                                if (j == f.length - 1) {
                                    var firstPoint = cache[f[0]],
                                        x = firstPoint[0],
                                        y = firstPoint[1];

                                    this.canvas.lineTo(x, y);
                                } else {
                                    this.canvas.lineTo(x, y);
                                }
                            }
                        }
                    }
                }

                this.canvas.stroke();
                this.canvas.closePath();
            });
        }
    }

    CanvasModel3DBrush.setup = function() {
        return {
            model: null
        }
    }

    return CanvasModel3DBrush;
}, "chart.brush.canvas.core");
jui.define("chart.widget.core", [ "util.base" ], function(_) {


    /**
     * @class chart.widget.core
     * implements core widget
     * @extends chart.draw
     * @alias CoreWidget
     * @requires util.base
     * @requires jquery
     *
     */
	var CoreWidget = function() {

        this.getIndexArray = function(index) {
            var list = [ 0 ];

            if(_.typeCheck("array", index)) {
                list = index;
            } else if(_.typeCheck("integer", index)) {
                list = [ index ];
            }

            return list;
        }

        this.getScaleToValue = function(scale, minScale, maxScale, minValue, maxValue) {
            var tick = (maxScale - minScale) * 10,
                step = (maxValue - minValue) / tick,
                value = maxValue - (step * ((scale - minScale) / 0.1));

            if(value < minValue) return minValue;
            else if(value > maxValue) return maxValue;

            return value;
        }

        this.getValueToScale = function(value, minValue, maxValue, minScale, maxScale) {
            var tick = (maxScale - minScale) * 10,
                step = (maxValue - minValue) / tick;

            return parseFloat((minScale + ((maxValue - value) / step) * 0.1).toFixed(1));
        }

        this.isRender = function() {
            return (this.widget.render === true) ? true : false;
        }

        this.on = function(type, callback, axisIndex) {
            var self = this;

            return this.chart.on(type, function() {
                if(_.startsWith(type, "axis.") && _.typeCheck("integer", axisIndex)) {
                    var axis = self.chart.axis(axisIndex),
                        e = arguments[0];

                    if (_.typeCheck("object", axis)) {
                        if (arguments[1] == axisIndex) {
                            callback.apply(self, [ e ]);
                        }
                    }
                } else {
                    callback.apply(self, arguments);
                }
            }, this.isRender() ? "render" : "renderAll");
        }

        this.drawAfter = function(obj) {
            obj.attr({ "class" : "widget-" + this.widget.type });
        }
	}

    CoreWidget.setup = function() {

        /** @property {chart.builder} chart */
        /** @property {chart.axis} axis */
        /** @property {Object} widget */
        /** @property {Number} index [Read Only] Index which shows the sequence how a widget is drawn. */

        return {
            /**
             * @cfg {Boolean} [render=false] Determines whether a widget is to be rendered.
             */            
            render: false,
            /**
             * @cfg {Number} [index=0] current widget index
             */
            index: 0
        }
    }

	return CoreWidget;
}, "chart.draw"); 
jui.define("chart.widget.tooltip", [ "util.base", "util.color" ], function(_, ColorUtil) {
    var PADDING = 7, ANCHOR = 7, RATIO = 1.2;

    /**
     * @class chart.widget.tooltip
     * @extends chart.widget.core
     * @alias TooltipWidget
     * @requires jquery
     *
     */
    var TooltipWidget = function(chart, axis, widget) {
        var self = this,
            tooltips = {},
            lineHeight = 0;

        function getFormat(k, d) {
            var key = null,
                value = null;

            if(_.typeCheck("function", widget.format)) {
                var obj = self.format(d, k);

                if(_.typeCheck("object", obj)) {
                    key = obj.key;
                    value = obj.value;
                } else {
                    value = obj;
                }
            } else {
                if(k && !d) {
                    value = k;
                }

                if(k && d) {
                    key = k;
                    value = self.format(d[k]);
                }
            }

            return {
                key: key,
                value: value
            }
        }

        function printTooltip(obj) {
            var tooltip = tooltips[obj.brush.index],
                texts = tooltip.get(1).get(1),
                width = 0,
                height = 0,
                onlyValue = false;

            if(obj.dataKey && widget.all === false) {
                setTextInTooltip([ obj.dataKey ]);
            } else {
                setTextInTooltip(obj.brush.target);
            }

            function setTextInTooltip(targets) {
                for(var i = 0; i < targets.length; i++) {
                    var key = targets[i],
                        msg = getFormat(key, obj.data);

                    texts.get(i).attr({ x: PADDING });

                    if(msg.key) {
                        texts.get(i).get(0).text(msg.key);
                    } else {
                        texts.get(i).get(1).attr({ "text-anchor": "middle" });
                        onlyValue = true;
                    }

                    if(!_.typeCheck([ "null", "undefined" ], msg.value)) {
                        texts.get(i).get(1).attr({ x: 0 }).text(msg.value);
                    }

                    width = Math.max(width, texts.get(i).size().width);
                }

                height = targets.length * lineHeight;
            }

            return {
                width: width + PADDING * 3,
                height: height + PADDING,
                onlyValue: onlyValue
            };
        }

        function existBrush(index) {
            var list = self.getIndexArray(self.widget.brush);

            return (_.inArray(index, list) == -1) ? false : true;
        }

        function getColorByKey(obj) {
            var targets = obj.brush.target;

            for(var i = 0; i < targets.length; i++) {
                if(targets[i] == obj.dataKey) {
                    return ColorUtil.lighten(self.chart.color(i, obj.brush.colors));
                }
            }

            return null;
        }

        function getTooltipXY(e, size, orient) {
            var x = e.bgX - (size.width / 2),
                y = e.bgY - size.height - ANCHOR - (PADDING / 2),
                lineX = 2;

            if(orient == "left" || orient == "right") {
                y = e.bgY - (size.height / 2) - (PADDING / 2);
            }

            if(orient == "left") {
                x = e.bgX - size.width - ANCHOR;
            } else if(orient == "right") {
                x = e.bgX + ANCHOR;
                lineX = -2;
            } else if(orient == "bottom") {
                y = e.bgY + (ANCHOR * 2);
            }

            return {
                x: x,
                y: y,
                c: lineX
            }
        }

        function setTooltipEvent() {
            var isActive = false,
                size = null,
                orient = null,
                axis = null;

            self.on("mouseover", function(obj, e) {
                if(isActive || !existBrush(obj.brush.index)) return;
                if(!obj.dataKey && !obj.data) return;

                // 툴팁 크기 가져오기
                size = printTooltip(obj);
                orient = widget.orient;
                axis = chart.axis(obj.brush.axis);

                // 툴팁 좌표 가져오기
                var xy = getTooltipXY(e, size, orient),
                    x = xy.x - chart.padding("left"),
                    y = xy.y - chart.padding("top");

                // 엑시스 범위를 넘었을 경우 처리
                if(widget.flip) {
                    if (orient == "left" && x < 0) {
                        orient = "right";
                    } else if (orient == "right" && x + size.width > axis.area("width")) {
                        orient = "left";
                    } else if (orient == "top" && y < 0) {
                        orient = "bottom";
                    } else if (orient == "bottom" && y + size.height > axis.area("height")) {
                        orient = "top";
                    }
                }

                // 툴팁 엘리먼트 가져오기
                var tooltip = tooltips[obj.brush.index],
                    line = tooltip.get(0),
                    rect = tooltip.get(1).get(0),
                    text = tooltip.get(1).get(1).translate(0, (orient != "bottom") ? lineHeight : lineHeight + ANCHOR),
                    borderColor = chart.theme("tooltipBorderColor") || getColorByKey(obj),
                    lineColor = chart.theme("tooltipLineColor") || getColorByKey(obj);

                rect.attr({
                    points: self.balloonPoints(orient, size.width, size.height, (widget.anchor) ? ANCHOR : null),
                    stroke: borderColor
                });
                line.attr({ stroke: lineColor });
                text.each(function(i, elem) {
                    elem.get(1).attr({ x: (size.onlyValue) ? size.width / 2 : size.width - PADDING });
                });
                tooltip.attr({ visibility: "visible" });

                isActive = true;
            });

            self.on("mousemove", function(obj, e) {
                if(!isActive) return;

                var tooltip = tooltips[obj.brush.index],
                    line = tooltip.get(0),
                    target = tooltip.get(1),
                    xy = getTooltipXY(e, size, orient);

                line.attr({
                    x1: e.bgX + xy.c,
                    y1: chart.padding("top") + axis.area("y"),
                    x2: e.bgX + xy.c,
                    y2: chart.padding("top") + axis.area("y2")
                });

                target.translate(xy.x, xy.y);
            });

            self.on("mouseout", function(obj, e) {
                if(!isActive) return;

                var tooltip = tooltips[obj.brush.index];
                tooltip.attr({ visibility: "hidden" });

                isActive = false;
            });
        }

        this.drawBefore = function() {
            lineHeight = chart.theme("tooltipFontSize") * RATIO;
        }

        this.draw = function() {
            var group = chart.svg.group(),
                list = this.getIndexArray(this.widget.brush);

            for(var i = 0; i < list.length; i++) {
                var brush = chart.get("brush", list[i]),
                    words = [ "" ];

                // 모든 타겟을 툴팁에 보여주는 옵션일 경우
                if(widget.all && brush.target.length > 1) {
                    for (var j = 1; j < brush.target.length; j++) {
                        words.push("");
                    }
                }

                tooltips[brush.index] = chart.svg.group({ visibility: "hidden" }, function() {
                    chart.svg.line({
                        "stroke-width": chart.theme("tooltipLineWidth"),
                        visibility: (widget.line) ? "visible" : "hidden"
                    });

                    chart.svg.group({}, function () {
                        chart.svg.polygon({
                            fill: chart.theme("tooltipBackgroundColor"),
                            "fill-opacity": chart.theme("tooltipBackgroundOpacity"),
                            "stroke-width": chart.theme("tooltipBorderWidth")
                        });

                        var text = chart.texts({
                            "font-size": chart.theme("tooltipFontSize"),
                            "fill": chart.theme("tooltipFontColor")
                        }, words, RATIO);

                        for(var i = 0; i < words.length; i++) {
                            text.get(i).append(chart.svg.tspan({ "text-anchor": "start", "font-weight": "bold", "x": PADDING }));
                            text.get(i).append(chart.svg.tspan({ "text-anchor": "end" }));
                        }
                    });
                });

                group.append(tooltips[brush.index]);
            }

            setTooltipEvent();

            return group;
        }
    }

    TooltipWidget.setup = function() {
        return {
            /** @cfg {"bottom"/"top"/"left"/"right"} Determines the side on which the tool tip is displayed (top, bottom, left, right). */
            orient: "top",
            /** @cfg {Boolean} [anchor=true] Remove tooltip's anchor */
            anchor: true,
            /** @cfg {Boolean} [all=false] Determines whether to show all values of row data.*/
            all: false,
            /** @cfg {Boolean} [line=false] Visible Guidelines. */
            line: false,
            /** @cfg {Boolean} [flip=false] When I went out of the area, reversing the tooltip. */
            flip: false,
            /** @cfg {Function} [format=null] Sets the format of the value that is displayed on the tool tip. */
            format: null,
            /** @cfg {Number} [brush=0] Specifies a brush index for which a widget is used. */
            brush: 0
        };
    }

    return TooltipWidget;
}, "chart.widget.core");
jui.define("chart.widget.title", [], function() {
    var TOP_PADDING = 25, PADDING = 20;

    /**
     * @class chart.widget.title
     * @extends chart.widget.core
     * @alias TitleWidget
     *
     */
    var TitleWidget = function(chart, axis, widget) {
        var x = 0, y = 0, anchor = "middle";

        this.drawBefore = function() {
            var axis = chart.axis(widget.axis);

            if(axis) {
                if (widget.orient == "bottom") {
                    y = axis.area("y2") + axis.padding("bottom") - PADDING;
                } else if (widget.orient == "top") {
                    y = axis.area("y") - axis.padding("top") + TOP_PADDING;
                } else {
                    y = axis.area("y") + axis.area("height") / 2;
                }

                if (widget.align == "center") {
                    x = axis.area("x") + axis.area("width") / 2;
                    anchor = "middle";
                } else if (widget.align == "start") {
                    x = axis.area("x") - axis.padding("left") + PADDING;
                    anchor = "start";
                } else {
                    x = axis.area("x2") + axis.padding("right") - PADDING;
                    anchor = "end";
                }

                x += chart.area("x");
                y += chart.area("y");
            } else {
                // @Deprecated 나중에 제거하기 (모든 샘플 axis 기반으로 변경할 것)
                if (widget.orient == "bottom") {
                    y = chart.area("y2") + chart.padding("bottom") - PADDING;
                } else if (widget.orient == "top") {
                    y = PADDING;
                } else {
                    y = chart.area("y") + chart.area("height") / 2
                }

                if (widget.align == "center") {
                    x = chart.area("x") + chart.area("width") / 2;
                    anchor = "middle";
                } else if (widget.align == "start") {
                    x = chart.area("x");
                    anchor = "start";
                } else {
                    x = chart.area("x2");
                    anchor = "end";
                }
            }
        }

        this.draw = function() {
            var obj = chart.svg.getTextSize(widget.text);

            var half_text_width = obj.width / 2,
                half_text_height = obj.height / 2;

            var text =  chart.text({
                x : x + widget.dx,
                y : y + widget.dy,
                "text-anchor" : anchor,
                "fill" : widget.color || chart.theme("titleFontColor"),
                "font-size" : widget.size || chart.theme("titleFontSize"),
                "font-weight" : chart.theme("titleFontWeight")
            }, widget.text);

            if (widget.orient == "center") {
                if (widget.align == "start") {
                    text.rotate(-90, x + widget.dx + half_text_width, y + widget.dy + half_text_height)
                } else if (widget.align == "end") {
                    text.rotate(90, x + widget.dx - half_text_width, y + widget.dy + half_text_height)
                }
            }

            return text;
        }
    }

    TitleWidget.setup = function() {
        return {
            axis: null,
            /** @cfg {"bottom"/"top"/"left"/"right" } [orient="top"]  Determines the side on which the tool tip is displayed (top, bottom, left, right). */
            orient: "top", // or bottom
            /** @cfg {"start"/"center"/"end" } [align="center"] Aligns the title message (center, start, end).*/
            align: "center",
            /** @cfg {String} [text=""] Sets the title message. */
            text: "",
            /** @cfg {Number} [dx=0] Moves the x coordinate by a set value from the location where the chart is drawn.  */
            dx: 0,
            /** @cfg {Number} [dy=0] Moves the y coordinate by a set value from the location where the chart is drawn. */
            dy: 0,
            /** @cfg {Number} [size=null] Sets the title message size. */
            size: null,
            /** @cfg {String} [string=null] Sets the title message color. */
            color: null
        }
    }

    return TitleWidget;
}, "chart.widget.core");
jui.define("chart.widget.legend", [ "util.base" ], function(_) {
    var WIDTH = 17, HEIGHT = 13, PADDING = 10, RADIUS = 5.5, RATIO = 1.2, POINT = 2;

    /**
     * @class chart.widget.legend
     * implements legend widget
     * @extends chart.widget.core
     * @alias LegendWidget
     * @requires util.base
     *
     */
    var LegendWidget = function(chart, axis, widget) {
        var columns = [];
        var colorIndex = {};

        function getIndexArray(brush) {
            var list = [ 0 ];

            if(_.typeCheck("array", brush)) {
                list = brush;
            } else if(_.typeCheck("integer", brush)) {
                list = [ brush ];
            }

            return list;
        }

        function getBrushAll() {
            var list = getIndexArray(widget.brush),
                result = [];

            for(var i = 0; i < list.length; i++) {
                result[i] = chart.get("brush", list[i]);
            }

            return result;
        }

        function setLegendStatus(brush) {
            if(!widget.filter) return;

            if(!columns[brush.index]) {
                columns[brush.index] = {};
            }

            for(var i = 0; i < brush.target.length; i++) {
                columns[brush.index][brush.target[i]] = true;
            }
        }

        function changeTargetOption(brushList) {
            var target = [],
                colors = [],
                index = brushList[0].index;

            for(var key in columns[index]) {
                if(columns[index][key]) {
                    target.push(key);
                    colors.push(colorIndex[key]);
                }
            }

            for(var i = 0; i < brushList.length; i++) {
                chart.updateBrush(brushList[i].index, {
                    target: target,
                    colors: colors
                });
            }

            // 차트 렌더링이 활성화되지 않았을 경우
            if(!chart.isRender()) {
                chart.render();
            }

            chart.emit("legend.filter", [ target ]);
        }

		this.getLegendIcon = function(brush) {
            var arr = [],
                data = brush.target,
                count = data.length;
			
			for(var i = 0; i < count; i++) {
                var group = chart.svg.group(),
                    target = brush.target[i],
                    text = target,
                    color = chart.color(i, widget.colors || brush.colors);

                // 컬러 인덱스 설정
                colorIndex[target] = color;

                // 타겟 별 포맷 설정
                if(_.typeCheck("function", widget.format)) {
                    text = this.format(target);
                }

                // 텍스트 길이 구하기
                var rect = chart.svg.getTextSize(text);

                if(widget.filter) {
                    group.append(chart.svg.line({
                        x1: 0,
                        x2: WIDTH,
                        y1: -(RADIUS / 2),
                        y2: -(RADIUS / 2),
                        stroke: color,
                        "stroke-width": HEIGHT,
                        "stroke-linecap": "round"
                    }));

                    group.append(chart.svg.circle({
                        cx : WIDTH,
                        cy : -(RADIUS / 2),
                        r : RADIUS,
                        fill : chart.theme("legendSwitchCircleColor")
                    }));

                    group.append(chart.text({
                        x : WIDTH + PADDING,
                        y : 0,
                        "font-size" : chart.theme("legendFontSize"),
                        "fill" : chart.theme("legendFontColor"),
                        "text-anchor" : "start"
                    }, text));

                    arr.push({
                        icon : group,
                        width : WIDTH + rect.width + (PADDING * 2.5),
                        height : HEIGHT + (PADDING / 2)
                    });

                    (function(key, element) {
                        element.attr({
                            cursor: "pointer"
                        });

                        element.on("click", function(e) {
                            if(columns[brush.index][key]) {
                                element.get(0).attr({ stroke: chart.theme("legendSwitchDisableColor") });
                                element.get(2).attr({ fill: chart.theme("legendSwitchDisableColor") });
                                element.get(1).attr({ cx: 0 });
                                columns[brush.index][key] = false;
                            } else {
                                element.get(0).attr({ stroke: colorIndex[key] });
                                element.get(2).attr({ fill: chart.theme("legendFontColor") });
                                element.get(1).attr({ cx: WIDTH });
                                columns[brush.index][key] = true;
                            }

                            changeTargetOption((widget.brushSync) ? getBrushAll() : [ brush ]);
                        });
                    })(target, group);
                } else {
                    var size = chart.theme("legendFontSize");

                    if(widget.icon != null) {
                        var icon = _.typeCheck("function", widget.icon) ? widget.icon.apply(chart, [ target ]) : widget.icon;

                        group.append(chart.text({
                            x: 0,
                            y: POINT,
                            "font-size": size,
                            "fill": color
                        }, icon));
                    } else {
                        group.append(chart.svg.circle({
                            cx : size / 2,
                            cy : -POINT,
                            r : size / 2,
                            fill : color
                        }));
                    }

                    group.append(chart.text({
                        x : size * RATIO,
                        y : 0,
                        "font-size" : size,
                        "fill" : chart.theme("legendFontColor"),
                        "text-anchor" : "start"
                    }, text));

                    arr.push({
                        icon : group,
                        width : size + rect.width + (PADDING * 2),
                        height : HEIGHT + (PADDING / 2)
                    });
                }
			}
			
			return arr;
		}        
        
        this.draw = function() {
            var group = chart.svg.group();
            
            var x = 0,
                y = 0,
                total_width = 0,
                total_height = 0,
                max_width = 0,
                max_height = 0,
                brushes = getIndexArray(widget.brush);

            var total_widthes = [];

            for(var i = 0; i < brushes.length; i++) {
                var index = brushes[i];

                // brushSync가 true일 경우, 한번만 실행함
                if(widget.brushSync && i > 0) continue;

                var brush = chart.get("brush", brushes[index]),
                    arr = this.getLegendIcon(brush);

                for(var k = 0; k < arr.length; k++) {
                    group.append(arr[k].icon);
                    arr[k].icon.translate(x, y);

                    if (widget.orient == "bottom" || widget.orient == "top") {

                        if (x + arr[k].width > chart.area('x2')) {
                            x = 0;
                            y += arr[k].height;
                            max_height += arr[k].height;
                            total_widthes.push(total_width);
                            total_width = 0; 
                        } else {
                            x += arr[k].width;
                            total_width += arr[k].width;
                        }

                        if (max_height < arr[k].height) {
                            max_height = arr[k].height;
                        }
                    } else {
                        y += arr[k].height;
                        total_height += arr[k].height;

                        if (max_width < arr[k].width) {
                            max_width = arr[k].width;
                        }
                    }
                }
                
                if (total_width > 0) {
                    total_widthes.push(total_width);
                }
                
                total_width  = Math.max.apply(Math, total_widthes);

                setLegendStatus(brush);
            }
            
            // legend 위치  선정
            if (widget.orient == "bottom" || widget.orient == "top") {
                var y = ((widget.orient == "bottom") ?
                    chart.area("y2") + chart.padding("bottom") - max_height :
                    chart.area("y") - chart.padding("top")) + PADDING;
                
                if (widget.align == "start") {
                    x = chart.area("x");
                } else if (widget.align == "center") {
                    x = chart.area("x") + (chart.area("width") / 2- total_width / 2);
                } else if (widget.align == "end") {
                    x = chart.area("x2") - total_width;
                }
            } else {
                var x = ((widget.orient == "left") ?
                    chart.area("x") - chart.padding("left") :
                    chart.area("x2") + chart.padding("right") - max_width) + PADDING;
                
                if (widget.align == "start") {
                    y = chart.area("y");
                } else if (widget.align == "center") {
                    y = chart.area("y") + (chart.area("height") / 2 - total_height / 2);
                } else if (widget.align == "end") {
                    y = chart.area("y2") - total_height;
                }
            } 
            
            group.translate(Math.floor(x), Math.floor(y));

            return group;
        }
    }

    LegendWidget.setup = function() {
        return {
            /** @cfg {"bottom"/"top"/"left"/"right" } Sets the location where the label is displayed (top, bottom). */
            orient: "bottom",
            /** @cfg {"start"/"center"/"end" } Aligns the label (center, start, end). */
            align: "center", // or start, end
            /** @cfg {Boolean} [filter=false] Performs filtering so that only label(s) selected by the brush can be shown. */
            filter: false,
            /** @cfg {Function/String} [icon=null]   */
            icon: null,
            /** @cfg {Array} [colors=null]   */
            colors: null,
            /** @cfg {Boolean} [brushSync=false] Applies all brushes equally when using a filter function. */
            brushSync: false,
            /** @cfg {Number/Array} [brush=0] Specifies a brush index for which a widget is used. */
            brush: 0,
            /** @cfg {Function} [format=null] Sets the format of the key that is displayed on the legend. */
            format: null
        };
    }

    /**
     * @event legend_filter
     * Event that occurs when the filter function of the legend widget is activated. (real name ``` legend.filter ```)
     * @param {String} target The selected data field.
     */

    return LegendWidget;
}, "chart.widget.core");
jui.define("chart.widget.zoom", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.zoom
     * @extends chart.widget.core
     * @alias ZoomWidget
     * @requires util.base
     */
    var ZoomWidget = function() {
        var self = this,
            top = 0,
            left = 0;

        function setDragEvent(axisIndex, thumb, bg) {
            var axis = self.chart.axis(axisIndex),
                xtype = axis.get("x").type,
                startDate = null, // only date
                isMove = false,
                mouseStart = 0,
                thumbWidth = 0;

            self.on("axis.mousedown", function(e) {
                if(isMove) return;

                isMove = true;
                mouseStart = e.bgX;

                if(xtype == "date") { // x축이 date일 때
                    startDate = axis.x.invert(e.chartX);
                }

                self.chart.emit("zoom.start");
            }, axisIndex);

            self.on("axis.mousemove", function(e) {
                if(!isMove) return;

                thumbWidth = e.bgX - mouseStart;

                if(thumbWidth > 0) {
                    thumb.attr({
                        width: thumbWidth
                    });

                    thumb.translate(mouseStart, top + axis.area("y"));
                } else {
                    thumb.attr({
                        width: Math.abs(thumbWidth)
                    });

                    thumb.translate(mouseStart + thumbWidth, top + axis.area("y"));
                }
            }, axisIndex);

            self.on("axis.mouseup", endZoomAction, axisIndex);
            self.on("chart.mouseup", endZoomAction);
            self.on("bg.mouseup", endZoomAction);
            self.on("bg.mouseout", endZoomAction);

            function endZoomAction(e) {
                var args = [];

                isMove = false;
                if(thumbWidth == 0) return;

                if(xtype == "block") {
                    args = updateBlockGrid();
                } else if(xtype == "date") {
                    if(startDate != null) {
                        args = updateDateGrid(axis.x.invert(e.chartX));
                    }
                }

                resetDragStatus();
                self.chart.emit("zoom.end", args);
            }

            function updateBlockGrid() {
                var tick = axis.area("width") / (axis.end - axis.start),
                    x = ((thumbWidth > 0) ? mouseStart : mouseStart + thumbWidth) - left,
                    start = Math.floor(x / tick) + axis.start,
                    end = Math.ceil((x + Math.abs(thumbWidth)) / tick) + axis.start;

                // 차트 줌
                if(start < end) {
                    axis.zoom(start, end);
                    bg.attr({ "visibility": "visible" });

                    // 차트 렌더링이 활성화되지 않았을 경우
                    if(!self.chart.isRender()) {
                        self.chart.render();
                    }

                    return [ start, end ];
                }
            }

            function updateDateGrid(endDate) {
                var stime = startDate.getTime(),
                    etime = endDate.getTime();

                if(stime >= etime) return;

                var interval = self.widget.interval,
                    format = self.widget.format;

                // interval 콜백 옵션 설정
                if(_.typeCheck("function", interval)) {
                    interval = interval.apply(self.chart, [ stime, etime ]);
                }
                // format 콜백 옵션 설정
                if(_.typeCheck("function", format)) {
                    format = format.apply(self.chart, [ stime, etime ]);
                }

                axis.updateGrid("x", {
                    domain: [ stime, etime ],
                    interval: (interval != null) ? interval : axis.get("x").interval,
                    format: (format != null) ? format : axis.get("x").format
                });
                bg.attr({ "visibility": "visible" });

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!self.chart.isRender()) {
                    self.chart.render();
                }

                return [ stime, etime ];
            }

            function resetDragStatus() { // 엘리먼트 및 데이터 초기화
                isMove = false;
                mouseStart = 0;
                thumbWidth = 0;
                startDate = null;

                thumb.attr({
                    width: 0
                });
            }
        }

        this.drawSection = function(axisIndex) {
            var axis = this.chart.axis(axisIndex),
                xtype = axis.get("x").type,
                domain = axis.get("x").domain,
                interval = axis.get("x").interval,
                format = axis.get("x").format,
                cw = axis.area("width"),
                ch = axis.area("height"),
                r = 12;

            return this.chart.svg.group({}, function() {
                var thumb = self.chart.svg.rect({
                    height: ch,
                    fill: self.chart.theme("zoomBackgroundColor"),
                    opacity: 0.3
                });

                var bg = self.chart.svg.group({
                    visibility: "hidden"
                }, function() {
                    self.chart.svg.rect({
                        width: cw,
                        height: ch,
                        fill: self.chart.theme("zoomFocusColor"),
                        opacity: 0.2
                    });

                    self.chart.svg.group({
                        cursor: "pointer"
                    }, function() {
                        self.chart.svg.circle({
                            r: r,
                            cx: cw,
                            cy: 0,
                            opacity: 0
                        });

                        self.chart.svg.path({
                            d: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16.9,15.5l-1.4,1.4L12,13.4l-3.5,3.5 l-1.4-1.4l3.5-3.5L7.1,8.5l1.4-1.4l3.5,3.5l3.5-3.5l1.4,1.4L13.4,12L16.9,15.5z",
                            fill: self.chart.theme("zoomFocusColor")
                        }).translate(cw - r, -r);
                    }).on("click", function(e) {
                        bg.attr({ visibility: "hidden" });

                        if(xtype == "block") {
                            axis.screen(1);
                        } else if(xtype == "date") {
                            axis.updateGrid("x", {
                                domain: domain,
                                interval: interval,
                                format: format
                            });
                        }

                        // 차트 렌더링이 활성화되지 않았을 경우
                        if(!self.chart.isRender()) {
                            self.chart.render();
                        }

                        // 줌 종료
                        self.chart.emit("zoom.close");
                    });

                }).translate(left + axis.area("x"), top + axis.area("y"));

                setDragEvent(axisIndex, thumb, bg);
            });
        }

        this.drawBefore = function() {
            top = this.chart.padding("top");
            left = this.chart.padding("left");
        }

        this.draw = function() {
            var g = this.chart.svg.group(),
                list = (_.typeCheck("array", this.widget.axis)) ? this.widget.axis : [ this.widget.axis ];

            for (var i = 0; i < list.length; i++) {
                g.append(this.drawSection(list[i]));
            }

            return g;
        }
    }

    ZoomWidget.setup = function() {
        return {
            axis: 0,

            /** @cfg {Number} [interval=1000] Sets the interval of the scale displayed on a grid.*/
            interval: null,
            /** @cfg {Function} [format=null]  Determines whether to format the value on an axis. */
            format: null
        }
    }

    return ZoomWidget;
}, "chart.widget.core");
jui.define("chart.widget.zoomscroll", [ "util.base", "chart.builder" ], function (_, builder) {

    /**
     * @class chart.widget.zoomscroll
     * @extends chart.widget.core
     * @alias ScrollWidget
     * @requires util.base
     */
    var ZoomScrollWidget = function() {
        var self = this,
            axis = null;

        var w = null, // width
            h = null, // height
            b = null, // area border width
            size = 0, // button size
            radius = null, // button round
            tick = 0,
            start = null,
            end = null,
            count = null;

        var l_rect = null,
            l_ctrl = null,
            r_rect = null,
            r_ctrl = null,
            c_rect = null;

        function setDragEvent(bg, ctrl, isLeft) {
            var isMove = false,
                isCenter = false,
                mouseStart = 0,
                centerStart = 0,
                bgWidth = 0;

            ctrl.on("mousedown", function(e) {
                if(isMove) return;

                isCenter = (bg == null) ? true : false;
                isMove = true;

                if(isCenter) {
                    bgWidth = ctrl.size().width;
                    centerStart = l_rect.size().width;
                    mouseStart = e.x;
                } else {
                    bgWidth = bg.size().width;
                    mouseStart = e.x;
                }

                // 커스텀 이벤트 발생
                self.chart.emit("zoomscroll.dragstart");
            });

            self.on("chart.mousemove", dragZoomAction);
            self.on("bg.mousemove", dragZoomAction);
            self.on("chart.mouseup", endZoomAction);
            self.on("bg.mouseup", endZoomAction);

            function dragZoomAction(e) {
                if(!isMove) return;
                var dis = e.x - mouseStart;

                if(isCenter) {
                    var tw = centerStart + dis,
                        rw = tw + bgWidth,
                        val = Math.floor(tw / tick) - start;

                    if(tw > 0 && tw + bgWidth < w) {
                        l_rect.round(tw, h, radius, 0, 0, radius);
                        l_ctrl.attr({ x: tw - size / 2 });
                        r_rect.round(w - rw, h, 0, radius, radius, 0);
                        r_rect.translate(rw, 0);
                        r_ctrl.attr({ x: rw - size / 2 });
                        c_rect.translate(tw, 0);

                        start += val;
                        end += val;
                    }
                } else {
                    if(isLeft) {
                        var tw = bgWidth + dis;

                        if(tw < 0) return;
                        if(!preventDragAction(tw) && dis > 0) return;

                        bg.round(tw, h, radius, 0, 0, radius);
                        ctrl.attr({ x: tw - size/2 });

                        // 가운데 영역
                        c_rect.attr({ width: w - l_rect.size().width - r_rect.size().width });
                        c_rect.translate(tw, 0);

                        start = Math.floor(tw / tick);
                    } else {
                        var tw = bgWidth - dis;

                        if(tw < 0) return;
                        if(!preventDragAction(tw) && dis < 0) return;

                        bg.round(tw, h, 0, radius, radius, 0);
                        bg.translate(w - tw, 0);
                        ctrl.attr({ x: w - tw - size/2 });

                        // 가운데 영역
                        c_rect.attr({ width: w - l_rect.size().width - r_rect.size().width });

                        end = count - Math.floor(tw / tick);
                    }
                }
            }

            function endZoomAction() {
                if(!isMove) return;

                isMove = false;
                var axes = self.chart.axis();

                // 차트 렌더링 이전에 커스텀 이벤트 발생
                self.chart.emit("zoomscroll.dragend", [ start, end - 1 ]);

                for(var i = 0; i < axes.length; i++) {
                    axes[i].zoom(start, end - 1);
                }

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!self.chart.isRender()) {
                    self.chart.render();
                }

                // 차트 렌더링 이후에 커스텀 이벤트 발생
                self.chart.emit("zoomscroll.render", [ start, end - 1 ]);
            }

            function preventDragAction() {
                var t = r_rect.data("translate"),
                    l = l_rect.size().width,
                    r = parseInt(t.split(",")[0]),
                    max = r - tick/2;

                // 좌/우 버튼 교차 방지
                if (l < max) {
                    return true;
                }

                return false;
            }
        }

        function createChartImage() {
            var size = self.chart.theme("zoomScrollGridFontSize");

            var image = builder(null, {
                width: w,
                height: h,
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: size + 8
                },
                axis: {
                    x: _.extend({
                        hide: false,
                        line: "solid",
                        format: self.widget.format
                    }, axis.get("x"), true),
                    y: _.extend({
                        hide: true,
                        line: false
                    }, axis.get("y"), true),
                    data: axis.origin
                },
                brush: [{
                    type: self.widget.symbol,
                    target: [ self.widget.key ],
                    colors: [ self.widget.color ]
                }],
                style: {
                    backgroundColor: "transparent",
                    gridXFontSize : size,
                    gridTickPadding : self.chart.theme("zoomScrollGridTickPadding"),
                    areaBackgroundOpacity: self.chart.theme("zoomScrollBrushAreaBackgroundOpacity"),
                    lineBorderWidth: self.chart.theme("zoomScrollBrushLineBorderWidth")
                }
            });

            return image.svg.toDataURI();
        }

        this.drawBefore = function() {
            axis = this.chart.axis(this.widget.axis);
            count = axis.origin.length;
            start = axis.start;
            end = axis.end;
            b = this.chart.theme("zoomScrollAreaBorderWidth");
            w = this.chart.area("width") - b*2;
            h = this.chart.theme("zoomScrollBackgroundSize") - b*2;
            size = this.chart.theme("zoomScrollButtonSize");
            radius = this.chart.theme("zoomScrollAreaBorderRadius");
            tick = w / count;
        }

        this.draw = function() {
            var btnImage = this.chart.theme("zoomScrollButtonImage");

            var areaStyle = {
                fill: this.chart.theme("zoomScrollAreaBackgroundColor"),
                "fill-opacity": this.chart.theme("zoomScrollAreaBackgroundOpacity"),
                stroke: this.chart.theme("zoomScrollAreaBorderColor"),
                "stroke-width": b
            };

            return this.svg.group({}, function() {
                var lw = start * tick,
                    rw = (count - end) * tick;

                if(isNaN(lw) || isNaN(rw)) {
                    return;
                }

                self.svg.image({
                    width: w,
                    height: h,
                    "xlink:href": createChartImage()
                });

                l_rect = self.svg.pathRect(areaStyle);
                l_rect.round(lw, h, radius, 0, 0, radius);

                r_rect = self.svg.pathRect(areaStyle);
                r_rect.round(rw, h, 0, radius, radius, 0);
                r_rect.translate(w - rw, 0);

                c_rect = self.svg.rect({
                    width: w - lw - rw,
                    height: h,
                    fill: "transparent",
                    "fill-opacity": 0,
                    stroke: self.chart.color(self.widget.color),
                    "stroke-width": b,
                    cursor: "move"
                }).translate(lw, 0);

                l_ctrl = self.svg.image({
                    x: lw - size/2,
                    y: h / 2 - size/2,
                    width: size,
                    height: size,
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xlink:href": btnImage,
                    cursor: "e-resize"
                });
                r_ctrl = self.svg.image({
                    x: w - rw - size/2,
                    y: h / 2 - size/2,
                    width: size,
                    height: size,
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xlink:href": btnImage,
                    cursor: "e-resize"
                });

                setDragEvent(l_rect, l_ctrl, true);
                setDragEvent(r_rect, r_ctrl, false);
                setDragEvent(null, c_rect);

            }).translate(
                this.widget.dx + this.chart.area("x"),
                this.widget.dy + this.chart.area("y2") - b
            );
        }
    }

    ZoomScrollWidget.setup = function() {
        return {
            symbol : "area",
            key : null,
            color : 0,
            format : null,
            axis : 0,
            dx : 0,
            dy : 0
        }
    }

    return ZoomScrollWidget;
}, "chart.widget.core");
jui.define("chart.widget.scroll", [ "util.base" ], function (_) {

    /**
     * @class chart.widget.scroll
     * @extends chart.widget.core
     * @alias ScrollWidget
     * @requires util.base
     */
    var ScrollWidget = function(chart, axis, widget) {
        var self = this;
        var thumbWidth = 0,
            thumbLeft = 0,
            bufferCount = 0,
            dataLength = 0,
            totalWidth = 0,
            piece = 0,
            rate = 0 ;

        function setScrollEvent(thumb) {
            var isMove = false,
                mouseStart = 0,
                thumbStart = 0,
                axies = chart.axis();

            self.on("bg.mousedown", mousedown);
            self.on("chart.mousedown", mousedown);
            self.on("bg.mousemove", mousemove);
            self.on("bg.mouseup", mouseup);
            self.on("chart.mousemove", mousemove);
            self.on("chart.mouseup", mouseup);

            function mousedown(e) {
                if(isMove && thumb.element != e.target) return;

                isMove = true;
                mouseStart = e.bgX;
                thumbStart = thumbLeft;
            }

            function mousemove(e) {
                if(!isMove) return;

                var gap = thumbStart + e.bgX - mouseStart;

                if(gap < 0) {
                    gap = 0;
                } else {
                    if(gap + thumbWidth > chart.area("width")) {
                        gap = chart.area("width") - thumbWidth;
                    }
                }

                thumb.translate(gap, 1);
                thumbLeft = gap;

                var startgap = gap * rate,
                    start = startgap == 0 ? 0 : Math.floor(startgap / piece);

                if(gap + thumbWidth == chart.area("width")) {
                    start += 1;
                }

                for(var i = 0; i < axies.length; i++) {
                    axies[i].zoom(start, start + bufferCount);
                }

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!chart.isRender()) {
                    chart.render();
                }
            }

            function mouseup(e) {
                if(!isMove) return;

                isMove = false;
                mouseStart = 0;
                thumbStart = 0;
            }
        }

        this.drawBefore = function() {
			dataLength =  axis.origin.length;
			bufferCount = axis.buffer;
			piece = chart.area("width") / bufferCount;
			totalWidth = piece * dataLength;
			rate = totalWidth / chart.area("width");
            thumbWidth = chart.area("width") * (bufferCount / dataLength) + 2;
        }

        this.draw = function() {
            var bgSize = chart.theme("scrollBackgroundSize"),
                bgY = (widget.orient == "top") ? chart.area("y") - bgSize : chart.area("y2");

            return chart.svg.group({}, function() {
                chart.svg.rect({
                    width: chart.area("width"),
                    height: bgSize,
                    fill: chart.theme("scrollBackgroundColor")
                });

                var thumb = chart.svg.rect({
                    width: thumbWidth,
                    height: bgSize - 2,
                    fill: chart.theme("scrollThumbBackgroundColor"),
                    stroke: chart.theme("scrollThumbBorderColor"),
                    cursor: "pointer",
                    "stroke-width": 1
                }).translate(thumbLeft, 1);

                // 차트 스크롤 이벤트
                setScrollEvent(thumb);

            }).translate(chart.area("x"), bgY);
        }
    }

    ScrollWidget.setup = function() {
        return {
            orient : "bottom"
        }
    }

    return ScrollWidget;
}, "chart.widget.core");
jui.define("chart.widget.vscroll", [ "util.base" ], function (_) {

    /**
     * @class chart.widget.vscroll
     * @extends chart.widget.core
     * @alias ScrollWidget
     * @requires util.base
     */
    var VScrollWidget = function(chart, axis, widget) {
        var self = this;
        var thumbHeight = 0,
            thumbTop = 0,
            bufferCount = 0,
            dataLength = 0,
            totalHeight = 0,
            piece = 0,
            rate = 0 ;

        function setScrollEvent(thumb) {
            var isMove = false,
                mouseStart = 0,
                thumbStart = 0,
                axies = chart.axis();

            self.on("bg.mousedown", mousedown);
            self.on("chart.mousedown", mousedown);
            self.on("bg.mousemove", mousemove);
            self.on("bg.mouseup", mouseup);
            self.on("chart.mousemove", mousemove);
            self.on("chart.mouseup", mouseup);

            function mousedown(e) {
                if(isMove && thumb.element != e.target) return;

                isMove = true;
                mouseStart = e.bgY;
                thumbStart = thumbTop;
            }

            function mousemove(e) {
                if(!isMove) return;

                var gap = thumbStart + e.bgY - mouseStart;

                if(gap < 0) {
                    gap = 0;
                } else {
                    if(gap + thumbHeight > chart.area("height")) {
                        gap = chart.area("height") - thumbHeight;
                    }
                }

                thumb.translate(1, gap);
                thumbTop = gap;

                var startgap = gap * rate,
                    start = startgap == 0 ? 0 : Math.floor(startgap / piece);

                if(gap + thumbHeight == chart.area("height")) {
                    start += 1;
                }

                for(var i = 0; i < axies.length; i++) {
                    axies[i].zoom(start, start + bufferCount);
                }

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!chart.isRender()) {
                    chart.render();
                }
            }

            function mouseup(e) {
                if(!isMove) return;

                isMove = false;
                mouseStart = 0;
                thumbStart = 0;
            }
        }

        this.drawBefore = function() {
			dataLength =  axis.origin.length;
			bufferCount = axis.buffer;
			piece = chart.area("height") / bufferCount;
			totalHeight = piece * dataLength;
			rate = totalHeight / chart.area("height");
            thumbHeight = chart.area("height") * (bufferCount / dataLength) + 2;
        }

        this.draw = function() {
            var bgSize = chart.theme("scrollBackgroundSize"),
                bgX = (widget.orient == "right") ? chart.area("x2") : chart.area("x") - bgSize;

            return chart.svg.group({}, function() {
                chart.svg.rect({
                    width: bgSize,
                    height: chart.area("height"),
                    fill: chart.theme("scrollBackgroundColor")
                });

                var thumb = chart.svg.rect({
                    width: bgSize - 2,
                    height: thumbHeight,
                    fill: chart.theme("scrollThumbBackgroundColor"),
                    stroke: chart.theme("scrollThumbBorderColor"),
                    cursor: "pointer",
                    "stroke-width": 1
                }).translate(1, thumbTop);

                // 차트 스크롤 이벤트
                setScrollEvent(thumb);

            }).translate(bgX, chart.area("y"));
        }
    }

    VScrollWidget.setup = function() {
        return {
            orient : "left"
        }
    }

    return VScrollWidget;
}, "chart.widget.core");
jui.define("chart.widget.cross", [ "util.base" ], function(_) {


    /**
     * @class chart.widget.cross
     * @extends chart.widget.core
     * @alias CoreWidget
     * @requires util.base
     *
     */
    var CrossWidget = function(chart, axis, widget) {
        var self = this;
        var tw = 50, th = 18, ta = tw / 10; // 툴팁 넓이, 높이, 앵커 크기
        var pl = 0, pt = 0; // 엑시스까지의 여백
        var g, xline, yline, xTooltip, yTooltip;
        var tspan = [];

        function printTooltip(index, text, message) {
            if(!tspan[index]) {
                var elem = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                text.element.appendChild(elem);
                tspan[index] = elem;
            }

            tspan[index].textContent = message;
        }

        this.drawBefore = function() {
            // 위젯 옵션에 따라 엑시스 변경
            axis = this.chart.axis(widget.axis);

            // 엑시스 여백 값 가져오기
            pl = chart.padding("left") + axis.area("x");
            pt = chart.padding("top") + axis.area("y");

            g = chart.svg.group({
                visibility: "hidden"
            }, function() {
                // 포맷 옵션이 없을 경우, 툴팁을 생성하지 않음
                if(_.typeCheck("function", widget.yFormat)) {
                    xline = chart.svg.line({
                        x1: 0,
                        y1: 0,
                        x2: axis.area("width"),
                        y2: 0,
                        stroke: chart.theme("crossBorderColor"),
                        "stroke-width": chart.theme("crossBorderWidth"),
                        opacity: chart.theme("crossBorderOpacity")
                    });

                    yTooltip = chart.svg.group({}, function () {
                        chart.svg.polygon({
                            fill: chart.theme("crossBalloonBackgroundColor"),
                            "fill-opacity": chart.theme("crossBalloonBackgroundOpacity"),
                            points: self.balloonPoints("left", tw, th, ta)
                        });

                        chart.text({
                            "font-size": chart.theme("crossBalloonFontSize"),
                            "fill": chart.theme("crossBalloonFontColor"),
                            "text-anchor": "middle",
                            x: tw / 2,
                            y: 12
                        });
                    }).translate(-(tw + ta), 0);
                }

                if(_.typeCheck("function", widget.xFormat)) {
                    yline = chart.svg.line({
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: axis.area("height"),
                        stroke: chart.theme("crossBorderColor"),
                        "stroke-width": chart.theme("crossBorderWidth"),
                        opacity: chart.theme("crossBorderOpacity")
                    });

                    xTooltip = chart.svg.group({}, function () {
                        chart.svg.polygon({
                            fill: chart.theme("crossBalloonBackgroundColor"),
                            "fill-opacity": chart.theme("crossBalloonBackgroundOpacity"),
                            points: self.balloonPoints("bottom", tw, th, ta)
                        });

                        chart.text({
                            "font-size": chart.theme("crossBalloonFontSize"),
                            "fill": chart.theme("crossBalloonFontColor"),
                            "text-anchor": "middle",
                            x: tw / 2,
                            y: 17
                        });
                    }).translate(0, axis.area("height") + ta);
                }
            }).translate(pl, pt);
        }

        this.draw = function() {
            this.on("axis.mouseover", function(e) {
                g.attr({ visibility: "visible" });
            }, widget.axis);

            this.on("axis.mouseout", function(e) {
                g.attr({ visibility: "hidden" });
            }, widget.axis);

            this.on("axis.mousemove", function(e) {
                var left = e.bgX - pl,
                    top = e.bgY - pt + 2;

                if(xline) {
                    xline.attr({
                        y1: top,
                        y2: top
                    });
                }

                if(yline) {
                    yline.attr({
                        x1: left,
                        x2: left
                    });
                }

                // 포맷 옵션이 없을 경우, 처리하지 않음
                if(yTooltip) {
                    yTooltip.translate(-(tw + ta), top - (th / 2));

                    var value = axis.y.invert(e.chartY),
                        message = widget.yFormat.call(self.chart, value);
                    printTooltip(0, yTooltip.get(1), message);
                }

                if(xTooltip) {
                    xTooltip.translate(left - (tw / 2), axis.area("height") + ta);

                    var value = axis.x.invert(e.chartX),
                        message = widget.xFormat.call(self.chart, value);
                    printTooltip(1, xTooltip.get(1), message);
                }
            }, widget.axis);

            return g;
        }
    }

    CrossWidget.setup = function() {
        return {
            axis: 0,

            /**
             * @cfg {Function} [xFormat=null] Sets the format for the value on the X axis shown on the tooltip.
             */            
            xFormat: null,
            /**
             * @cfg {Function} [yFormat=null] Sets the format for the value on the Y axis shown on the tooltip.
             */
            yFormat: null
        };
    }

    return CrossWidget;
}, "chart.widget.core");
jui.define("chart.widget.topologyctrl", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.topologyctrl
     * @extends chart.widget.core
     */
    var TopologyControlWidget = function() {
        var self = this, axis = null;
        var targetKey, startX, startY;
        var renderWait = false;
        var scale = 1, boxX = 0, boxY = 0;
        var nodeIndex = 0;

        function renderChart() {
            if(renderWait === false) {
                setTimeout(function () {
                    self.chart.render();
                    setBrushEvent();

                    renderWait = false;
                }, 70);

                renderWait = true;
            }
        }

        function initDragEvent() {
            self.on("axis.mousemove", function(e) {
                axis.root.attr({ cursor: "move" });
                if(!_.typeCheck("string", targetKey)) return;

                var xy = axis.c(targetKey),
                    dragX = e.chartX / xy.scale,
                    dragY = e.chartY / xy.scale;

                xy.setX(startX + (dragX - startX));
                xy.setY(startY + (dragY - startY));

                renderChart();
            }, axis.index);

            self.on("axis.mouseup", endDragAction, axis.index);
            self.on("bg.mouseup", endDragAction);
            self.on("bg.mouseout", endDragAction);

            function endDragAction(e) {
                if(!_.typeCheck("string", targetKey)) return;
                targetKey = null;
            }
        }

        function initZoomEvent() {
            self.on("axis.mousewheel", function(e) {
                var e = window.event || e,
                    delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
                    xy = axis.c(targetKey);

                if(delta > 0) {
                    if(scale < 2) {
                        scale += 0.1;
                    }
                } else {
                    if(scale > 0.6) {
                        scale -= 0.1;
                    }
                }

                xy.setScale(scale);
                renderChart();
            }, axis.index);
        }

        function initMoveEvent() {
            var startX = null, startY = null;

            self.on("axis.mousedown", function(e) {
                if(_.typeCheck("string", targetKey)) return;
                if(startX != null || startY != null) return;

                startX = boxX + e.x;
                startY = boxY + e.y;
            }, axis.index);

            self.on("axis.mousemove", function(e) {
                if(startX == null || startY == null) return;

                var xy = axis.c(targetKey);
                boxX = startX - e.x;
                boxY = startY - e.y

                xy.setView(-boxX, -boxY);
                renderChart();
            }, axis.index);

            self.on("chart.mouseup", endMoveAction);
            self.on("chart.mouseout", endMoveAction);
            self.on("bg.mouseup", endMoveAction);
            self.on("bg.mouseout", endMoveAction);

            function endMoveAction(e) {
                if(startX == null || startY == null) return;

                startX = null;
                startY = null;
            }
        }

        function getBrushElement() {
            var children = self.svg.root.get(0).children,
                index = 0,
                element = null;

            for(var i = 0; i < children.length; i++) {
                var cls = children[i].attr("class");

                if(cls && cls.indexOf("topologynode") != -1) {
                    if(index == self.widget.brush) {
                        element = children[i];
                        break;
                    }

                    index++;
                }
            }

            return element;
        }

        function setBrushEvent() {
            var element = getBrushElement();
            if(element == null) return;

            element.each(function (i, node) {
                (function (index) {
                    if (isNaN(index)) return;

                    node.on("mousedown", function (e) {
                        if (_.typeCheck("string", targetKey)) return;

                        var key = axis.getValue(axis.data[index], "key"),
                            xy = axis.c(key);

                        targetKey = key;
                        startX = xy.x / xy.scale;
                        startY = xy.y / xy.scale;

                        axis.cache.activeNodeKey = targetKey;

                        // 선택한 노드 맨 마지막으로 이동
                        //xy.moveLast();
                    });
                })(parseInt(node.attr("index")));
            });
        }

        this.draw = function() {
            var brush = this.chart.get("brush", this.widget.brush);

            // axis 글로벌 변수에 설정
            axis = this.chart.axis(brush.axis);

            if(this.widget.zoom) {
                initZoomEvent(axis);
            }

            if(this.widget.move) {
                initMoveEvent(axis);
            }

            initDragEvent(axis);
            setBrushEvent(axis);

            return this.chart.svg.group();
        }
    }

    TopologyControlWidget.setup = function() {
        return {
            /** @cfg {Boolean} [move=false] Set to be moved to see the point of view of the topology map. */
            move: false,
            /** @cfg {Boolean} [zoom=false] Set the zoom-in / zoom-out features of the topology map. */
            zoom: false,
            /** @cfg {Number} [brush=0] Specifies a brush index for which a widget is used. */
            brush: 0
        }
    }

    return TopologyControlWidget;
}, "chart.widget.core");
jui.define("chart.widget.dragselect", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.dragselect
     * @extends chart.widget.core
     * @alias DragSelectWidget
     * @requires util.base
     *
     */
    var DragSelectWidget = function() {
        var thumb = null;

        this.setDragEvent = function(brush) {
            var self = this,
                axis = this.chart.axis(brush.axis),
                isMove = false,
                mouseStartX = 0,
                mouseStartY = 0,
                thumbWidth = 0,
                thumbHeight = 0,
                startValueX = 0,
                startValueY = 0;

            this.on("axis.mousedown", function(e) {
                if(isMove) return;

                isMove = true;
                mouseStartX = e.bgX;
                mouseStartY = e.bgY;
                startValueX = axis.x.invert(e.chartX);
                startValueY = axis.y.invert(e.chartY);

                this.chart.emit("dragselect.start");
            }, brush.axis);

            this.on("axis.mousemove", function(e) {
                if(!isMove) return;

                thumbWidth = e.bgX - mouseStartX;
                thumbHeight = e.bgY - mouseStartY;

                // Reset drag
                resetDragDraw();

                // Draw drag
                this.onDrawStart(mouseStartX, mouseStartY, thumbWidth, thumbHeight);
            }, brush.axis);

            this.on("axis.mouseup", endZoomAction, brush.axis);
            this.on("chart.mouseup", endZoomAction);
            this.on("bg.mouseup", endZoomAction);

            function endZoomAction(e) {
                isMove = false;
                if(thumbWidth == 0 || thumbHeight == 0) return;

                searchDataInDrag(axis.x.invert(e.chartX), axis.y.invert(e.chartY));
                resetDragStatus();
            }

            function searchDataInDrag(endValueX, endValueY) {
                // x축 값 순서 정하기
                if(startValueX > endValueX) {
                    var temp = startValueX;
                    startValueX = endValueX;
                    endValueX = temp;
                }

                // y축 값 순서 정하기
                if(startValueY > endValueY) {
                    var temp = startValueY;
                    startValueY = endValueY;
                    endValueY = temp;
                }

                if(self.widget.dataType == "area") {
                    emitDragArea(startValueX, startValueY, endValueX, endValueY);
                } else {
                    emitDataList(startValueX, startValueY, endValueX, endValueY);
                }
            }

            function emitDataList(startValueX, startValueY, endValueX, endValueY) {
                var xType = axis.x.type,
                    yType = axis.y.type,
                    datas = axis.data,
                    targets = brush.target,
                    dataInDrag = [];

                // 해당 브러쉬의 데이터 검색
                for(var i = 0; i < datas.length; i++) {
                    var d = datas[i];

                    for(var j = 0; j < targets.length; j++) {
                        var v = d[targets[j]];

                        // Date + Range
                        if(xType == "date" && yType == "range") {
                            var date = d[axis.get("x").key];

                            if(_.typeCheck("date", date)) {
                                if( (date.getTime() >= startValueX.getTime() && date.getTime() <= endValueX.getTime()) &&
                                    (v >= startValueY && v <= endValueY) ) {
                                    dataInDrag.push(getTargetData(i, targets[j], d));
                                }
                            }
                        } else if(xType == "range" && yType == "date") {
                            var date = d[axis.get("y").key];

                            if(_.typeCheck("date", date)) {
                                if( (date.getTime() >= startValueY.getTime() && date.getTime() <= endValueY.getTime()) &&
                                    (v >= startValueX && v <= endValueX) ) {
                                    dataInDrag.push(getTargetData(i, targets[j], d));
                                }
                            }
                        }

                        // Block + Range
                        if(xType == "block" && yType == "range") {
                            if( (i >= startValueX - 1 && i <= endValueX - 1) &&
                                (v >= startValueY && v <= endValueY)) {
                                dataInDrag.push(getTargetData(i, targets[j], d));
                            }
                        } else if(xType == "range" && yType == "block") {
                            if( (i >= startValueY - 1 && i <= endValueY - 1) &&
                                (v >= startValueX && v <= endValueX) ) {
                                dataInDrag.push(getTargetData(i, targets[j], d));
                            }
                        }
                    }
                }

                function getTargetData(index, key, data) {
                    return {
                        brush: brush,
                        dataIndex: index,
                        dataKey: key,
                        data: data
                    };
                }

                self.chart.emit("dragselect.end", [ dataInDrag ]);
            }

            function emitDragArea(startValueX, startValueY, endValueX, endValueY) {
                self.chart.emit("dragselect.end", [ {
                    x1: startValueX,
                    y1: startValueY,
                    x2: endValueX,
                    y2: endValueY
                } ]);
            }

            function resetDragStatus() { // 엘리먼트 및 데이터 초기화
                isMove = false;
                mouseStartX = 0;
                mouseStartY = 0;
                thumbWidth = 0;
                thumbHeight = 0;
                startValueX = 0;
                startValueY = 0;

                resetDragDraw();
            }

            function resetDragDraw() {
                self.onDrawEnd(
                    self.chart.area("x") + axis.area("x"),
                    self.chart.area("y") + axis.area("y"),
                    axis.area("width"),
                    axis.area("height")
                );
            }
        }

        this.onDrawStart = function(x, y, w, h) {
            thumb.attr({
                width: (w >= 0) ? w : Math.abs(w),
                height: (h >= 0) ? h : Math.abs(h)
            });

            thumb.translate(
                (w >= 0) ? x : x + w,
                (h >= 0) ? y : y + h
            );
        }

        this.onDrawEnd = function(x, y, w, h) {
            thumb.attr({
                width: 0,
                height: 0
            });
        }

        this.draw = function() {
            var g = this.chart.svg.group(),
                bIndex = this.widget.brush,
                bIndexes = (_.typeCheck("array", bIndex) ? bIndex : [ bIndex ]);

            for(var i = 0; i < bIndexes.length; i++) {
                var brush = this.chart.get("brush", bIndexes[i]);

                if(brush != null) {
                    thumb = this.svg.rect({
                        width: 0,
                        height: 0,
                        stroke: this.chart.theme("dragSelectBorderColor"),
                        "stroke-width": this.chart.theme("dragSelectBorderWidth"),
                        fill: this.chart.theme("dragSelectBackgroundColor"),
                        "fill-opacity": this.chart.theme("dragSelectBackgroundOpacity")
                    });

                    this.setDragEvent(brush);
                    g.append(thumb);
                }
            }

            return g;
        }
    }

    DragSelectWidget.setup = function() {
        return {
            brush: [ 0 ],
            dataType: "list" // or area
        }
    }

    return DragSelectWidget;
}, "chart.widget.core");
jui.define("chart.widget.map.core", [], function() {

    /**
     * @class chart.widget.map.core
     * @extends chart.widget.core
     */
    var MapCoreWidget = function(chart, axis, widget) {
    }

    MapCoreWidget.setup = function() {
        return {
            axis: 0
        }
    }

    return MapCoreWidget;
}, "chart.widget.core");
jui.define("chart.widget.map.control", [ "util.base" ], function(_) {
    var SCROLL_MIN_Y = 21.5,
        SCROLL_MAX_Y = 149;

    /**
     * @class chart.widget.map.control
     * @extends chart.widget.map.core
     */
    var MapControlWidget = function(chart, axis, widget) {
        var self = this;
        var scale = 1,
            viewX = 0,
            viewY = 0,
            blockX = 0,
            blockY = 0,
            scrollY = 0,
            btn = { top: null, right: null, bottom: null, left: null, home: null, up: null, down: null, thumb: null };

        function createBtnGroup(type, opacity, x, y, url) {
            btn[type] = chart.svg.group({
                cursor: (url != null) ? "pointer" : "move"
            }, function() {
                chart.svg.rect({
                    x: 0.5,
                    y: 0.5,
                    width: 20,
                    height: 20,
                    rx: 2,
                    ry: 2,
                    stroke: 0,
                    fill: chart.theme("mapControlButtonColor"),
                    "fill-opacity": opacity
                });

                if(url != null) {
                    chart.svg.image({
                        x: 4.5,
                        y: 4.5,
                        width: 11,
                        height: 11,
                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                        "xlink:href": url,
                        opacity: 0.6
                    });
                }
            }).translate(x, y);

            return btn[type];
        }

        function createScrollThumbLines() {
            return chart.svg.group({}, function() {
                for(var i = 0; i < 6; i++) {
                    var y = 22 * i;

                    chart.svg.path({
                        fill: "none",
                        "stroke-width": 1,
                        "stroke-opacity": 0.6,
                        stroke: chart.theme("mapControlScrollLineColor")
                    }).MoveTo(1.5, 41.5 + y).LineTo(18.5, 41.5 + y);
                }
            });
        }

        function getScrollThumbY(scale) {
            return self.getScaleToValue(scale, widget.min, widget.max, SCROLL_MIN_Y, SCROLL_MAX_Y);
        }

        function getScrollScale(y) {
            return self.getValueToScale(y, SCROLL_MIN_Y, SCROLL_MAX_Y, widget.min, widget.max);
        }

        function setButtonEvents() {
            var originViewX = viewX,
                originViewY = viewY;

            btn.top.on("click", function(e) {
                viewY -= blockY;
                move();
            });
            btn.right.on("click", function(e) {
                viewX += blockX;
                move();
            });
            btn.bottom.on("click", function(e) {
                viewY += blockY;
                move();
            });
            btn.left.on("click", function(e) {
                viewX -= blockX;
                move();
            });
            btn.home.on("click", function(e) {
                viewX = originViewX;
                viewY = originViewY;
                move();
            });

            btn.up.on("click", function(e) {
                if(scale > widget.max) return;

                scale += 0.1;
                zoom();
            });
            btn.down.on("click", function(e) {
                if(scale - 0.09 < widget.min) return;

                scale -= 0.1;
                zoom();
            });

            function move() {
                axis.updateGrid("map", {
                    scale: scale,
                    viewX: viewX,
                    viewY: viewY
                });

                axis.map.view(viewX, viewY);

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!chart.isRender()) {
                    chart.render();
                }
            }

            function zoom() {
                axis.updateGrid("map", {
                    scale: scale,
                    viewX: viewX,
                    viewY: viewY
                });

                scrollY = getScrollThumbY(scale);
                axis.map.scale(scale);
                btn.thumb.translate(0, scrollY);

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!chart.isRender()) {
                    chart.render();
                }
            }
        }

        function setScrollEvent(bar) {
            var startY = 0,
                moveY = 0;

            btn.thumb.on("mousedown", function(e) {
                if(startY > 0) return;

                startY = e.y;
            });

            btn.thumb.on("mousemove", moveThumb);
            bar.on("mousemove", moveThumb);

            btn.thumb.on("mouseup", endMoveThumb);
            bar.on("mouseup", endMoveThumb);
            bar.on("mouseout", endMoveThumb);

            function moveThumb(e) {
                if(startY == 0) return;
                var sy = scrollY + e.y - startY;

                if(sy >= SCROLL_MIN_Y && sy <= SCROLL_MAX_Y) {
                    moveY = e.y - startY;
                    scale = getScrollScale(sy);

                    axis.updateGrid("map", {
                        scale: scale,
                        viewX: viewX,
                        viewY: viewY
                    });

                    axis.map.scale(scale);
                    btn.thumb.translate(0, getScrollThumbY(scale));

                    // 차트 렌더링이 활성화되지 않았을 경우
                    if(!chart.isRender()) {
                        chart.render();
                    }
                }
            }

            function endMoveThumb(e) {
                if(startY == 0) return;

                startY = 0;
                scrollY += moveY;
            }
        }

        this.drawBefore = function() {
            scale = axis.map.scale();
            viewX = axis.map.view().x;
            viewY = axis.map.view().y;
            blockX = axis.map.size().width / 10;
            blockY = axis.map.size().height / 10;
            scrollY = getScrollThumbY(scale);
        }

        this.draw = function() {
            var g = chart.svg.group({}, function() {
                var top = chart.svg.group(),
                    bottom = chart.svg.group().translate(20, 80),
                    bar = chart.svg.rect({
                        x: 0.5,
                        y: 0.5,
                        width: 26,
                        height: 196,
                        rx: 4,
                        ry: 4,
                        stroke: 0,
                        fill: chart.theme("mapControlScrollColor"),
                        "fill-opacity": 0.15
                    }).translate(-3, -3);

                top.append(createBtnGroup("left", 0.8, 0, 20, chart.theme("mapControlLeftButtonImage")));
                top.append(createBtnGroup("right", 0.8, 40, 20, chart.theme("mapControlRightButtonImage")));
                top.append(createBtnGroup("top", 0.8, 20, 0, chart.theme("mapControlTopButtonImage")));
                top.append(createBtnGroup("bottom", 0.8, 20, 40, chart.theme("mapControlBottomButtonImage")));
                top.append(createBtnGroup("home", 0, 20, 20, chart.theme("mapControlHomeButtonImage")));

                bottom.append(bar);
                bottom.append(createScrollThumbLines());
                bottom.append(createBtnGroup("up", 0.8, 0, 0, chart.theme("mapControlUpButtonImage")));
                bottom.append(createBtnGroup("down", 0.8, 0, 170, chart.theme("mapControlDownButtonImage")));
                bottom.append(createBtnGroup("thumb", 0.8, 0, scrollY));

                setButtonEvents();
                setScrollEvent(bar);
            });

            var ot = widget.orient,
                ag = widget.align,
                dx = widget.dx,
                dy = widget.dy,
                x2 = axis.area("x2"),
                y2 = axis.area("y2");

            if(ot == "bottom" && ag == "start") {
                g.translate(dx, y2 - (273 + dy));
            } else if(ot == "bottom" && ag == "end") {
                g.translate(x2 - (60 + dx), y2 - (273 + dy));
            } else if(ot == "top" && ag == "end") {
                g.translate(x2 - (60 + dx), dy);
            } else {
                g.translate(dx, dy);
            }

            return g;
        }
    }

    MapControlWidget.setup = function() {
        return {
            /** @cfg {"top"/"bottom" } Sets the location where the label is displayed (top, bottom). */
            orient: "top",
            /** @cfg {"start"/"end" } Aligns the label (center, start, end). */
            align: "start",

            min: 1,
            max: 3,

            dx: 5,
            dy: 5
        }
    }

    return MapControlWidget;
}, "chart.widget.map.core");
jui.define("chart.widget.map.tooltip", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.map.core
     * @extends chart.widget.core
     */
    var MapTooltipWidget = function(chart, axis, widget) {
        var self = this;
        var g, text, rect;
        var padding = 7, anchor = 7, textY = 14;

        function getFormat(data) {
            if(_.typeCheck("function", widget.format)) {
                return self.format(data);
            }

            return data.id;
        }

        function printTooltip(obj) {
            var msg = getFormat(obj);

            if(widget.orient == "bottom") {
                text.attr({ y: textY + anchor });
            }

            if(_.typeCheck("string", msg) && msg != "") {
                text.text(msg);
                text.attr({ "text-anchor": "middle" });
            }

            return msg;
        }

        this.drawBefore = function() {
            g = chart.svg.group({
                visibility: "hidden"
            }, function() {
                rect = chart.svg.polygon({
                    fill: chart.theme("tooltipBackgroundColor"),
                    "fill-opacity": chart.theme("tooltipBackgroundOpacity"),
                    stroke: chart.theme("tooltipBorderColor"),
                    "stroke-width": 1
                });

                text = chart.text({
                    "font-size": chart.theme("tooltipFontSize"),
                    "fill": chart.theme("tooltipFontColor"),
                    y: textY
                });
            });
        }

        this.draw = function() {
            var isActive = false,
                w, h;

            this.on("map.mouseover", function(obj, e) {
                if(!printTooltip(obj)) return;

                var size = text.size();
                w = size.width + (padding * 2);
                h = size.height + padding;

                text.attr({ x: w / 2 });
                rect.attr({ points: self.balloonPoints(widget.orient, w, h, anchor) });
                g.attr({ visibility: "visible" });

                isActive = true;
            });

            this.on("map.mousemove", function(obj, e) {
                if(!isActive) return;

                var x = e.bgX - (w / 2),
                    y = e.bgY - h - anchor - (padding / 2);

                if(widget.orient == "left" || widget.orient == "right") {
                    y = e.bgY - (h / 2) - (padding / 2);
                }

                if(widget.orient == "left") {
                    x = e.bgX - w - anchor;
                } else if(widget.orient == "right") {
                    x = e.bgX + anchor;
                } else if(widget.orient == "bottom") {
                    y = e.bgY + (anchor * 2);
                }

                g.translate(x, y);
            });

            this.on("map.mouseout", function(obj, e) {
                if(!isActive) return;

                g.attr({ visibility: "hidden" });
                isActive = false;
            });

            return g;
        }
    }

    return MapTooltipWidget;
}, "chart.widget.tooltip");
jui.define("chart.widget.map.minimap", [ "util.base", "chart.builder" ], function(_, builder) {

    /**
     * @class chart.widget.map.minimap
     * @extends chart.widget.map.core
     */
    var MapMinimapWidget = function() {
        var self = this;

        var viewX = 0,
            viewY = 0,
            scale = 0;

        this.getScaleXY = function(axis) { // 차후에 공통 함수로 변경해야 함
            var s = axis.map.scale(),
                w = axis.get("map").width,
                h = axis.get("map").height,
                px = ((w * s) - w) / 2,
                py = ((h * s) - h) / 2;

            return {
                x: px,
                y: py
            }
        }

        this.createMapImage = function() {
            var map = this.axis.get("map"),
                scale = this.widget.scale;

            var image = builder(null, {
                width : map.width * scale,
                height : map.height * scale,
                padding : 0,
                axis : [{
                    map : {
                        path : map.path,
                        width : map.width,
                        height : map.height,
                        scale : scale
                    }
                }],
                style : {
                    backgroundColor : "transparent",
                    mapPathBackgroundColor : this.chart.theme("mapMinimapPathBackgroundColor"),
                    mapPathBackgroundOpacity : this.chart.theme("mapMinimapPathBackgroundOpacity"),
                    mapPathBorderColor : this.chart.theme("mapMinimapPathBorderColor"),
                    mapPathBorderWidth : this.chart.theme("mapMinimapPathBorderWidth"),
                    mapPathBorderOpacity : this.chart.theme("mapMinimapPathBorderOpacity")
                }
            });

            var dxy = this.getScaleXY(image.axis(0));
            image.axis(0).map.view(-dxy.x, -dxy.y);

            return this.svg.image({
                width: map.width * scale,
                height: map.height * scale,
                "xlink:href": image.svg.toDataURI()
            });
        }

        this.createCtrlButton = function(attr) {
            var area = this.axis.get("area"),
                map = this.axis.get("map"),
                startX, startY, moveX = 0, moveY = 0;

            var xy = this.getScaleXY(this.axis),
                w = attr.width / scale,
                h = attr.height / scale,
                x = (xy.x / scale) * this.widget.scale,
                y = (xy.y / scale) * this.widget.scale,
                dx = (viewX / scale) * this.widget.scale,
                dy = (viewY / scale) * this.widget.scale;

            // 차트 크기에 대한 스케일
            w = w * (area.width / map.width);
            h = h * (area.height / map.width);

            var rect = this.svg.rect({
                stroke: this.chart.theme("mapMinimapDragBorderColor"),
                "stroke-width": this.chart.theme("mapMinimapDragBorderWidth"),
                fill: this.chart.theme("mapMinimapDragBackgroundColor"),
                "fill-opacity": this.chart.theme("mapMinimapDragBackgroundOpacity"),
                cursor: "move",
                width: w,
                height: h,
                x: x + dx,
                y: y + dy
            });

            // 드래그 이벤트 정의
            rect.on("mousedown", function(e) {
                if(startX || startY) return;

                startX = e.x - moveX;
                startY = e.y - moveY;
            });

            rect.on("mousemove", moveButton);
            rect.on("mouseup", endMoveButton);
            rect.on("mouseout", endMoveButton);

            function moveButton(e) {
                if(!startX || !startY) return;

                var sx = e.x - startX,
                    sy = e.y - startY,
                    tx = sx + x + dx,
                    ty = sy + y + dy;

                if(tx >= 0 && ty >= 0 && tx + w < attr.width && ty + h < attr.height) {
                    moveX = sx;
                    moveY = sy;

                    rect.translate(moveX, moveY);
                }
            }

            function endMoveButton(e) {
                if(!startX || !startY) return;

                startX = null;
                startY = null;

                var newViewX = (moveX * scale) / self.widget.scale + viewX,
                    newViewY = (moveY * scale) / self.widget.scale + viewY;

                self.axis.updateGrid("map", {
                    viewX: newViewX,
                    viewY: newViewY
                });

                self.axis.map.view(newViewX, newViewY);

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!self.chart.isRender()) {
                    self.chart.render();
                }
            }

            return rect;
        }

        this.drawBefore = function() {
            viewX = this.axis.map.view().x;
            viewY = this.axis.map.view().y;
            scale = this.axis.map.scale();
        }

        this.draw = function() {
            var g = this.svg.group(),
                map = this.createMapImage(),
                btn = this.createCtrlButton(map.attributes),
                dx = (this.widget.align == "start") ? 0 : this.chart.area("width") - map.attributes.width,
                dy = (this.widget.orient == "bottom") ? this.chart.area("height") - map.attributes.height : 0;

            g.append(this.svg.rect({
                x: 0,
                y: 0,
                width: map.attributes.width,
                height: map.attributes.height,
                fill: this.chart.theme("mapMinimapBackgroundColor"),
                stroke: this.chart.theme("mapMinimapBorderColor"),
                "stroke-width": this.chart.theme("mapMinimapBorderWidth")
            }));

            g.append(map);
            g.append(btn);
            g.translate(dx + this.widget.dx, dy + this.widget.dy);

            return g;
        }
    }

    MapMinimapWidget.setup = function() {
        return {
            align : "end",
            orient : "top",
            scale : 0.2,
            dx : -1,
            dy : 1
        }
    }

    return MapMinimapWidget;
}, "chart.widget.map.core");
jui.define("chart.widget.polygon.core", [], function() {

    /**
     * @class chart.widget.polygon.core
     * @extends chart.widget.core
     */
    var PolygonCoreWidget = function() {
        this.drawAfter = function(obj) {
        }
    }

    return PolygonCoreWidget;
}, "chart.widget.core");
jui.define("chart.widget.polygon.rotate3d", [ "util.base" ], function (_) {
    var DEGREE_LIMIT = 180;

    /**
     * @class chart.widget.polygon.rotate3d
     * @extends chart.widget.polygon.core
     * @alias ScrollWidget
     * @requires util.base
     */
    var PolygonRotate3DWidget = function() {
        var self = this;

        function setScrollEvent(axisIndex) {
            var axis = self.chart.axis(axisIndex),
                isMove = false,
                mouseStartX = 0,
                mouseStartY = 0,
                sdx = 0,
                sdy = 0,
                cacheXY = null,
                unit = self.widget.unit,
                w = axis.area("width"),
                h = axis.area("height");

            self.on("axis.mousedown", mousedown, axisIndex);
            self.on("axis.mousemove", mousemove, axisIndex);
            self.on("axis.mouseup", mouseup, axisIndex);
            self.on("bg.mouseup", mouseup);
            self.on("chart.mouseup", mouseup);

            function mousedown(e) {
                if(isMove) return;

                isMove = true;
                mouseStartX = e.chartX;
                mouseStartY = e.chartY;
                sdx = axis.degree.x;
                sdy = axis.degree.y;
            }

            function mousemove(e) {
                if(!isMove) return;

                var gapX = e.chartX - mouseStartX,
                    gapY = e.chartY - mouseStartY,
                    dx = sdx + Math.floor((gapY / h) * DEGREE_LIMIT),
                    dy = sdy - Math.floor((gapX / w) * DEGREE_LIMIT);

                // 각도 Interval이 맞을 경우, 렌더링하지 않음
                if(dx % unit != 0 && dy % unit != 0) return;

                // 이전 각도와 동일할 경우, 렌더링하지 않음
                var newCacheXY = dx + ":" + dy;
                if(cacheXY == newCacheXY) return;

                axis.set("degree", {
                    x: dx,
                    y: dy
                });

                self.chart.render();
                cacheXY = newCacheXY;
            }

            function mouseup(e) {
                if(!isMove) return;

                isMove = false;
                mouseStartX = 0;
                mouseStartY = 0;
            }
        }

        this.draw = function() {
            var indexes = (_.typeCheck("array", this.widget.axis) ? this.widget.axis : [ this.widget.axis ]);

            for(var i = 0; i < indexes.length; i++) {
                setScrollEvent(indexes[i]);
            }
        }
    }

    PolygonRotate3DWidget.setup = function() {
        return {
            unit: 5, // 회전 최소 각도
            axis: [ 0 ]
        }
    }

    return PolygonRotate3DWidget;
}, "chart.widget.polygon.core");
jui.define("chart.widget.canvas.core", [], function() {
    var CanvasCoreWidget = function() {
        this.drawAfter = function(obj) {
        }
    }

    return CanvasCoreWidget;
}, "chart.widget.core");
jui.define("chart.widget.canvas.dragselect", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.canvas.dragselect
     * @extends chart.widget.dragselect
     * @alias CanvasDragSelectWidget
     * @requires util.base
     *
     */
    var CanvasDragSelectWidget = function() {
        this.onDrawStart = function(x, y, w, h) {
            this.canvas.lineWidth  = this.chart.theme("dragSelectBorderWidth");
            this.canvas.strokeStyle = this.chart.theme("dragSelectBorderColor");
            this.canvas.fillStyle = this.chart.theme("dragSelectBackgroundColor");
            this.canvas.globalAlpha = this.chart.theme("dragSelectBackgroundOpacity");

            this.canvas.fillRect(
                (w >= 0) ? x : x + w,
                (h >= 0) ? y : y + h,
                (w >= 0) ? w : Math.abs(w),
                (h >= 0) ? h : Math.abs(h)
            );
            this.canvas.strokeRect(
                (w >= 0) ? x : x + w,
                (h >= 0) ? y : y + h,
                (w >= 0) ? w : Math.abs(w),
                (h >= 0) ? h : Math.abs(h)
            );
        }

        this.onDrawEnd = function(x, y, w, h) {
            this.canvas.clearRect(x, y, w, h);
        }

        this.draw = function() {
            var bIndex = this.widget.brush,
                bIndexes = (_.typeCheck("array", bIndex) ? bIndex : [ bIndex ]);

            for(var i = 0; i < bIndexes.length; i++) {
                var brush = this.chart.get("brush", bIndexes[i]);
                this.setDragEvent(brush);
            }
        }

        this.drawAfter = function() {}
    }

    CanvasDragSelectWidget.setup = function() {
        return {
            brush: [ 0 ],
            dataType: "list" // or area
        }
    }

    return CanvasDragSelectWidget;
}, "chart.widget.dragselect");