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
    hdf: [],
    ndf: [gh],
    ddt: [],
    hdt: [r, s],
    ndt: [gh]
  },
  Fire: {
    ddf: [w, gd, r],
    hdf: [b, s, fi, gr, i, fa],
    ndf: [],
    ddt: [b, gr, i, s],
    hdt: [fi, w, r, dr],
    ndt: []
  },
  Water: {
    ddf: [e, gr],
    hdf: [s, fi, w, i],
    ndf: [],
    ddt: [fi, gd, r],
    hdt: [w, gr, dr],
    ndt: []
  },
  Electric: {
    ddf: [gd],
    hdf: [fl, s, e],
    ndf: [],
    ddt: [w, fl],
    hdt: [e, gr, dr],
    ndt: [gd]
  },
  Grass: {
    ddf: [fi, i, po, fl, b],
    hdf: [gd, w, gr, e],
    ndf: [],
    ddt: [w, gd, r],
    hdt: [fi, gr, po, fl, b, dr, s],
    ndt: []
  },
  Ice: {
    ddf: [fi, ft, r, s],
    hdf: [i],
    ndf: [],
    ddt: [gr, gd, fl, dr],
    hdt: [fi, w, i, s],
    ndt: []
  },
  Fighting: {
    ddf: [fl, ps, fa],
    hdf: [r, b, da],
    ndf: [],
    ddt: [n, i, r, da, s],
    hdt: [po, fl, ps, b],
    ndt: [gh]
  },
  Poison: {
    ddf: [gd, ps],
    hdf: [ft, po, b, gr, fa],
    ndf: [],
    ddt: [gr, fa],
    hdt: [po, gd, r, gh],
    ndt: [s]
  },
  Ground: {
    ddf: [w, gr, i],
    hdf: [po, r],
    ndf: [e],
    ddt: [fi, e, po, r, s],
    hdt: [gr, b],
    ndt: [fl]
  },
  Flying: {
    ddf: [e, i, r],
    hdf: [ft, b, gr],
    ndf: [gd],
    ddt: [gr, ft, b],
    hdt: [e, r],
    ndt: []
  },
  Psychic: {
    ddf: [b, gh, da],
    hdf: [ft, ps],
    ndf: [],
    ddt: [ft, po],
    hdt: [ps, s],
    ndt: [da]
  },
  Bug: {
    ddf: [fi, fl, r],
    hdf: [ft, gd, gr],
    ndf: [],
    ddt: [gr, ps, da],
    hdt: [fi, ft, po, fl, gh, s, fa],
    ndt: []
  },
  Rock: {
    ddf: [w, gr, ft, gd, s],
    hdf: [n, fl, po, fi],
    ndf: [],
    ddt: [fi, i, fl, b],
    hdt: [ft, gd, s],
    ndt: []
  },
  Ghost: {
    ddf: [gh, da],
    hdf: [po, b],
    ndf: [n, ft],
    ddt: [ps, gh],
    hdt: [da],
    ndt: [n]
  },
  Dragon: {
    ddf: [i, dr, fa],
    hdf: [fi, w, gr, e],
    ndf: [],
    ddt: [dr],
    hdt: [s],
    ndt: [fa]
  },
  Dark: {
    ddf: [ft, b, fa],
    hdf: [gh, da],
    ndf: [ps],
    ddt: [ps, gh],
    hdt: [ft, da, fa],
    ndt: []
  },
  Steel: {
    ddf: [fi, ft, gd],
    hdf: [n, fl, r, b, s, gr, ps, i, dr, fa],
    ndf: [po],
    ddt: [i, r, fa],
    hdt: [fi, w, e, s],
    ndt: []
  },
  Fairy: {
    ddf: [po, s],
    hdf: [ft, da],
    ndf: [dr],
    ddt: [ft, dr, da],
    hdt: [fi, po, s],
    ndt: []
  }
};
