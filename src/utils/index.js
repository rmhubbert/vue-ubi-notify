const Util = {
  /**
   * Recursively merge Objects together. Used for merging Vue config files
   * Doesn't merge arrays, will copy it over without merging into the contents
   * @param  {Object} target The base object to merge onto
   * @param  {Object} merge  The object to merge from
   * @return {Object}        The merged object
   */
  mergeObjects: (target, merge) => {
    let merged = Object.assign({}, target);
    if (Util.isObject(target) && Util.isObject(merge)) {
      Object.keys(target).forEach(key => {
        if (Util.isObject(target[key])) {
          if (merge.hasOwnProperty(key))
            merged[key] = Util.mergeObjects(target[key], merge[key]);
        } else if (merge.hasOwnProperty(key)) {
          Object.assign(merged, { [key]: merge[key] });
        }
      });
    }
    return merged;
  },

  /**
   * Checks if the parameter is an Object
   * @param  {Mixed} target The parameter to test
   * @return {Boolean}
   */
  isObject: target => {
    return (
      target && typeof target === "object" && target.constructor === Object
    );
  },

  /**
   * Constructs a valid CSS positioning string from a config string
   * @param  {String} positionString Config provided string that can be either exact position or keywords
   * @param  {String} elementWidth   Needed for when the horizontal value is 'center'
   * @return {String}                A valid CSS string for adding to a style attribute
   */
  getCSSPosition: (positionString, elementWidth) => {
    if (positionString.search(":") !== -1) {
      // user has passed a precise position, return as is
      return positionString;
    } else {
      const validFirstWords = ["top", "bottom"];
      const validSecondWords = ["left", "right", "center"];
      const words = positionString.split(" ");
      if (words.length >= 2) {
        let hPos = null;
        let vPos = null;
        const firstWord = words[0].trim().toLowerCase();
        const secondWord = words[1].trim().toLowerCase();

        if (validFirstWords.indexOf(firstWord) > -1) {
          vPos = `${firstWord}: 0;`;
        }
        if (validSecondWords.indexOf(secondWord) > -1) {
          if (secondWord === "center") {
            let numericWidth = elementWidth.match(/\d+/g);
            let widthType = elementWidth.replace(/[0-9]/g, "");
            hPos = `left: 50%; margin-left: -${numericWidth / 2}${widthType};`;
          } else hPos = `${secondWord}: 0;`;
        }

        if (hPos && vPos) {
          return `${vPos} ${hPos}`;
        } else if (hPos) return `top: 0; ${hPos}`;
        else if (vPos) return `${vPos} right: 0;`;
      }
    }
    return `top: 0; right: 0;`;
  }
};

export default Util;
