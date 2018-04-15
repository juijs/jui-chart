jui.redefine("util.math", [ "util.base" ], function(_) {

	// 2x1 or 3x1 or ?x1 형태의 매트릭스 연산
	function matrix(a, b) {
		var m = [];

		for(var i = 0, len = a.length; i < len; i++) {
			var sum = 0;

			for(var j = 0, len2 = a[i].length; j < len2; j++) {
				sum += a[i][j] * b[j];
			}

			m.push(sum);
		}

		return m;
	}

	// 2x2 or 3x3 or ?x? 형태의 매트릭스 연산
	function deepMatrix(a, b) {
		var m = [], nm = [];

		for(var i = 0, len = b.length; i < len; i++) {
			m[i] = [];
			nm[i] = [];
		}

		for(var i = 0, len = b.length; i < len; i++) {
			for(var j = 0, len2 = b[i].length; j < len2; j++) {
				m[j].push(b[i][j]);
			}
		}

		for(var i = 0, len = m.length; i < len; i++) {
			var mm = matrix(a, m[i]);

			for(var j = 0, len2 = mm.length; j < len2; j++) {
				nm[j].push(mm[j]);
			}
		}

		return nm;
	}

	function matrix3d(a, b) {
		var m = new Float32Array(4);

		m[0] = a[0][0] * b[0] + a[0][1] * b[1] + a[0][2] * b[2]  + a[0][3] * b[3];
		m[1] = a[1][0] * b[0] + a[1][1] * b[1] + a[1][2] * b[2]  + a[1][3] * b[3];
		m[2] = a[2][0] * b[0] + a[2][1] * b[1] + a[2][2] * b[2]  + a[2][3] * b[3];
		m[3] = a[3][0] * b[0] + a[3][1] * b[1] + a[3][2] * b[2]  + a[3][3] * b[3];

		return m;
	}

	function deepMatrix3d(a, b) {
		var nm = [
			new Float32Array(4),
			new Float32Array(4),
			new Float32Array(4),
			new Float32Array(4)
		];

		var m = [
			new Float32Array([b[0][0],b[1][0],b[2][0],b[3][0]]),
			new Float32Array([b[0][1],b[1][1],b[2][1],b[3][1]]),
			new Float32Array([b[0][2],b[1][2],b[2][2],b[3][2]]),
			new Float32Array([b[0][3],b[1][3],b[2][3],b[3][3]])
		];

		nm[0][0] = a[0][0] * m[0][0] + a[0][1] * m[0][1] + a[0][2] * m[0][2]  + a[0][3] * m[0][3];
		nm[1][0] = a[1][0] * m[0][0] + a[1][1] * m[0][1] + a[1][2] * m[0][2]  + a[1][3] * m[0][3];
		nm[2][0] = a[2][0] * m[0][0] + a[2][1] * m[0][1] + a[2][2] * m[0][2]  + a[2][3] * m[0][3];
		nm[3][0] = a[3][0] * m[0][0] + a[3][1] * m[0][1] + a[3][2] * m[0][2]  + a[3][3] * m[0][3];

		nm[0][1] = a[0][0] * m[1][0] + a[0][1] * m[1][1] + a[0][2] * m[1][2]  + a[0][3] * m[1][3];
		nm[1][1] = a[1][0] * m[1][0] + a[1][1] * m[1][1] + a[1][2] * m[1][2]  + a[1][3] * m[1][3];
		nm[2][1] = a[2][0] * m[1][0] + a[2][1] * m[1][1] + a[2][2] * m[1][2]  + a[2][3] * m[1][3];
		nm[3][1] = a[3][0] * m[1][0] + a[3][1] * m[1][1] + a[3][2] * m[1][2]  + a[3][3] * m[1][3];

		nm[0][2] = a[0][0] * m[2][0] + a[0][1] * m[2][1] + a[0][2] * m[2][2]  + a[0][3] * m[2][3];
		nm[1][2] = a[1][0] * m[2][0] + a[1][1] * m[2][1] + a[1][2] * m[2][2]  + a[1][3] * m[2][3];
		nm[2][2] = a[2][0] * m[2][0] + a[2][1] * m[2][1] + a[2][2] * m[2][2]  + a[2][3] * m[2][3];
		nm[3][2] = a[3][0] * m[2][0] + a[3][1] * m[2][1] + a[3][2] * m[2][2]  + a[3][3] * m[2][3];

		nm[0][3] = a[0][0] * m[3][0] + a[0][1] * m[3][1] + a[0][2] * m[3][2]  + a[0][3] * m[3][3];
		nm[1][3] = a[1][0] * m[3][0] + a[1][1] * m[3][1] + a[1][2] * m[3][2]  + a[1][3] * m[3][3];
		nm[2][3] = a[2][0] * m[3][0] + a[2][1] * m[3][1] + a[2][2] * m[3][2]  + a[2][3] * m[3][3];
		nm[3][3] = a[3][0] * m[3][0] + a[3][1] * m[3][1] + a[3][2] * m[3][2]  + a[3][3] * m[3][3];

		return nm;
	}

	function inverseMatrix3d(me) {
		var te = [
			new Float32Array(4),
			new Float32Array(4),
			new Float32Array(4),
			new Float32Array(4)
		];

		var n11 = me[0][0], n12 = me[0][1], n13 = me[0][2], n14 = me[0][3];
		var n21 = me[1][0], n22 = me[1][1], n23 = me[1][2], n24 = me[1][3];
		var n31 = me[2][0], n32 = me[2][1], n33 = me[2][2], n34 = me[2][3];
		var n41 = me[3][0], n42 = me[3][1], n43 = me[3][2], n44 = me[3][3];

		te[0][0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
		te[0][1] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
		te[0][2] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
		te[0][3] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
		te[1][0] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
		te[1][1] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
		te[1][2] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
		te[1][3] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
		te[2][0] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
		te[2][1] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
		te[2][2] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
		te[2][3] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
		te[3][0] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
		te[3][1] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
		te[3][2] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
		te[3][4] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

		var det = 1 / (n11 * te[0][0] + n21 * te[0][1] + n31 * te[0][2] + n41 * te[0][3]);

		if(det === 0) {
			te = [
				new Float32Array([ 1, 0, 0, 0 ]),
				new Float32Array([ 0, 1, 0, 0 ]),
				new Float32Array([ 0, 0, 1, 0 ]),
				new Float32Array([ 0, 0, 0, 1 ])
			];
		} else {
			te[0][0] *= det; te[0][1] *= det; te[0][2] *= det; te[0][3] *= det;
			te[1][0] *= det; te[1][1] *= det; te[1][2] *= det; te[1][3] *= det;
			te[2][0] *= det; te[2][1] *= det; te[2][2] *= det; te[2][3] *= det;
			te[3][0] *= det; te[3][1] *= det; te[3][2] *= det; te[3][4] *= det;
		}

		return te;
	}

    function getConvMatrixPadding(size) {
        return Math.floor(size / 2);
    }

    function getConvMatrixValues(matrix, padding, rowIndex, colIndex) {
        var values = [];

        for(var i = -padding; i <= padding; i++) {
            for(var j = -padding; j <= padding; j++) {
                var row = matrix[rowIndex + i];

                if(row == undefined) {
                    values.push(0);
                } else {
                    if(row[colIndex + j] == undefined) {
                        values.push(0);
                    } else {
                        values.push(row[colIndex + j]);
                    }
                }
            }
        }

        return values;
    }

    function dotConvMatrix(m1, m2) {
        var sum = 0;

        for(var i = 0; i < m1.length; i++) {
            sum += (m1[i] * m2[i]);
        }

        return sum;
    }

	/**
	 * @class util.math
	 *
	 * Math Utility
	 *
	 * @singleton
	 */
	var self = {

		/**
		 * @method rotate
		 *
		 * 2d rotate
		 *
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} radian	roate 할 radian
		 * @return {Object}
		 * @return {Number} return.x  변환된 x
		 * @return {Number} return.y  변환된 y
		 *
 		 */
		rotate : function(x, y, radian) {
			return {
				x : x * Math.cos(radian) - y * Math.sin(radian),
				y : x * Math.sin(radian) + y * Math.cos(radian)
			}
		},

		resize : function(maxWidth, maxHeight, objectWidth, objectHeight) {
			var ratio = objectHeight / objectWidth;

			if (objectWidth >= maxWidth && ratio <= 1) {
				objectWidth = maxWidth;
				objectHeight = maxHeight * ratio;
			} else if (objectHeight >= maxHeight) {
				objectHeight = maxHeight;
				objectWidth = maxWidth / ratio;
			}

			return { width : objectWidth, height : objectHeight};
		},

		/**
		 * @method radian
		 *
		 * convert degree to radian
		 *
		 * @param {Number} degree
		 * @return {Number} radian
		 */
		radian : function(degree) {
			return degree * Math.PI / 180;
		},

		/**
		 * @method degree
		 *
		 * convert radian to degree
		 *
		 * @param {Number} radian
		 * @return {Number} degree
		 */
		degree : function(radian) {
			return radian * 180 / Math.PI;
		},

        angle : function(x1, y1, x2, y2) {
            var dx = x2 - x1,
                dy = y2 - y1;

            return Math.atan2(dy, dx);
        },

		/**
		 * @method interpolateNumber
		 *
		 * a, b 의 중간값 계산을 위한 callback 함수 만들기
		 *
		 * @param {Number} a	first value
		 * @param {Number} b 	second value
		 * @return {Function}
		 */
		interpolateNumber : function(a, b) {
            var dist = (b - a);
			return function(t) {
				return a + dist * t;
			}
		},

		// 중간값 round 해서 계산하기
		interpolateRound : function(a, b) {

            var dist = (b - a);
            return function(t) {
                return Math.round(a + dist * t);
            }
		},

		getFixed : function (a, b) {
			var aArr = (a+"").split(".");
			var aLen = (aArr.length < 2) ? 0 : aArr[1].length;

			var bArr = (b+"").split(".");
			var bLen = (bArr.length < 2) ? 0 : bArr[1].length;

			return (aLen > bLen) ? aLen : bLen;

		},

		fixed : function (fixed) {


			var fixedNumber = this.getFixed(fixed, 0);
			var pow = Math.pow(10, fixedNumber);

			var func = function (value) {
				return Math.round(value * pow) / pow;
			};

			func.plus = function (a, b) {
				return Math.round((a * pow) + (b * pow)) / pow;
			};

			func.minus = function (a, b) {
				return Math.round((a * pow) - (b * pow)) / pow;
			};

			func.multi = function (a, b) {
				return Math.round((a * pow) * (b * pow)) / (pow*pow);
			};

			func.div = function (a, b) {
				var result = (a * pow) / (b * pow);
				var pow2 = Math.pow(10, this.getFixed(result, 0));
				return Math.round(result*pow2) / pow2;
			};

			func.remain = function (a, b) {
				return Math.round((a * pow) % (b * pow)) / pow;
			};

			return func;
		},

		round: function (num, fixed) {
			var fixedNumber = Math.pow(10, fixed);

			return Math.round(num * fixedNumber) / fixedNumber;
		},

		plus : function (a, b) {
			var pow = Math.pow(10, this.getFixed(a, b));

			return Math.round((a * pow) + (b * pow)) / pow;
		},

		minus : function (a, b) {
			var pow = Math.pow(10, this.getFixed(a, b));
			return Math.round((a * pow) - (b * pow)) / pow;
		},

		multi : function (a, b) {
			var pow = Math.pow(10, this.getFixed(a, b));
			return Math.round((a * pow) * (b * pow)) / (pow*pow);
		},

		div : function (a, b) {
			var pow = Math.pow(10, this.getFixed(a, b));

			var result = (a * pow) / (b * pow);
			var pow2 = Math.pow(10, this.getFixed(result, 0));
			return Math.round(result*pow2) / pow2;
		},

		remain : function (a, b) {
			var pow = Math.pow(10, this.getFixed(a, b));
			return Math.round((a * pow) % (b * pow)) / pow;
		},

		/**
		 * 특정 구간의 값을 자동으로 계산 
		 * 
		 * @param {Object} min
		 * @param {Object} max
		 * @param {Object} ticks
		 * @param {Object} isNice
		 */
		nice : function(min, max, ticks, isNice) {
			isNice = isNice || false;

			if (min > max) {
				var _max = min;
				var _min = max;
			} else {
				var _min = min;
				var _max = max;
			}

			var _ticks = ticks;
			var _tickSpacing = 0;
			var _range = [];
			var _niceMin;
			var _niceMax;

			function niceNum(range, round) {
				var exponent = Math.floor(Math.log(range) / Math.LN10);
				var fraction = range / Math.pow(10, exponent);
				var nickFraction;

				if (round) {
					if (fraction < 1.5)
						niceFraction = 1;
					else if (fraction < 3)
						niceFraction = 2;
					else if (fraction < 7)
						niceFraction = 5;
					else
						niceFraction = 10;
				} else {
					if (fraction <= 1)
						niceFraction = 1;
					else if (fraction <= 2)
						niceFraction = 2;
					else if (fraction <= 5)
						niceFraction = 5;
					else
						niceFraction = 10;

					//console.log(niceFraction)
				}

				return niceFraction * Math.pow(10, exponent);

			}

			function caculate() {
				_range = (isNice) ? niceNum(_max - _min, false) : _max - _min;
				_tickSpacing = (isNice) ? niceNum(_range / _ticks, true) : _range / _ticks;
				_niceMin = (isNice) ? Math.floor(_min / _tickSpacing) * _tickSpacing : _min;
				_niceMax = (isNice) ? Math.floor(_max / _tickSpacing) * _tickSpacing : _max;

			}

			caculate();

			return {
				min : _niceMin,
				max : _niceMax,
				range : _range,
				spacing : _tickSpacing
			}
		},

		matrix: function(a, b) {
			if(_.typeCheck("array", b[0])) {
				return deepMatrix(a, b);
			}

			return matrix(a, b);
		},

		matrix3d: function(a, b) {
			if(b[0] instanceof Array || b[0] instanceof Float32Array) {
				return deepMatrix3d(a, b);
			}

			return matrix3d(a, b);
		},

		inverseMatrix3d: function(a) {
			return inverseMatrix3d(a);
		},

		convMatrix: function(input, kernel) {
            var padding = getConvMatrixPadding(kernel.length),
                kernel = getConvMatrixValues(kernel, padding, padding, padding).reverse(),
                result = [];

            for(var i = 0; i < input.length; i++) {
                result[i] = [];

                for(var j = 0; j < input[i].length; j++) {
                    result[i][j] = dotConvMatrix(kernel, getConvMatrixValues(input, padding, i, j));
                }
            }

            return result;
        },

		scaleValue: function(value, minValue, maxValue, minScale, maxScale) {
			// 최소/최대 값이 같을 경우 처리
			minValue = (minValue == maxValue) ? 0 : minValue;

			var range = maxScale - minScale,
				tg = range * getPer();

			function getPer() {
				var range = maxValue - minValue,
					tg = value - minValue,
					per = tg / range;

				return per;
			}

			return tg + minScale;
		}
	}

	return self;
}, null, true);
