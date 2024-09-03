class CollidableObject extends MovableObject {

    /**
     * @type {boolean} - a flag to mark this instance as collidable
     */
    collidable = true;

    /**
     * @ptype {number} - how much damage can this instance cause to other Destroyahleobjects
     */
    damage = 20;

    /**
     * @type {objects} Numcrical offsets for this instance's coordinates and dimensions,
     * uscd for collision check.
     */

    offset = {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    };
}