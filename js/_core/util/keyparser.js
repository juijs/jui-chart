jui.redefine("util.keyparser", [], function() {

    /**
     * @class KeyParser
     *
     * 0.0.1 형식의 키 문자열을 제어하는 클래스
     *
     * @private
     * @constructor
     */
    var KeyParser = function () {
        
        /**
         * @method isIndexDepth
         *
         * @param {String} index
         * @return {Boolean}
         */
        this.isIndexDepth = function (index) {
            if (typeof(index) == "string" && index.indexOf(".") != -1) {
                return true;
            }

            return false;
        }

        /**
         * @method getIndexList
         *
         * @param {String} index
         * @return {Array}
         */
        this.getIndexList = function (index) { // 트리 구조의 모든 키를 배열 형태로 반환
            var resIndex = [],
                strIndexes = ("" + index).split(".");

            for(var i = 0; i < strIndexes.length; i++) {
                resIndex[i] = parseInt(strIndexes[i]);
            }

            return resIndex;
        }

        /**
         * @method changeIndex
         *
         *
         * @param {String} index
         * @param {String} targetIndex
         * @param {String} rootIndex
         * @return {String}
         */
        this.changeIndex = function (index, targetIndex, rootIndex) {
            var rootIndexLen = this.getIndexList(rootIndex).length,
                indexList = this.getIndexList(index),
                tIndexList = this.getIndexList(targetIndex);

            for (var i = 0; i < rootIndexLen; i++) {
                indexList.shift();
            }

            return tIndexList.concat(indexList).join(".");
        }

        /**
         * @method getNextIndex
         *
         * @param {String} index
         * @return {String}
         */
        this.getNextIndex = function (index) { // 현재 인덱스에서 +1
            var indexList = this.getIndexList(index),
                no = indexList.pop() + 1;

            indexList.push(no);
            return indexList.join(".");
        }

        /**
         * @method getParentIndex
         *
         *
         * @param {String} index
         * @returns {*}
         */
        this.getParentIndex = function (index) {
            if (!this.isIndexDepth(index)) return null;
            
            return index.substr(0, index.lastIndexOf("."))
        }
    }

    return KeyParser;
}, null, true);