const n = 'Normal';
const fi = 'Fire';
const w = 'Water';
const gr = 'Grass';
const e = 'Electric';
const i = 'Ice';
const ft = 'Fighting';
const po = 'Poison';
const gd = 'Ground';
const fl = 'Flying';
const ps = 'Psychic';
const b = 'Bug';
const r = 'Rock';
const gh = 'Ghost';
const da = 'Dark';
const dr = 'Dragon';
const s = 'Steel';
const fa = 'Fairy';

/*
ddf - double damage from
ddt - double damage to
hdt - half damage to
ndt - no damage to
*/

export default {
  Normal: {
    ddf: [fi],
    ddt: [],
    hdt: [r, s],
    ndt: [gh]
  },
  Fire: {
    ddf: [w, gr, r],
    ddt: [b, gr, i, s],
    hdt: [fi, w, r, dr],
    ndt: []
  },
  Water: {
    ddf: [e, gr],
    ddt: [fi, gr, r],
    hdt: [w, gr, dr],
    ndt: []
  },
  Electric: {
    ddf: [gd],
    ddt: [w, fl],
    hdt: [e, gr, dr],
    ndt: [gd]
  },
  Grass: {
    ddf: [fi, i, po, fl, b],
    ddt: [w, gr, r],
    hdt: [fi, gr, po, fl, b, dr, s],
    ndt: []
  },
  Ice: {
    ddf: [fi, ft, r, s],
    ddt: [gr, gd, fl, dr],
    hdt: [fi, w, i, s],
    ndt: []
  },
  Fighting: {
    ddf: [fl, ps, fa],
    ddt: [n, i, r, da, s],
    hdt: [po, fl, ps, b],
    ndt: [gh]
  },
  Poison: {
    ddf: [gd, ps],
    ddt: [gr, fa],
    hdt: [po, gd, r, gh],
    ndt: [s]
  },
  Ground: {
    ddf: [w, gr, i],
    ddt: [fi, e, po, r, s],
    hdt: [gr, b],
    ndt: [fl]
  },
  Flying: {
    ddf: [e, i, r],
    ddt: [gr, ft, b],
    hdt: [e, r],
    ndt: []
  },
  Psychic: {
    ddf: [b, gh, da],
    ddt: [ft, po],
    hdt: [ps, s],
    ndt: [da]
  },
  Bug: {
    ddf: [fi, fl, r],
    ddt: [gr, ps, da],
    hdt: [fi, ft, po, fl, gh, s, fa],
    ndt: []
  },
  Rock: {
    ddf: [w, gr, ft, gd, s],
    ddt: [fi, i, fl, b],
    hdt: [ft, gd, s],
    ndt: []
  },
  Ghost: {
    ddf: [gh, da],
    ddt: [ps, gh],
    hdt: [da],
    ndt: [n]
  },
  Dragon: {
    ddf: [i, dr],
    ddt: [dr],
    hdt: [s],
    ndt: [fa]
  },
  Dark: {
    ddf: [ft, b, fa],
    ddt: [ps, gh],
    hdt: [ft, da, fa],
    ndt: []
  },
  Steel: {
    ddf: [fi, ft, gd],
    ddt: [i, r, fa],
    hdt: [fi, w, e, s],
    ndt: []
  },
  Fairy: {
    ddf: [po, s],
    ddt: [ft, dr, da],
    hdt: [fi, po, s],
    ndt: []
  }
};
