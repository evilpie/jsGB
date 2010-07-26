/**
 * jsGB: Z80 core
 * Imran Nazar, May 2009
 * Notes: This is a GameBoy Z80, not a Z80. There are differences.
 * Bugs: If PC wraps at the top of memory, this will not be caught until the end of an instruction
 */

Z80 = {
    _r: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        h: 0,
        l: 0,
        f: 0,
        sp: 0,
        pc: 0,
        i: 0,
        r: 0,
        m: 0,
        t: 0,
        ime: 0
    },

    _clock: {
        m: 0,
        t: 0
    },

    _halt: 0,
    _stop: 0,

    reset: function () {
        Z80._r.a = 0;
        Z80._r.b = 0;
        Z80._r.c = 0;
        Z80._r.d = 0;
        Z80._r.e = 0;
        Z80._r.h = 0;
        Z80._r.l = 0;
        Z80._r.f = 0;
        Z80._r.sp = 0;
        Z80._r.pc = 0;
        Z80._r.i = 0;
        Z80._r.r = 0;
        Z80._r.m = 0;
        Z80._r.t = 0;
        Z80._halt = 0;
        Z80._stop = 0;
        Z80._clock.m = 0;
        Z80._clock.t = 0;
        Z80._r.ime = 1;
        LOG.out('Z80', 'Reset.');
    },

    exec: function () {
        Z80._r.r = (Z80._r.r + 1) & 127;
        Z80._map[MMU.rb(Z80._r.pc++)]();
        Z80._r.pc &= 65535;
        Z80._clock.m += Z80._r.m;
        Z80._clock.t += Z80._r.t;
        if (MMU._inbios && Z80._r.pc == 0x0100) MMU._inbios = 0;
    },

    _ops: { /*--- Load/store ---*/
        LDrr_bb: function () {
            Z80._r.b = Z80._r.b;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_bc: function () {
            Z80._r.b = Z80._r.c;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_bd: function () {
            Z80._r.b = Z80._r.d;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_be: function () {
            Z80._r.b = Z80._r.e;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_bh: function () {
            Z80._r.b = Z80._r.h;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_bl: function () {
            Z80._r.b = Z80._r.l;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ba: function () {
            Z80._r.b = Z80._r.a;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_cb: function () {
            Z80._r.c = Z80._r.b;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_cc: function () {
            Z80._r.c = Z80._r.c;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_cd: function () {
            Z80._r.c = Z80._r.d;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ce: function () {
            Z80._r.c = Z80._r.e;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ch: function () {
            Z80._r.c = Z80._r.h;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_cl: function () {
            Z80._r.c = Z80._r.l;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ca: function () {
            Z80._r.c = Z80._r.a;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_db: function () {
            Z80._r.d = Z80._r.b;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_dc: function () {
            Z80._r.d = Z80._r.c;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_dd: function () {
            Z80._r.d = Z80._r.d;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_de: function () {
            Z80._r.d = Z80._r.e;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_dh: function () {
            Z80._r.d = Z80._r.h;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_dl: function () {
            Z80._r.d = Z80._r.l;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_da: function () {
            Z80._r.d = Z80._r.a;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_eb: function () {
            Z80._r.e = Z80._r.b;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ec: function () {
            Z80._r.e = Z80._r.c;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ed: function () {
            Z80._r.e = Z80._r.d;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ee: function () {
            Z80._r.e = Z80._r.e;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_eh: function () {
            Z80._r.e = Z80._r.h;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_el: function () {
            Z80._r.e = Z80._r.l;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ea: function () {
            Z80._r.e = Z80._r.a;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_hb: function () {
            Z80._r.h = Z80._r.b;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_hc: function () {
            Z80._r.h = Z80._r.c;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_hd: function () {
            Z80._r.h = Z80._r.d;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_he: function () {
            Z80._r.h = Z80._r.e;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_hh: function () {
            Z80._r.h = Z80._r.h;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_hl: function () {
            Z80._r.h = Z80._r.l;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ha: function () {
            Z80._r.h = Z80._r.a;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_lb: function () {
            Z80._r.l = Z80._r.b;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_lc: function () {
            Z80._r.l = Z80._r.c;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ld: function () {
            Z80._r.l = Z80._r.d;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_le: function () {
            Z80._r.l = Z80._r.e;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_lh: function () {
            Z80._r.l = Z80._r.h;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ll: function () {
            Z80._r.l = Z80._r.l;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_la: function () {
            Z80._r.l = Z80._r.a;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ab: function () {
            Z80._r.a = Z80._r.b;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ac: function () {
            Z80._r.a = Z80._r.c;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ad: function () {
            Z80._r.a = Z80._r.d;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ae: function () {
            Z80._r.a = Z80._r.e;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_ah: function () {
            Z80._r.a = Z80._r.h;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_al: function () {
            Z80._r.a = Z80._r.l;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        LDrr_aa: function () {
            Z80._r.a = Z80._r.a;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },

        LDrHLm_b: function () {
            Z80._r.b = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrHLm_c: function () {
            Z80._r.c = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrHLm_d: function () {
            Z80._r.d = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrHLm_e: function () {
            Z80._r.e = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrHLm_h: function () {
            Z80._r.h = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrHLm_l: function () {
            Z80._r.l = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrHLm_a: function () {
            Z80._r.a = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDHLmr_b: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.b);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDHLmr_c: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.c);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDHLmr_d: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.d);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDHLmr_e: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.e);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDHLmr_h: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.h);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDHLmr_l: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.l);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDHLmr_a: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDrn_b: function () {
            Z80._r.b = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrn_c: function () {
            Z80._r.c = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrn_d: function () {
            Z80._r.d = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrn_e: function () {
            Z80._r.e = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrn_h: function () {
            Z80._r.h = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrn_l: function () {
            Z80._r.l = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDrn_a: function () {
            Z80._r.a = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDHLmn: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, MMU.rb(Z80._r.pc));
            Z80._r.pc++;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        LDBCmA: function () {
            MMU.wb((Z80._r.b << 8) + Z80._r.c, Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDDEmA: function () {
            MMU.wb((Z80._r.d << 8) + Z80._r.e, Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDmmA: function () {
            MMU.wb(MMU.rw(Z80._r.pc), Z80._r.a);
            Z80._r.pc += 2;
            Z80._r.m = 4;
            Z80._r.t = 16;
        },

        LDABCm: function () {
            Z80._r.a = MMU.rb((Z80._r.b << 8) + Z80._r.c);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDADEm: function () {
            Z80._r.a = MMU.rb((Z80._r.d << 8) + Z80._r.e);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDAmm: function () {
            Z80._r.a = MMU.rb(MMU.rw(Z80._r.pc));
            Z80._r.pc += 2;
            Z80._r.m = 4;
            Z80._r.t = 16;
        },

        LDBCnn: function () {
            Z80._r.c = MMU.rb(Z80._r.pc);
            Z80._r.b = MMU.rb(Z80._r.pc + 1);
            Z80._r.pc += 2;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        LDDEnn: function () {
            Z80._r.e = MMU.rb(Z80._r.pc);
            Z80._r.d = MMU.rb(Z80._r.pc + 1);
            Z80._r.pc += 2;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        LDHLnn: function () {
            Z80._r.l = MMU.rb(Z80._r.pc);
            Z80._r.h = MMU.rb(Z80._r.pc + 1);
            Z80._r.pc += 2;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        LDSPnn: function () {
            Z80._r.sp = MMU.rw(Z80._r.pc);
            Z80._r.pc += 2;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        LDHLmm: function () {
            var i = MMU.rw(Z80._r.pc);
            Z80._r.pc += 2;
            Z80._r.l = MMU.rb(i);
            Z80._r.h = MMU.rb(i + 1);
            Z80._r.m = 5;
            Z80._r.t = 20;
        },
        LDmmHL: function () {
            var i = MMU.rw(Z80._r.pc);
            Z80._r.pc += 2;
            MMU.ww(i, (Z80._r.h << 8) + Z80._r.l);
            Z80._r.m = 5;
            Z80._r.t = 20;
        },

        LDHLIA: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.a);
            Z80._r.l = (Z80._r.l + 1) & 255;
            if (!Z80._r.l) Z80._r.h = (Z80._r.h + 1) & 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDAHLI: function () {
            Z80._r.a = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.l = (Z80._r.l + 1) & 255;
            if (!Z80._r.l) Z80._r.h = (Z80._r.h + 1) & 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDHLDA: function () {
            MMU.wb((Z80._r.h << 8) + Z80._r.l, Z80._r.a);
            Z80._r.l = (Z80._r.l - 1) & 255;
            if (Z80._r.l == 255) Z80._r.h = (Z80._r.h - 1) & 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDAHLD: function () {
            Z80._r.a = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.l = (Z80._r.l - 1) & 255;
            if (Z80._r.l == 255) Z80._r.h = (Z80._r.h - 1) & 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDAIOn: function () {
            Z80._r.a = MMU.rb(0xFF00 + MMU.rb(Z80._r.pc));
            Z80._r.pc++;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        LDIOnA: function () {
            MMU.wb(0xFF00 + MMU.rb(Z80._r.pc), Z80._r.a);
            Z80._r.pc++;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        LDAIOC: function () {
            Z80._r.a = MMU.rb(0xFF00 + Z80._r.c);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        LDIOCA: function () {
            MMU.wb(0xFF00 + Z80._r.c, Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        LDHLSPn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) i = -((~i + 1) & 255);
            Z80._r.pc++;
            i += Z80._r.sp;
            Z80._r.h = (i >> 8) & 255;
            Z80._r.l = i & 255;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        SWAPr_b: function () {
            var tr = Z80._r.b;
            Z80._r.b = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            MMU.wb((Z80._r.h << 8) + Z80._r.l, tr);
            Z80._r.m = 4;
            Z80._r.t = 16;
        },
        SWAPr_c: function () {
            var tr = Z80._r.c;
            Z80._r.c = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            MMU.wb((Z80._r.h << 8) + Z80._r.l, tr);
            Z80._r.m = 4;
            Z80._r.t = 16;
        },
        SWAPr_d: function () {
            var tr = Z80._r.d;
            Z80._r.d = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            MMU.wb((Z80._r.h << 8) + Z80._r.l, tr);
            Z80._r.m = 4;
            Z80._r.t = 16;
        },
        SWAPr_e: function () {
            var tr = Z80._r.e;
            Z80._r.e = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            MMU.wb((Z80._r.h << 8) + Z80._r.l, tr);
            Z80._r.m = 4;
            Z80._r.t = 16;
        },
        SWAPr_h: function () {
            var tr = Z80._r.h;
            Z80._r.h = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            MMU.wb((Z80._r.h << 8) + Z80._r.l, tr);
            Z80._r.m = 4;
            Z80._r.t = 16;
        },
        SWAPr_l: function () {
            var tr = Z80._r.l;
            Z80._r.l = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            MMU.wb((Z80._r.h << 8) + Z80._r.l, tr);
            Z80._r.m = 4;
            Z80._r.t = 16;
        },
        SWAPr_a: function () {
            var tr = Z80._r.a;
            Z80._r.a = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            MMU.wb((Z80._r.h << 8) + Z80._r.l, tr);
            Z80._r.m = 4;
            Z80._r.t = 16;
        },

        /*--- Data processing ---*/
        ADDr_b: function () {
            Z80._r.a += Z80._r.b;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ADDr_c: function () {
            Z80._r.a += Z80._r.c;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ADDr_d: function () {
            Z80._r.a += Z80._r.d;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ADDr_e: function () {
            Z80._r.a += Z80._r.e;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ADDr_h: function () {
            Z80._r.a += Z80._r.h;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ADDr_l: function () {
            Z80._r.a += Z80._r.l;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ADDr_a: function () {
            Z80._r.a += Z80._r.a;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ADDHL: function () {
            Z80._r.a += MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        ADDn: function () {
            Z80._r.a += MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        ADDHLBC: function () {
            var hl = (Z80._r.h << 8) + Z80._r.l;
            hl += (Z80._r.b << 8) + Z80._r.c;
            if (hl > 65535) Z80._r.f |= 0x10;
            else Z80._r.f &= 0xEF;
            Z80._r.h = (hl >> 8) & 255;
            Z80._r.l = hl & 255;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        ADDHLDE: function () {
            var hl = (Z80._r.h << 8) + Z80._r.l;
            hl += (Z80._r.d << 8) + Z80._r.e;
            if (hl > 65535) Z80._r.f |= 0x10;
            else Z80._r.f &= 0xEF;
            Z80._r.h = (hl >> 8) & 255;
            Z80._r.l = hl & 255;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        ADDHLHL: function () {
            var hl = (Z80._r.h << 8) + Z80._r.l;
            hl += (Z80._r.h << 8) + Z80._r.l;
            if (hl > 65535) Z80._r.f |= 0x10;
            else Z80._r.f &= 0xEF;
            Z80._r.h = (hl >> 8) & 255;
            Z80._r.l = hl & 255;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        ADDHLSP: function () {
            var hl = (Z80._r.h << 8) + Z80._r.l;
            hl += Z80._r.sp;
            if (hl > 65535) Z80._r.f |= 0x10;
            else Z80._r.f &= 0xEF;
            Z80._r.h = (hl >> 8) & 255;
            Z80._r.l = hl & 255;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        ADDSPn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) i = -((~i + 1) & 255);
            Z80._r.pc++;
            Z80._r.sp += i;
            Z80._r.m = 4;
            Z80._r.t = 16;
        },

        ADCr_b: function () {
            Z80._r.a += Z80._r.b;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        ADCr_c: function () {
            Z80._r.a += Z80._r.c;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        ADCr_d: function () {
            Z80._r.a += Z80._r.d;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        ADCr_e: function () {
            Z80._r.a += Z80._r.e;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        ADCr_h: function () {
            Z80._r.a += Z80._r.h;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        ADCr_l: function () {
            Z80._r.a += Z80._r.l;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        ADCr_a: function () {
            Z80._r.a += Z80._r.a;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        ADCHL: function () {
            Z80._r.a += MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 2;Z80._r.t = 8;
        },
        ADCn: function () {
            Z80._r.a += MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.a += (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a);
            if (Z80._r.a > 255) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 2;Z80._r.t = 8;
        },

        SUBr_b: function () {
            Z80._r.a -= Z80._r.b;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        SUBr_c: function () {
            Z80._r.a -= Z80._r.c;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        SUBr_d: function () {
            Z80._r.a -= Z80._r.d;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        SUBr_e: function () {
            Z80._r.a -= Z80._r.e;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        SUBr_h: function () {
            Z80._r.a -= Z80._r.h;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        SUBr_l: function () {
            Z80._r.a -= Z80._r.l;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        SUBr_a: function () {
            Z80._r.a -= Z80._r.a;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        SUBHL: function () {
            Z80._r.a -= MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        SUBn: function () {
            Z80._r.a -= MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        SBCr_b: function () {
            Z80._r.a -= Z80._r.b;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        SBCr_c: function () {
            Z80._r.a -= Z80._r.c;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        SBCr_d: function () {
            Z80._r.a -= Z80._r.d;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        SBCr_e: function () {
            Z80._r.a -= Z80._r.e;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        SBCr_h: function () {
            Z80._r.a -= Z80._r.h;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        SBCr_l: function () {
            Z80._r.a -= Z80._r.l;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        SBCr_a: function () {
            Z80._r.a -= Z80._r.a;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 1;Z80._r.t = 4;
        },
        SBCHL: function () {
            Z80._r.a -= MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 2;Z80._r.t = 8;
        },
        SBCn: function () {
            Z80._r.a -= MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.a -= (Z80._r.f & 0x10) ? 1 : 0;Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;Z80._r.a &= 255;Z80._r.m = 2;Z80._r.t = 8;
        },

        CPr_b: function () {
            var i = Z80._r.a;
            i -= Z80._r.b;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        CPr_c: function () {
            var i = Z80._r.a;
            i -= Z80._r.c;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        CPr_d: function () {
            var i = Z80._r.a;
            i -= Z80._r.d;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        CPr_e: function () {
            var i = Z80._r.a;
            i -= Z80._r.e;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        CPr_h: function () {
            var i = Z80._r.a;
            i -= Z80._r.h;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        CPr_l: function () {
            var i = Z80._r.a;
            i -= Z80._r.l;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        CPr_a: function () {
            var i = Z80._r.a;
            i -= Z80._r.a;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        CPHL: function () {
            var i = Z80._r.a;
            i -= MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        CPn: function () { // one of those small performance killers
            var i = Z80._r.a;
            i -= MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._ops.fz(i, 1);
            if (i < 0) Z80._r.f |= 0x10;
            i &= 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        ANDr_b: function () {
            Z80._r.a &= Z80._r.b;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ANDr_c: function () {
            Z80._r.a &= Z80._r.c;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ANDr_d: function () {
            Z80._r.a &= Z80._r.d;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ANDr_e: function () {
            Z80._r.a &= Z80._r.e;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ANDr_h: function () {
            Z80._r.a &= Z80._r.h;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ANDr_l: function () {
            Z80._r.a &= Z80._r.l;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ANDr_a: function () {
            Z80._r.a &= Z80._r.a;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ANDHL: function () {
            Z80._r.a &= MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        ANDn: function () {
            Z80._r.a &= MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        ORr_b: function () {
            Z80._r.a |= Z80._r.b;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ORr_c: function () {
            Z80._r.a |= Z80._r.c;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ORr_d: function () {
            Z80._r.a |= Z80._r.d;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ORr_e: function () {
            Z80._r.a |= Z80._r.e;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ORr_h: function () {
            Z80._r.a |= Z80._r.h;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ORr_l: function () {
            Z80._r.a |= Z80._r.l;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ORr_a: function () {
            Z80._r.a |= Z80._r.a;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        ORHL: function () {
            Z80._r.a |= MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        ORn: function () {
            Z80._r.a |= MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        XORr_b: function () {
            Z80._r.a ^= Z80._r.b;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        XORr_c: function () {
            Z80._r.a ^= Z80._r.c;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        XORr_d: function () {
            Z80._r.a ^= Z80._r.d;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        XORr_e: function () {
            Z80._r.a ^= Z80._r.e;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        XORr_h: function () {
            Z80._r.a ^= Z80._r.h;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        XORr_l: function () {
            Z80._r.a ^= Z80._r.l;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        XORr_a: function () {
            Z80._r.a ^= Z80._r.a;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        XORHL: function () {
            Z80._r.a ^= MMU.rb((Z80._r.h << 8) + Z80._r.l);
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        XORn: function () {
            Z80._r.a ^= MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        INCr_b: function () {
            Z80._r.b++;
            Z80._r.b &= 255;
            Z80._ops.fz(Z80._r.b);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCr_c: function () {
            Z80._r.c++;
            Z80._r.c &= 255;
            Z80._ops.fz(Z80._r.c);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCr_d: function () {
            Z80._r.d++;
            Z80._r.d &= 255;
            Z80._ops.fz(Z80._r.d);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCr_e: function () {
            Z80._r.e++;
            Z80._r.e &= 255;
            Z80._ops.fz(Z80._r.e);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCr_h: function () {
            Z80._r.h++;
            Z80._r.h &= 255;
            Z80._ops.fz(Z80._r.h);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCr_l: function () {
            Z80._r.l++;
            Z80._r.l &= 255;
            Z80._ops.fz(Z80._r.l);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCr_a: function () {
            Z80._r.a++;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCHLm: function () {
            var i = MMU.rb((Z80._r.h << 8) + Z80._r.l) + 1;
            i &= 255;
            MMU.wb((Z80._r.h << 8) + Z80._r.l, i);
            Z80._ops.fz(i);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        DECr_b: function () {
            Z80._r.b--;
            Z80._r.b &= 255;
            Z80._ops.fz(Z80._r.b);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECr_c: function () {
            Z80._r.c--;
            Z80._r.c &= 255;
            Z80._ops.fz(Z80._r.c);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECr_d: function () {
            Z80._r.d--;
            Z80._r.d &= 255;
            Z80._ops.fz(Z80._r.d);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECr_e: function () {
            Z80._r.e--;
            Z80._r.e &= 255;
            Z80._ops.fz(Z80._r.e);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECr_h: function () {
            Z80._r.h--;
            Z80._r.h &= 255;
            Z80._ops.fz(Z80._r.h);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECr_l: function () {
            Z80._r.l--;
            Z80._r.l &= 255;
            Z80._ops.fz(Z80._r.l);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECr_a: function () {
            Z80._r.a--;
            Z80._r.a &= 255;
            Z80._ops.fz(Z80._r.a);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECHLm: function () {
            var i = MMU.rb((Z80._r.h << 8) + Z80._r.l) - 1;
            i &= 255;
            MMU.wb((Z80._r.h << 8) + Z80._r.l, i);
            Z80._ops.fz(i);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        INCBC: function () {
            Z80._r.c = (Z80._r.c + 1) & 255;
            if (!Z80._r.c) Z80._r.b = (Z80._r.b + 1) & 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCDE: function () {
            Z80._r.e = (Z80._r.e + 1) & 255;
            if (!Z80._r.e) Z80._r.d = (Z80._r.d + 1) & 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCHL: function () {
            Z80._r.l = (Z80._r.l + 1) & 255;
            if (!Z80._r.l) Z80._r.h = (Z80._r.h + 1) & 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        INCSP: function () {
            Z80._r.sp = (Z80._r.sp + 1) & 65535;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },

        DECBC: function () {
            Z80._r.c = (Z80._r.c - 1) & 255;
            if (Z80._r.c == 255) Z80._r.b = (Z80._r.b - 1) & 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECDE: function () {
            Z80._r.e = (Z80._r.e - 1) & 255;
            if (Z80._r.e == 255) Z80._r.d = (Z80._r.d - 1) & 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECHL: function () {
            Z80._r.l = (Z80._r.l - 1) & 255;
            if (Z80._r.l == 255) Z80._r.h = (Z80._r.h - 1) & 255;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        DECSP: function () {
            Z80._r.sp = (Z80._r.sp - 1) & 65535;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },

        /*--- Bit manipulation ---*/
        BIT0b: function () {
            Z80._ops.fz(Z80._r.b & 0x01);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT0c: function () {
            Z80._ops.fz(Z80._r.c & 0x01);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT0d: function () {
            Z80._ops.fz(Z80._r.d & 0x01);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT0e: function () {
            Z80._ops.fz(Z80._r.e & 0x01);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT0h: function () {
            Z80._ops.fz(Z80._r.h & 0x01);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT0l: function () {
            Z80._ops.fz(Z80._r.l & 0x01);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT0a: function () {
            Z80._ops.fz(Z80._r.a & 0x01);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT0m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x01);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        BIT1b: function () {
            Z80._ops.fz(Z80._r.b & 0x02);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT1c: function () {
            Z80._ops.fz(Z80._r.c & 0x02);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT1d: function () {
            Z80._ops.fz(Z80._r.d & 0x02);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT1e: function () {
            Z80._ops.fz(Z80._r.e & 0x02);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT1h: function () {
            Z80._ops.fz(Z80._r.h & 0x02);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT1l: function () {
            Z80._ops.fz(Z80._r.l & 0x02);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT1a: function () {
            Z80._ops.fz(Z80._r.a & 0x02);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT1m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x02);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        BIT2b: function () {
            Z80._ops.fz(Z80._r.b & 0x04);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT2c: function () {
            Z80._ops.fz(Z80._r.c & 0x04);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT2d: function () {
            Z80._ops.fz(Z80._r.d & 0x04);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT2e: function () {
            Z80._ops.fz(Z80._r.e & 0x04);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT2h: function () {
            Z80._ops.fz(Z80._r.h & 0x04);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT2l: function () {
            Z80._ops.fz(Z80._r.l & 0x04);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT2a: function () {
            Z80._ops.fz(Z80._r.a & 0x04);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT2m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x04);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        BIT3b: function () {
            Z80._ops.fz(Z80._r.b & 0x08);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT3c: function () {
            Z80._ops.fz(Z80._r.c & 0x08);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT3d: function () {
            Z80._ops.fz(Z80._r.d & 0x08);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT3e: function () {
            Z80._ops.fz(Z80._r.e & 0x08);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT3h: function () {
            Z80._ops.fz(Z80._r.h & 0x08);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT3l: function () {
            Z80._ops.fz(Z80._r.l & 0x08);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT3a: function () {
            Z80._ops.fz(Z80._r.a & 0x08);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT3m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x08);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        BIT4b: function () {
            Z80._ops.fz(Z80._r.b & 0x10);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT4c: function () {
            Z80._ops.fz(Z80._r.c & 0x10);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT4d: function () {
            Z80._ops.fz(Z80._r.d & 0x10);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT4e: function () {
            Z80._ops.fz(Z80._r.e & 0x10);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT4h: function () {
            Z80._ops.fz(Z80._r.h & 0x10);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT4l: function () {
            Z80._ops.fz(Z80._r.l & 0x10);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT4a: function () {
            Z80._ops.fz(Z80._r.a & 0x10);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT4m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x10);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        BIT5b: function () {
            Z80._ops.fz(Z80._r.b & 0x20);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT5c: function () {
            Z80._ops.fz(Z80._r.c & 0x20);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT5d: function () {
            Z80._ops.fz(Z80._r.d & 0x20);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT5e: function () {
            Z80._ops.fz(Z80._r.e & 0x20);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT5h: function () {
            Z80._ops.fz(Z80._r.h & 0x20);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT5l: function () {
            Z80._ops.fz(Z80._r.l & 0x20);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT5a: function () {
            Z80._ops.fz(Z80._r.a & 0x20);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT5m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x20);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        BIT6b: function () {
            Z80._ops.fz(Z80._r.b & 0x40);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT6c: function () {
            Z80._ops.fz(Z80._r.c & 0x40);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT6d: function () {
            Z80._ops.fz(Z80._r.d & 0x40);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT6e: function () {
            Z80._ops.fz(Z80._r.e & 0x40);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT6h: function () {
            Z80._ops.fz(Z80._r.h & 0x40);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT6l: function () {
            Z80._ops.fz(Z80._r.l & 0x40);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT6a: function () {
            Z80._ops.fz(Z80._r.a & 0x40);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT6m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x40);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        BIT7b: function () {
            Z80._ops.fz(Z80._r.b & 0x80);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT7c: function () {
            Z80._ops.fz(Z80._r.c & 0x80);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT7d: function () {
            Z80._ops.fz(Z80._r.d & 0x80);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT7e: function () {
            Z80._ops.fz(Z80._r.e & 0x80);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT7h: function () {
            Z80._ops.fz(Z80._r.h & 0x80);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT7l: function () {
            Z80._ops.fz(Z80._r.l & 0x80);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT7a: function () {
            Z80._ops.fz(Z80._r.a & 0x80);
            Z80._r.m = 2;
            Z80._r.t = 8;
        },
        BIT7m: function () {
            Z80._ops.fz(MMU.rb((Z80._r.h << 8) + Z80._r.l) & 0x80);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        RLA: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.a & 0x80 ? 0x10 : 0;Z80._r.a = (Z80._r.a << 1) + ci;Z80._r.a &= 255;Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 1;Z80._r.t = 4;
        },
        RLCA: function () {
            var ci = Z80._r.a & 0x80 ? 1 : 0;
            var co = Z80._r.a & 0x80 ? 0x10 : 0;Z80._r.a = (Z80._r.a << 1) + ci;Z80._r.a &= 255;Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 1;Z80._r.t = 4;
        },
        RRA: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.a & 1 ? 0x10 : 0;Z80._r.a = (Z80._r.a >> 1) + ci;Z80._r.a &= 255;Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 1;Z80._r.t = 4;
        },
        RRCA: function () {
            var ci = Z80._r.a & 1 ? 0x80 : 0;
            var co = Z80._r.a & 1 ? 0x10 : 0;Z80._r.a = (Z80._r.a >> 1) + ci;Z80._r.a &= 255;Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 1;Z80._r.t = 4;
        },

        RLr_b: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.b & 0x80 ? 0x10 : 0;Z80._r.b = (Z80._r.b << 1) + ci;Z80._r.b &= 255;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLr_c: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.c & 0x80 ? 0x10 : 0;Z80._r.c = (Z80._r.c << 1) + ci;Z80._r.c &= 255;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLr_d: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.d & 0x80 ? 0x10 : 0;Z80._r.d = (Z80._r.d << 1) + ci;Z80._r.d &= 255;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLr_e: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.e & 0x80 ? 0x10 : 0;Z80._r.e = (Z80._r.e << 1) + ci;Z80._r.e &= 255;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLr_h: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.h & 0x80 ? 0x10 : 0;Z80._r.h = (Z80._r.h << 1) + ci;Z80._r.h &= 255;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLr_l: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.l & 0x80 ? 0x10 : 0;Z80._r.l = (Z80._r.l << 1) + ci;Z80._r.l &= 255;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLr_a: function () {
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = Z80._r.a & 0x80 ? 0x10 : 0;Z80._r.a = (Z80._r.a << 1) + ci;Z80._r.a &= 255;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLHL: function () {
            var i = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            var ci = Z80._r.f & 0x10 ? 1 : 0;
            var co = i & 0x80 ? 0x10 : 0;i = (i << 1) + ci;i &= 255;Z80._ops.fz(i);MMU.wb((Z80._r.h << 8) + Z80._r.l, i);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 4;Z80._r.t = 16;
        },

        RLCr_b: function () {
            var ci = Z80._r.b & 0x80 ? 1 : 0;
            var co = Z80._r.b & 0x80 ? 0x10 : 0;Z80._r.b = (Z80._r.b << 1) + ci;Z80._r.b &= 255;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLCr_c: function () {
            var ci = Z80._r.c & 0x80 ? 1 : 0;
            var co = Z80._r.c & 0x80 ? 0x10 : 0;Z80._r.c = (Z80._r.c << 1) + ci;Z80._r.c &= 255;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLCr_d: function () {
            var ci = Z80._r.d & 0x80 ? 1 : 0;
            var co = Z80._r.d & 0x80 ? 0x10 : 0;Z80._r.d = (Z80._r.d << 1) + ci;Z80._r.d &= 255;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLCr_e: function () {
            var ci = Z80._r.e & 0x80 ? 1 : 0;
            var co = Z80._r.e & 0x80 ? 0x10 : 0;Z80._r.e = (Z80._r.e << 1) + ci;Z80._r.e &= 255;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLCr_h: function () {
            var ci = Z80._r.h & 0x80 ? 1 : 0;
            var co = Z80._r.h & 0x80 ? 0x10 : 0;Z80._r.h = (Z80._r.h << 1) + ci;Z80._r.h &= 255;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLCr_l: function () {
            var ci = Z80._r.l & 0x80 ? 1 : 0;
            var co = Z80._r.l & 0x80 ? 0x10 : 0;Z80._r.l = (Z80._r.l << 1) + ci;Z80._r.l &= 255;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLCr_a: function () {
            var ci = Z80._r.a & 0x80 ? 1 : 0;
            var co = Z80._r.a & 0x80 ? 0x10 : 0;Z80._r.a = (Z80._r.a << 1) + ci;Z80._r.a &= 255;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RLCHL: function () {
            var i = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            var ci = i & 0x80 ? 1 : 0;
            var co = i & 0x80 ? 0x10 : 0;i = (i << 1) + ci;i &= 255;Z80._ops.fz(i);MMU.wb((Z80._r.h << 8) + Z80._r.l, i);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 4;Z80._r.t = 16;
        },

        RRr_b: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.b & 1 ? 0x10 : 0;Z80._r.b = (Z80._r.b >> 1) + ci;Z80._r.b &= 255;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRr_c: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.c & 1 ? 0x10 : 0;Z80._r.c = (Z80._r.c >> 1) + ci;Z80._r.c &= 255;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRr_d: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.d & 1 ? 0x10 : 0;Z80._r.d = (Z80._r.d >> 1) + ci;Z80._r.d &= 255;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRr_e: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.e & 1 ? 0x10 : 0;Z80._r.e = (Z80._r.e >> 1) + ci;Z80._r.e &= 255;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRr_h: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.h & 1 ? 0x10 : 0;Z80._r.h = (Z80._r.h >> 1) + ci;Z80._r.h &= 255;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRr_l: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.l & 1 ? 0x10 : 0;Z80._r.l = (Z80._r.l >> 1) + ci;Z80._r.l &= 255;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRr_a: function () {
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = Z80._r.a & 1 ? 0x10 : 0;Z80._r.a = (Z80._r.a >> 1) + ci;Z80._r.a &= 255;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRHL: function () {
            var i = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            var ci = Z80._r.f & 0x10 ? 0x80 : 0;
            var co = i & 1 ? 0x10 : 0;i = (i >> 1) + ci;i &= 255;MMU.wb((Z80._r.h << 8) + Z80._r.l, i);Z80._ops.fz(i);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 4;Z80._r.t = 16;
        },

        RRCr_b: function () {
            var ci = Z80._r.b & 1 ? 0x80 : 0;
            var co = Z80._r.b & 1 ? 0x10 : 0;Z80._r.b = (Z80._r.b >> 1) + ci;Z80._r.b &= 255;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRCr_c: function () {
            var ci = Z80._r.c & 1 ? 0x80 : 0;
            var co = Z80._r.c & 1 ? 0x10 : 0;Z80._r.c = (Z80._r.c >> 1) + ci;Z80._r.c &= 255;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRCr_d: function () {
            var ci = Z80._r.d & 1 ? 0x80 : 0;
            var co = Z80._r.d & 1 ? 0x10 : 0;Z80._r.d = (Z80._r.d >> 1) + ci;Z80._r.d &= 255;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRCr_e: function () {
            var ci = Z80._r.e & 1 ? 0x80 : 0;
            var co = Z80._r.e & 1 ? 0x10 : 0;Z80._r.e = (Z80._r.e >> 1) + ci;Z80._r.e &= 255;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRCr_h: function () {
            var ci = Z80._r.h & 1 ? 0x80 : 0;
            var co = Z80._r.h & 1 ? 0x10 : 0;Z80._r.h = (Z80._r.h >> 1) + ci;Z80._r.h &= 255;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRCr_l: function () {
            var ci = Z80._r.l & 1 ? 0x80 : 0;
            var co = Z80._r.l & 1 ? 0x10 : 0;Z80._r.l = (Z80._r.l >> 1) + ci;Z80._r.l &= 255;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRCr_a: function () {
            var ci = Z80._r.a & 1 ? 0x80 : 0;
            var co = Z80._r.a & 1 ? 0x10 : 0;Z80._r.a = (Z80._r.a >> 1) + ci;Z80._r.a &= 255;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        RRCHL: function () {
            var i = MMU.rb((Z80._r.h << 8) + Z80._r.l);
            var ci = i & 1 ? 0x80 : 0;
            var co = i & 1 ? 0x10 : 0;i = (i >> 1) + ci;i &= 255;MMU.wb((Z80._r.h << 8) + Z80._r.l, i);Z80._ops.fz(i);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 4;Z80._r.t = 16;
        },

        SLAr_b: function () {
            var co = Z80._r.b & 0x80 ? 0x10 : 0;Z80._r.b = (Z80._r.b << 1) & 255;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLAr_c: function () {
            var co = Z80._r.c & 0x80 ? 0x10 : 0;Z80._r.c = (Z80._r.c << 1) & 255;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLAr_d: function () {
            var co = Z80._r.d & 0x80 ? 0x10 : 0;Z80._r.d = (Z80._r.d << 1) & 255;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLAr_e: function () {
            var co = Z80._r.e & 0x80 ? 0x10 : 0;Z80._r.e = (Z80._r.e << 1) & 255;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLAr_h: function () {
            var co = Z80._r.h & 0x80 ? 0x10 : 0;Z80._r.h = (Z80._r.h << 1) & 255;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLAr_l: function () {
            var co = Z80._r.l & 0x80 ? 0x10 : 0;Z80._r.l = (Z80._r.l << 1) & 255;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLAr_a: function () {
            var co = Z80._r.a & 0x80 ? 0x10 : 0;Z80._r.a = (Z80._r.a << 1) & 255;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },

        SLLr_b: function () {
            var co = Z80._r.b & 0x80 ? 0x10 : 0;Z80._r.b = (Z80._r.b << 1) & 255 + 1;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLLr_c: function () {
            var co = Z80._r.c & 0x80 ? 0x10 : 0;Z80._r.c = (Z80._r.c << 1) & 255 + 1;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLLr_d: function () {
            var co = Z80._r.d & 0x80 ? 0x10 : 0;Z80._r.d = (Z80._r.d << 1) & 255 + 1;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLLr_e: function () {
            var co = Z80._r.e & 0x80 ? 0x10 : 0;Z80._r.e = (Z80._r.e << 1) & 255 + 1;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLLr_h: function () {
            var co = Z80._r.h & 0x80 ? 0x10 : 0;Z80._r.h = (Z80._r.h << 1) & 255 + 1;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLLr_l: function () {
            var co = Z80._r.l & 0x80 ? 0x10 : 0;Z80._r.l = (Z80._r.l << 1) & 255 + 1;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SLLr_a: function () {
            var co = Z80._r.a & 0x80 ? 0x10 : 0;Z80._r.a = (Z80._r.a << 1) & 255 + 1;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },

        SRAr_b: function () {
            var ci = Z80._r.b & 0x80;
            var co = Z80._r.b & 1 ? 0x10 : 0;Z80._r.b = ((Z80._r.b >> 1) + ci) & 255;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRAr_c: function () {
            var ci = Z80._r.c & 0x80;
            var co = Z80._r.c & 1 ? 0x10 : 0;Z80._r.c = ((Z80._r.c >> 1) + ci) & 255;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRAr_d: function () {
            var ci = Z80._r.d & 0x80;
            var co = Z80._r.d & 1 ? 0x10 : 0;Z80._r.d = ((Z80._r.d >> 1) + ci) & 255;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRAr_e: function () {
            var ci = Z80._r.e & 0x80;
            var co = Z80._r.e & 1 ? 0x10 : 0;Z80._r.e = ((Z80._r.e >> 1) + ci) & 255;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRAr_h: function () {
            var ci = Z80._r.h & 0x80;
            var co = Z80._r.h & 1 ? 0x10 : 0;Z80._r.h = ((Z80._r.h >> 1) + ci) & 255;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRAr_l: function () {
            var ci = Z80._r.l & 0x80;
            var co = Z80._r.l & 1 ? 0x10 : 0;Z80._r.l = ((Z80._r.l >> 1) + ci) & 255;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRAr_a: function () {
            var ci = Z80._r.a & 0x80;
            var co = Z80._r.a & 1 ? 0x10 : 0;Z80._r.a = ((Z80._r.a >> 1) + ci) & 255;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },

        SRLr_b: function () {
            var co = Z80._r.b & 1 ? 0x10 : 0;Z80._r.b = (Z80._r.b >> 1) & 255;Z80._ops.fz(Z80._r.b);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRLr_c: function () {
            var co = Z80._r.c & 1 ? 0x10 : 0;Z80._r.c = (Z80._r.c >> 1) & 255;Z80._ops.fz(Z80._r.c);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRLr_d: function () {
            var co = Z80._r.d & 1 ? 0x10 : 0;Z80._r.d = (Z80._r.d >> 1) & 255;Z80._ops.fz(Z80._r.d);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRLr_e: function () {
            var co = Z80._r.e & 1 ? 0x10 : 0;Z80._r.e = (Z80._r.e >> 1) & 255;Z80._ops.fz(Z80._r.e);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRLr_h: function () {
            var co = Z80._r.h & 1 ? 0x10 : 0;Z80._r.h = (Z80._r.h >> 1) & 255;Z80._ops.fz(Z80._r.h);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRLr_l: function () {
            var co = Z80._r.l & 1 ? 0x10 : 0;Z80._r.l = (Z80._r.l >> 1) & 255;Z80._ops.fz(Z80._r.l);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },
        SRLr_a: function () {
            var co = Z80._r.a & 1 ? 0x10 : 0;Z80._r.a = (Z80._r.a >> 1) & 255;Z80._ops.fz(Z80._r.a);Z80._r.f = (Z80._r.f & 0xEF) + co;Z80._r.m = 2;Z80._r.t = 8;
        },

        CPL: function () {
            Z80._r.a = (~Z80._r.a) & 255;
            Z80._ops.fz(Z80._r.a, 1);
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        NEG: function () {
            Z80._r.a = 0 - Z80._r.a;
            Z80._ops.fz(Z80._r.a, 1);
            if (Z80._r.a < 0) Z80._r.f |= 0x10;
            Z80._r.a &= 255;
            Z80._r.m = 2;
            Z80._r.t = 8;
        },

        CCF: function () {
            var ci = Z80._r.f & 0x10 ? 0 : 0x10;Z80._r.f = (Z80._r.f & 0xEF) + ci;Z80._r.m = 1;Z80._r.t = 4;
        },
        SCF: function () {
            Z80._r.f |= 0x10;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },

        /*--- Stack ---*/
        PUSHBC: function () {
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.b);
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.c);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        PUSHDE: function () {
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.d);
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.e);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        PUSHHL: function () {
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.h);
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.l);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        PUSHAF: function () {
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.a);
            Z80._r.sp--;
            MMU.wb(Z80._r.sp, Z80._r.f);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        POPBC: function () {
            Z80._r.c = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.b = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        POPDE: function () {
            Z80._r.e = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.d = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        POPHL: function () {
            Z80._r.l = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.h = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        POPAF: function () {
            Z80._r.f = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.a = MMU.rb(Z80._r.sp);
            Z80._r.sp++;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        /*--- Jump ---*/
        JPnn: function () {
            Z80._r.pc = MMU.rw(Z80._r.pc);
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        JPHL: function () {
            Z80._r.pc = Z80._r.hl;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        JPNZnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x80) == 0x00) {
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m++;
                Z80._r.t += 4;
            } else Z80._r.pc += 2;
        },
        JPZnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x80) == 0x80) {
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m++;
                Z80._r.t += 4;
            } else Z80._r.pc += 2;
        },
        JPNCnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x10) == 0x00) {
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m++;
                Z80._r.t += 4;
            } else Z80._r.pc += 2;
        },
        JPCnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x10) == 0x10) {
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m++;
                Z80._r.t += 4;
            } else Z80._r.pc += 2;
        },

        JRn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) i = -((~i + 1) & 255);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
            Z80._r.pc += i;
            Z80._r.m++;
            Z80._r.t += 4;
        },
        JRNZn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) {
                i = -(256 - i); // awesome speed improvment
            }
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;

            if ((Z80._r.f & 0x80) == 0x00) {
                Z80._r.pc += i;
                Z80._r.m++;
                Z80._r.t += 4;
            }
        },
        JRZn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) i = -((~i + 1) & 255);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
            if ((Z80._r.f & 0x80) == 0x80) {
                Z80._r.pc += i;
                Z80._r.m++;
                Z80._r.t += 4;
            }
        },
        JRNCn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) i = -((~i + 1) & 255);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
            if ((Z80._r.f & 0x10) == 0x00) {
                Z80._r.pc += i;
                Z80._r.m++;
                Z80._r.t += 4;
            }
        },
        JRCn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) i = -((~i + 1) & 255);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
            if ((Z80._r.f & 0x10) == 0x10) {
                Z80._r.pc += i;
                Z80._r.m++;
                Z80._r.t += 4;
            }
        },

        DJNZn: function () {
            var i = MMU.rb(Z80._r.pc);
            if (i > 127) i = -((~i + 1) & 255);
            Z80._r.pc++;
            Z80._r.m = 2;
            Z80._r.t = 8;
            Z80._r.b--;
            if (Z80._r.b) {
                Z80._r.pc += i;
                Z80._r.m++;
                Z80._r.t += 4;
            }
        },

        CALLnn: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc + 2);
            Z80._r.pc = MMU.rw(Z80._r.pc);
            Z80._r.m = 5;
            Z80._r.t = 20;
        },
        CALLNZnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x80) == 0x00) {
                Z80._r.sp -= 2;
                MMU.ww(Z80._r.sp, Z80._r.pc + 2);
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m += 2;
                Z80._r.t += 8;
            } else Z80._r.pc += 2;
        },
        CALLZnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x80) == 0x80) {
                Z80._r.sp -= 2;
                MMU.ww(Z80._r.sp, Z80._r.pc + 2);
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m += 2;
                Z80._r.t += 8;
            } else Z80._r.pc += 2;
        },
        CALLNCnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x10) == 0x00) {
                Z80._r.sp -= 2;
                MMU.ww(Z80._r.sp, Z80._r.pc + 2);
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m += 2;
                Z80._r.t += 8;
            } else Z80._r.pc += 2;
        },
        CALLCnn: function () {
            Z80._r.m = 3;
            Z80._r.t = 12;
            if ((Z80._r.f & 0x10) == 0x10) {
                Z80._r.sp -= 2;
                MMU.ww(Z80._r.sp, Z80._r.pc + 2);
                Z80._r.pc = MMU.rw(Z80._r.pc);
                Z80._r.m += 2;
                Z80._r.t += 8;
            } else Z80._r.pc += 2;
        },

        RET: function () {
            Z80._r.pc = MMU.rw(Z80._r.sp);
            Z80._r.sp += 2;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RETI: function () {
            Z80._r.ime = 1;
            Z80._r.pc = MMU.rw(Z80._r.sp);
            Z80._r.sp += 2;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RETNZ: function () {
            Z80._r.m = 1;
            Z80._r.t = 4;
            if ((Z80._r.f & 0x80) == 0x00) {
                Z80._r.pc = MMU.rw(Z80._r.sp);
                Z80._r.sp += 2;
                Z80._r.m += 2;
                Z80._r.t += 8;
            }
        },
        RETZ: function () {
            Z80._r.m = 1;
            Z80._r.t = 4;
            if ((Z80._r.f & 0x80) == 0x80) {
                Z80._r.pc = MMU.rw(Z80._r.sp);
                Z80._r.sp += 2;
                Z80._r.m += 2;
                Z80._r.t += 8;
            }
        },
        RETNC: function () {
            Z80._r.m = 1;
            Z80._r.t = 4;
            if ((Z80._r.f & 0x10) == 0x00) {
                Z80._r.pc = MMU.rw(Z80._r.sp);
                Z80._r.sp += 2;
                Z80._r.m += 2;
                Z80._r.t += 8;
            }
        },
        RETC: function () {
            Z80._r.m = 1;
            Z80._r.t = 4;
            if ((Z80._r.f & 0x10) == 0x10) {
                Z80._r.pc = MMU.rw(Z80._r.sp);
                Z80._r.sp += 2;
                Z80._r.m += 2;
                Z80._r.t += 8;
            }
        },

        RST00: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x00;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST08: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x08;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST10: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x10;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST18: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x18;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST20: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x20;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST28: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x28;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST30: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x30;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST38: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x38;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST40: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x40;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST48: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x48;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST50: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x50;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST58: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x58;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },
        RST60: function () {
            Z80._r.sp -= 2;
            MMU.ww(Z80._r.sp, Z80._r.pc);
            Z80._r.pc = 0x60;
            Z80._r.m = 3;
            Z80._r.t = 12;
        },

        NOP: function () {
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        HALT: function () {
            Z80._halt = 1;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },

        DI: function () {
            Z80._r.ime = 0;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },
        EI: function () {
            Z80._r.ime = 1;
            Z80._r.m = 1;
            Z80._r.t = 4;
        },

        /*--- Helper functions ---*/
        fz: function (i, as) {
            Z80._r.f = 0;
            if (!(i & 255)) Z80._r.f |= 128;
            Z80._r.f |= as ? 0x40 : 0;
        },
        MAPcb: function () {
            var i = MMU.rb(Z80._r.pc);
            Z80._r.pc++;
            Z80._r.pc &= 65535;
            if (Z80._cbmap[i]) Z80._cbmap[i]();
            else console.log(i);
        },

        XX: function () { /*Undefined map entry*/
            var opc = Z80._r.pc - 1;
            LOG.out('Z80', 'Unimplemented instruction at $' + opc.toString(16) + ', stopping.');
            Z80._stop = 1;
        }
    },

    _map: [],
    _cbmap: []
};

Z80._map = [
  // 00
  Z80._ops.NOP,
  Z80._ops.LDBCnn,
  Z80._ops.LDBCmA,
  Z80._ops.INCBC,
  Z80._ops.INCr_b,
  Z80._ops.DECr_b,
  Z80._ops.LDrn_b,
  Z80._ops.RLCA,
  Z80._ops.LDmmSP,
  Z80._ops.ADDHLBC,
  Z80._ops.LDABCm,
  Z80._ops.DECBC,
  Z80._ops.INCr_c,
  Z80._ops.DECr_c,
  Z80._ops.LDrn_c,
  Z80._ops.RRCA,

  // 10
  Z80._ops.DJNZn,
  Z80._ops.LDDEnn,
  Z80._ops.LDDEmA,
  Z80._ops.INCDE,
  Z80._ops.INCr_d,
  Z80._ops.DECr_d,
  Z80._ops.LDrn_d,
  Z80._ops.RLA,
  Z80._ops.JRn,
  Z80._ops.ADDHLDE,
  Z80._ops.LDADEm,
  Z80._ops.DECDE,
  Z80._ops.INCr_e,
  Z80._ops.DECr_e,
  Z80._ops.LDrn_e,
  Z80._ops.RRA,

  // 20
  Z80._ops.JRNZn,
  Z80._ops.LDHLnn,
  Z80._ops.LDHLIA,
  Z80._ops.INCHL,
  Z80._ops.INCr_h,
  Z80._ops.DECr_h,
  Z80._ops.LDrn_h,
  Z80._ops.XX,
  Z80._ops.JRZn,
  Z80._ops.ADDHLHL,
  Z80._ops.LDAHLI,
  Z80._ops.DECHL,
  Z80._ops.INCr_l,
  Z80._ops.DECr_l,
  Z80._ops.LDrn_l,
  Z80._ops.CPL,

  // 30
  Z80._ops.JRNCn,
  Z80._ops.LDSPnn,
  Z80._ops.LDHLDA,
  Z80._ops.INCSP,
  Z80._ops.INCHLm,
  Z80._ops.DECHLm,
  Z80._ops.LDHLmn,
  Z80._ops.SCF,
  Z80._ops.JRCn,
  Z80._ops.ADDHLSP,
  Z80._ops.LDAHLD,
  Z80._ops.DECSP,
  Z80._ops.INCr_a,
  Z80._ops.DECr_a,
  Z80._ops.LDrn_a,
  Z80._ops.CCF,

  // 40
  Z80._ops.LDrr_bb,
  Z80._ops.LDrr_bc,
  Z80._ops.LDrr_bd,
  Z80._ops.LDrr_be,
  Z80._ops.LDrr_bh,
  Z80._ops.LDrr_bl,
  Z80._ops.LDrHLm_b,
  Z80._ops.LDrr_ba,
  Z80._ops.LDrr_cb,
  Z80._ops.LDrr_cc,
  Z80._ops.LDrr_cd,
  Z80._ops.LDrr_ce,
  Z80._ops.LDrr_ch,
  Z80._ops.LDrr_cl,
  Z80._ops.LDrHLm_c,
  Z80._ops.LDrr_ca,

  // 50
  Z80._ops.LDrr_db,
  Z80._ops.LDrr_dc,
  Z80._ops.LDrr_dd,
  Z80._ops.LDrr_de,
  Z80._ops.LDrr_dh,
  Z80._ops.LDrr_dl,
  Z80._ops.LDrHLm_d,
  Z80._ops.LDrr_da,
  Z80._ops.LDrr_eb,
  Z80._ops.LDrr_ec,
  Z80._ops.LDrr_ed,
  Z80._ops.LDrr_ee,
  Z80._ops.LDrr_eh,
  Z80._ops.LDrr_el,
  Z80._ops.LDrHLm_e,
  Z80._ops.LDrr_ea,

  // 60
  Z80._ops.LDrr_hb,
  Z80._ops.LDrr_hc,
  Z80._ops.LDrr_hd,
  Z80._ops.LDrr_he,
  Z80._ops.LDrr_hh,
  Z80._ops.LDrr_hl,
  Z80._ops.LDrHLm_h,
  Z80._ops.LDrr_ha,
  Z80._ops.LDrr_lb,
  Z80._ops.LDrr_lc,
  Z80._ops.LDrr_ld,
  Z80._ops.LDrr_le,
  Z80._ops.LDrr_lh,
  Z80._ops.LDrr_ll,
  Z80._ops.LDrHLm_l,
  Z80._ops.LDrr_la,

  // 70
  Z80._ops.LDHLmr_b,
  Z80._ops.LDHLmr_c,
  Z80._ops.LDHLmr_d,
  Z80._ops.LDHLmr_e,
  Z80._ops.LDHLmr_h,
  Z80._ops.LDHLmr_l,
  Z80._ops.HALT,
  Z80._ops.LDHLmr_a,
  Z80._ops.LDrr_ab,
  Z80._ops.LDrr_ac,
  Z80._ops.LDrr_ad,
  Z80._ops.LDrr_ae,
  Z80._ops.LDrr_ah,
  Z80._ops.LDrr_al,
  Z80._ops.LDrHLm_a,
  Z80._ops.LDrr_aa,

  // 80
  Z80._ops.ADDr_b,
  Z80._ops.ADDr_c,
  Z80._ops.ADDr_d,
  Z80._ops.ADDr_e,
  Z80._ops.ADDr_h,
  Z80._ops.ADDr_l,
  Z80._ops.ADDHL,
  Z80._ops.ADDr_a,
  Z80._ops.ADCr_b,
  Z80._ops.ADCr_c,
  Z80._ops.ADCr_d,
  Z80._ops.ADCr_e,
  Z80._ops.ADCr_h,
  Z80._ops.ADCr_l,
  Z80._ops.ADCHL,
  Z80._ops.ADCr_a,

  // 90
  Z80._ops.SUBr_b,
  Z80._ops.SUBr_c,
  Z80._ops.SUBr_d,
  Z80._ops.SUBr_e,
  Z80._ops.SUBr_h,
  Z80._ops.SUBr_l,
  Z80._ops.SUBHL,
  Z80._ops.SUBr_a,
  Z80._ops.SBCr_b,
  Z80._ops.SBCr_c,
  Z80._ops.SBCr_d,
  Z80._ops.SBCr_e,
  Z80._ops.SBCr_h,
  Z80._ops.SBCr_l,
  Z80._ops.SBCHL,
  Z80._ops.SBCr_a,

  // A0
  Z80._ops.ANDr_b,
  Z80._ops.ANDr_c,
  Z80._ops.ANDr_d,
  Z80._ops.ANDr_e,
  Z80._ops.ANDr_h,
  Z80._ops.ANDr_l,
  Z80._ops.ANDHL,
  Z80._ops.ANDr_a,
  Z80._ops.XORr_b,
  Z80._ops.XORr_c,
  Z80._ops.XORr_d,
  Z80._ops.XORr_e,
  Z80._ops.XORr_h,
  Z80._ops.XORr_l,
  Z80._ops.XORHL,
  Z80._ops.XORr_a,

  // B0
  Z80._ops.ORr_b,
  Z80._ops.ORr_c,
  Z80._ops.ORr_d,
  Z80._ops.ORr_e,
  Z80._ops.ORr_h,
  Z80._ops.ORr_l,
  Z80._ops.ORHL,
  Z80._ops.ORr_a,
  Z80._ops.CPr_b,
  Z80._ops.CPr_c,
  Z80._ops.CPr_d,
  Z80._ops.CPr_e,
  Z80._ops.CPr_h,
  Z80._ops.CPr_l,
  Z80._ops.CPHL,
  Z80._ops.CPr_a,

  // C0
  Z80._ops.RETNZ,
  Z80._ops.POPBC,
  Z80._ops.JPNZnn,
  Z80._ops.JPnn,
  Z80._ops.CALLNZnn,
  Z80._ops.PUSHBC,
  Z80._ops.ADDn,
  Z80._ops.RST00,
  Z80._ops.RETZ,
  Z80._ops.RET,
  Z80._ops.JPZnn,
  Z80._ops.MAPcb,
  Z80._ops.CALLZnn,
  Z80._ops.CALLnn,
  Z80._ops.ADCn,
  Z80._ops.RST08,

  // D0
  Z80._ops.RETNC,
  Z80._ops.POPDE,
  Z80._ops.JPNCnn,
  Z80._ops.XX,
  Z80._ops.CALLNCnn,
  Z80._ops.PUSHDE,
  Z80._ops.SUBn,
  Z80._ops.RST10,
  Z80._ops.RETC,
  Z80._ops.RETI,
  Z80._ops.JPCnn,
  Z80._ops.XX,
  Z80._ops.CALLCnn,
  Z80._ops.XX,
  Z80._ops.SBCn,
  Z80._ops.RST18,

  // E0
  Z80._ops.LDIOnA,
  Z80._ops.POPHL,
  Z80._ops.LDIOCA,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.PUSHHL,
  Z80._ops.ANDn,
  Z80._ops.RST20,
  Z80._ops.ADDSPn,
  Z80._ops.JPHL,
  Z80._ops.LDmmA,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.ORn,
  Z80._ops.RST28,

  // F0
  Z80._ops.LDAIOn,
  Z80._ops.POPAF,
  Z80._ops.LDAIOC,
  Z80._ops.DI,
  Z80._ops.XX,
  Z80._ops.PUSHAF,
  Z80._ops.XORn,
  Z80._ops.RST30,
  Z80._ops.LDHLSPn,
  Z80._ops.XX,
  Z80._ops.LDAmm,
  Z80._ops.EI,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.CPn,
  Z80._ops.RST38
];

Z80._cbmap = [
  // CB00
  Z80._ops.RLCr_b,
  Z80._ops.RLCr_c,
  Z80._ops.RLCr_d,
  Z80._ops.RLCr_e,
  Z80._ops.RLCr_h,
  Z80._ops.RLCr_l,
  Z80._ops.RLCHL,
  Z80._ops.RLCr_a,
  Z80._ops.RRCr_b,
  Z80._ops.RRCr_c,
  Z80._ops.RRCr_d,
  Z80._ops.RRCr_e,
  Z80._ops.RRCr_h,
  Z80._ops.RRCr_l,
  Z80._ops.RRCHL,
  Z80._ops.RRCr_a,

  // CB10
  Z80._ops.RLr_b,
  Z80._ops.RLr_c,
  Z80._ops.RLr_d,
  Z80._ops.RLr_e,
  Z80._ops.RLr_h,
  Z80._ops.RLr_l,
  Z80._ops.RLHL,
  Z80._ops.RLr_a,
  Z80._ops.RRr_b,
  Z80._ops.RRr_c,
  Z80._ops.RRr_d,
  Z80._ops.RRr_e,
  Z80._ops.RRr_h,
  Z80._ops.RRr_l,
  Z80._ops.RRHL,
  Z80._ops.RRr_a,

  // CB20
  Z80._ops.SLAr_b,
  Z80._ops.SLAr_c,
  Z80._ops.SLAr_d,
  Z80._ops.SLAr_e,
  Z80._ops.SLAr_h,
  Z80._ops.SLAr_l,
  Z80._ops.XX,
  Z80._ops.SLAr_a,
  Z80._ops.SRAr_b,
  Z80._ops.SRAr_c,
  Z80._ops.SRAr_d,
  Z80._ops.SRAr_e,
  Z80._ops.SRAr_h,
  Z80._ops.SRAr_l,
  Z80._ops.XX,
  Z80._ops.SRAr_a,

  // CB30
  Z80._ops.SWAPr_b,
  Z80._ops.SWAPr_c,
  Z80._ops.SWAPr_d,
  Z80._ops.SWAPr_e,
  Z80._ops.SWAPr_h,
  Z80._ops.SWAPr_l,
  Z80._ops.XX,
  Z80._ops.SWAPr_a,
  Z80._ops.SRLr_b,
  Z80._ops.SRLr_c,
  Z80._ops.SRLr_d,
  Z80._ops.SRLr_e,
  Z80._ops.SRLr_h,
  Z80._ops.SRLr_l,
  Z80._ops.XX,
  Z80._ops.SRLr_a,

  // CB40
  Z80._ops.BIT0b,
  Z80._ops.BIT0c,
  Z80._ops.BIT0d,
  Z80._ops.BIT0e,
  Z80._ops.BIT0h,
  Z80._ops.BIT0l,
  Z80._ops.BIT0m,
  Z80._ops.BIT0a,
  Z80._ops.BIT1b,
  Z80._ops.BIT1c,
  Z80._ops.BIT1d,
  Z80._ops.BIT1e,
  Z80._ops.BIT1h,
  Z80._ops.BIT1l,
  Z80._ops.BIT1m,
  Z80._ops.BIT1a,

  // CB50
  Z80._ops.BIT2b,
  Z80._ops.BIT2c,
  Z80._ops.BIT2d,
  Z80._ops.BIT2e,
  Z80._ops.BIT2h,
  Z80._ops.BIT2l,
  Z80._ops.BIT2m,
  Z80._ops.BIT2a,
  Z80._ops.BIT3b,
  Z80._ops.BIT3c,
  Z80._ops.BIT3d,
  Z80._ops.BIT3e,
  Z80._ops.BIT3h,
  Z80._ops.BIT3l,
  Z80._ops.BIT3m,
  Z80._ops.BIT3a,

  // CB60
  Z80._ops.BIT4b,
  Z80._ops.BIT4c,
  Z80._ops.BIT4d,
  Z80._ops.BIT4e,
  Z80._ops.BIT4h,
  Z80._ops.BIT4l,
  Z80._ops.BIT4m,
  Z80._ops.BIT4a,
  Z80._ops.BIT5b,
  Z80._ops.BIT5c,
  Z80._ops.BIT5d,
  Z80._ops.BIT5e,
  Z80._ops.BIT5h,
  Z80._ops.BIT5l,
  Z80._ops.BIT5m,
  Z80._ops.BIT5a,

  // CB70
  Z80._ops.BIT6b,
  Z80._ops.BIT6c,
  Z80._ops.BIT6d,
  Z80._ops.BIT6e,
  Z80._ops.BIT6h,
  Z80._ops.BIT6l,
  Z80._ops.BIT6m,
  Z80._ops.BIT6a,
  Z80._ops.BIT7b,
  Z80._ops.BIT7c,
  Z80._ops.BIT7d,
  Z80._ops.BIT7e,
  Z80._ops.BIT7h,
  Z80._ops.BIT7l,
  Z80._ops.BIT7m,
  Z80._ops.BIT7a,

  // CB80
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,

  // CB90
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,

  // CBA0
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,

  // CBB0
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,

  // CBC0
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,

  // CBD0
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,

  // CBE0
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,

  // CBF0
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX,
  Z80._ops.XX
];
