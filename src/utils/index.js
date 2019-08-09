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
  }
};

export default Util;
