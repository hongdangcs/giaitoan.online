function encodeMathExpression(expression) {
  return encodeURIComponent(expression);
}

var Fa = {},
  ya = void 0,
  Da = !1,
  Ma = 1,
  Na = { v: !1 },
  Oa = { v: !1 },
  oa = {
    NUMBER: 1,
    CONSTANT: 2,
    VARIABLE: 3,
    OPERATOR: 4,
    WHITESPACE: 5,
    LEFT_PAR: 6,
    RIGHT_PAR: 7,
    BAR: 8,
    UNDERSCORE: 9,
  },
  aa = oa.NUMBER,
  ja = oa.CONSTANT,
  fa = oa.VARIABLE,
  A = oa.OPERATOR,
  ra = oa.WHITESPACE,
  sa = oa.LEFT_PAR,
  ta = oa.RIGHT_PAR,
  Ba = oa.BAR,
  La = oa.UNDERSCORE;

function ea(b) {
  var w = arguments;
  return String(b).replace(/#{(\w+)}/g, function (c, z) {
    for (c = w.length - 1; 1 <= c; --c) {
      var e = w[c];
      if (z in e) return (w[0] = e[z]), ea.apply(null, w);
    }
    return "#{" + z + "}";
  });
}

function Aa(b, w, c, z, e) {
  w = w || "([{";
  if (void 0 === c) {
    c = "";
    for (var r = 0; r < w.length; ++r)
      switch (w.charAt(r)) {
        case "(":
          c += ")";
          break;
        case "[":
          c += "]";
          break;
        case "{":
          c += "}";
      }
  }
  z = z || 0;
  for (r = 0; r < b.length; ++r) {
    var Z = b.charAt(r);
    if (-1 !== w.indexOf(Z)) ++z;
    else if (-1 !== c.indexOf(Z) && !--z) return r;
  }
  if (e) throw L.unexpectedEndOfExpression;
  return r;
}

function Ja(b) {
  for (
    var w = {
        C: "fresnel_c",
        Chi: "expintegral_chi",
        Ci: "expintegral_ci",
        "E_{1}": "expintegral_e1",
        Ei: "expintegral_ei",
        E: "expintegral_e",
        li: "expintegral_li",
        S: "fresnel_s",
        Shi: "expintegral_shi",
        Si: "expintegral_si",
        W: "lambert_w",
        "\\Gamma": "gamma_function",
        "\\psi": "psi_function",
      },
      c = {
        alpha: "\u03b1",
        beta: "\u03b2",
        gamma: "\u03b3",
        delta: "\u03b4",
        epsilon: "\u03b5",
        zeta: "\u03b6",
        eta: "\u03b7",
        theta: "\u03b8",
        iota: "\u03b9",
        kappa: "\u03ba",
        lambda: "\u03bb",
        mu: "\u03bc",
        nu: "\u03bd",
        xi: "\u03be",
        omicron: "\u03bf",
        pi: "\u03c0",
        rho: "\u03c1",
        sigma: "\u03c3",
        tau: "\u03c4",
        upsilon: "\u03c5",
        varphi: "\u03c6",
        chi: "\u03c7",
        psi: "\u03c8",
        omega: "\u03c9",
      },
      z = 0;
    24 > z;
    ++z
  ) {
    var e = "abcdfghjklmnopqrstuvwxyz".charAt(z);
    w[e] = "function_" + e;
  }
  b = b.replace(/\\\\/g, " ");
  b = b.replace(/\\(left|right)\s*([([{)\]}])/g, "\\$1$2");
  b = b.replace(/([0-9.])\s+([0-9.])/g, "$1$2");
  b = b.replace(/(\\left)?\\{|\\left\[/g, "(");
  b = b.replace(/(\\right)?\\}|\\right]/g, ")");
  for (b = b.replace(/[_^]\s*[^\s\\{]/g, "$&\u00a0"); ; )
    if ((z = b.match(/\\(left[(|]|right[)|]|[A-Za-z]+|[!,:; ])(\s*\[)?/))) {
      var r = z[0],
        Z = z[1],
        t = void 0;
      "[" === r.charAt(r.length - 1) &&
        ((e = Aa(b.substr(z.index + r.length), "[", "]", 1, !0)),
        (t = b.substr(z.index + r.length, e)),
        (r += t + "]"),
        (t = t.trim()));
      e = b.substr(0, z.index);
      var E = b.substr(z.index + r.length),
        N = function () {
          E = E.trim();
          var q = E.charAt(0);
          E = E.substr(1);
          if ("{" === q) {
            var T = Aa(E, "{", "}", 1, !0);
            q = E.substr(0, T);
            E = E.substr(T + 1);
            return q.trim();
          }
          if ("\\" === q && (T = E.match(/^([A-Za-z]+)(\s*\[)?/))) {
            q = T[0];
            var ca = T[1];
            "[" === q.charAt(q.length - 1) &&
              ((T = Aa(E.substr(q.length), "[", "]", 1, !0)),
              (q += E.substr(q.length, T) + "]"));
            E = E.substr(q.length);
            switch (ca) {
              case "dfrac":
              case "frac":
              case "tfrac":
                q += N() + N();
                break;
              case "mathbf":
              case "mathit":
              case "mathrm":
              case "mbox":
              case "operatorname":
              case "sqrt":
              case "text":
              case "textrm":
                q += N();
            }
            return "\\" + q;
          }
          return q;
        };
      r = "";
      var na = !0;
      switch (Z) {
        case "dfrac":
        case "frac":
        case "tfrac":
          r = "((" + N() + ")/(" + N() + "))";
          break;
        case "sqrt":
          r =
            "string" === typeof t && 0 < t.length
              ? "root(" + t + "," + N() + ")"
              : "sqrt(" + N() + ")";
          break;
        case "left(":
          r = "(";
          break;
        case "right)":
          r = ")";
          break;
        case "left|":
        case "lvert":
          r = "abs(";
          break;
        case "right|":
        case "rvert":
          r = ")";
          break;
        case "arccos":
        case "arcsin":
        case "arctan":
        case "cos":
        case "cosh":
        case "cot":
        case "coth":
        case "csc":
        case "exp":
        case "lg":
        case "ln":
        case "log":
        case "sec":
        case "sin":
        case "sinh":
        case "tan":
        case "tanh":
          r = Z;
          break;
        case "alpha":
        case "beta":
        case "gamma":
        case "delta":
        case "epsilon":
        case "zeta":
        case "eta":
        case "theta":
        case "iota":
        case "kappa":
        case "lambda":
        case "mu":
        case "nu":
        case "xi":
        case "omicron":
        case "pi":
        case "rho":
        case "sigma":
        case "tau":
        case "upsilon":
        case "varphi":
        case "chi":
        case "psi":
        case "omega":
          r = c[Z];
          na = !1;
          break;
        case "bullet":
        case "cdot":
        case "centerdot":
        case "times":
          r = "*";
          break;
        case "!":
        case ",":
        case ":":
        case ";":
        case " ":
        case "qquad":
        case "quad":
          r = "";
          break;
        case "operatorname":
          r = N();
          r in w && (r = w[r]);
          break;
        case "mathbf":
        case "mathit":
        case "mathrm":
        case "mbox":
        case "text":
        case "textrm":
          r = N();
          for (z = z.index - 1; 0 <= z && /\s/.test(b.charAt(z)); ) --z;
          -1 !== z &&
            ((b = b.charAt(z)),
            "_" === b || "^" === b
              ? ((r = "{" + r + "}"), (na = !1))
              : "{" === b && (na = !1));
          break;
        default:
          throw ea(L.unsupportedLaTeXCommand, { c: "\\" + Z }, L);
      }
      b = na ? " " : "";
      b = e + b + r + b + E;
    } else {
      for (
        b = b.replace(/\s*_\s*/g, "_");
        b !== (b = b.replace(/_([{\s]*){\s*{([^{}]*)}\s*}/g, "_$1{$2}"));

      );
      w = "";
      for (z = 0; z < b.length; ++z)
        (c = b.charAt(z)),
          "{" !== c ||
            (0 !== z && -1 !== "_^".indexOf(w)) ||
            ((e = z + 1 + Aa(b.substring(z + 1), "{", "}", 1, !0)),
            (b =
              b.substring(0, z) +
              "\u00a0" +
              b.substring(z + 1, e) +
              "\u00a0" +
              b.substring(e + 1))),
          /^\s$/.test(c) || (w = c);
      return (b = b.replace(/\^\s*{(\d+)}/g, "^$1\u00a0"));
    }
}

function Ka(b) {
  if ("string" === typeof b) {
    return b;
  }
  if (b instanceof Array) {
    for (var w = [], c = 0; c < b.length; ++c)
      b[c].type === A && w.push(b[c].text);
    return w.join(" ");
  }
  return ka(b);
}

function xa(b, w, c, z, e, r) {
  function Z(a, d, g) {
    b.replace(new RegExp("[" + a + "]+", "g"), function (l) {
      for (var J = g, D = 0; D < l.length; ++D)
        J += d.charAt(a.indexOf(l.charAt(D)));
      f[l] = J + "\u00a0";
      return "";
    });
  }

  function t(a) {
    return a
      .replace(/[\u00c4\u00c1\u00c0\u00c2]/g, "A")
      .replace(/[\u00e4\u00e1\u00e0\u00e2]/g, "a")
      .replace(/[\u00c9\u00c8\u00ca]/g, "E")
      .replace(/[\u00e9\u00e8\u00ea]/g, "e")
      .replace(/[\u00cd\u00cc\u00ce]/g, "I")
      .replace(/[\u00ed\u00ec\u00ee]/g, "i")
      .replace(/[\u00d6\u00d3\u00d2\u00d4]/g, "O")
      .replace(/[\u00f6\u00f3\u00f2\u00f4]/g, "o")
      .replace(/[\u00dc\u00da\u00d9\u00db]/g, "U")
      .replace(/[\u00fc\u00fa\u00f9\u00fb]/g, "u");
  }

  function E(a) {
    function d(pa) {
      for (var va in g) if (0 == pa.indexOf(va)) return !0;
      return !1;
    }

    var g = {};
    for (U in X) g[X[U]] = U;
    var l = [];
    for (U in g) l.push(U);
    l.sort(function (pa, va) {
      return va.length - pa.length;
    });
    var J = {};
    for (U in g) U in V && (J[U] = !0);
    for (var D = 0; D < qa.length; ++D) {
      var ba = qa[D];
      ba in g && (J[ba] = !0);
    }
    ba = [];

    for (var H in V) ba.push(H);
    ba.sort(function (pa, va) {
      return va.length - pa.length;
    });
    var C = [],
      y = a.trim().split(" ");
    for (D = 0; D < y.length; ++D) {
      a = y[D];
      0 < D && "\x00" != a.charAt(0) && C.push({ type: ra });
      for (var m = null, I = 0, W = 0; ; ) {
        m &&
          (C.push(m),
          (a = a.substr((W ? W : m.text.length) + I)),
          (m = null),
          (W = I = 0));
        a = a.replace(/^[\xA0\0]+|[\xA0\0]+$/g, "");
        for (U in S)
          if (0 == a.indexOf(U)) {
            var F = S[U];
            U in X && !(F in J) && /^[_0-9]$/.test(a.charAt(1))
              ? (a = F + a.substr(1))
              : (U.length < a.length &&
                  y.splice(D + 1, 0, "\x00" + a.substr(U.length)),
                (a = F));
            break;
          }
        if ("" == a.trim()) break;
        var G = a.charAt(0);
        if ("(" == G) m = { type: sa, text: "(" };
        else if (")" == G)
          m = {
            type: ta,
            text: ")",
          };
        else if ("|" == G) m = { type: Ba, text: "|" };
        else {
          var P = a.toLowerCase();
          if (!(P in V)) {
            var R = "",
              M = [];
            for (H in k)
              if ((F = P.match(k[H])))
                (F = F[0]),
                  F.length == R.length
                    ? M.push(H)
                    : F.length > R.length && ((R = F), (M = [H]));
            if ("" != R)
              if (1 == M.length) {
                if (!d(P) || d(R)) {
                  m = { type: A, text: M[0], op: V[M[0]] };
                  W = R.length;
                  continue;
                }
              } else {
                var U = [];
                for (D = 0; D < M.length; ++D) U.push('"' + M[D] + '"');
                throw ea(L.ambiguousOperator, {
                  o: a.substr(0, R.length),
                  p: U.join(", "),
                });
              }
          }
          if (!m) {
            for (R = 0; R < ba.length; ++R)
              if (((H = ba[R]), 0 == P.indexOf(H))) {
                if (!d(P) || d(H)) m = { type: A, text: H, op: V[H] };
                break;
              }
            if (!m)
              if (
                (F = P.match(
                  w
                    ? /^[0-9]*\.?[0-9]+([bdeBDE][+-]?[0-9]+)?/
                    : /^[0-9]*\.?[0-9]+(e[+-]?[0-9]+)?/
                ))
              )
                if (((P = F[0].replace(/[bd]/g, "e").indexOf("e")), -1 == P)) {
                  -1 == F[0].indexOf(".") &&
                    "." == a.charAt(F[0].length) &&
                    ++I;
                  for (
                    m = {
                      type: aa,
                      text: F[0],
                    };
                    "0" != m.text && "0" == m.text.charAt(0);

                  )
                    (m.text = m.text.substr(1)), ++I;
                  "." == m.text.charAt(0) && ((m.text = "0" + m.text), --I);
                  if (-1 != m.text.indexOf("."))
                    for (;;) {
                      F = m.text.charAt(m.text.length - 1);
                      if ("0" == F || "." == F)
                        (m.text = m.text.substr(0, m.text.length - 1)), ++I;
                      else break;
                      if ("." == F) break;
                    }
                } else
                  (G = F[0].substr(0, P)),
                    (P = F[0].substr(P + 1)),
                    (P = parseInt(P, 10)),
                    /^\.?0+$/.test(G)
                      ? (G = "0")
                      : P &&
                        (-4 <= P && 4 >= P
                          ? ((G =
                              "000000" +
                              G +
                              (-1 == G.indexOf(".") ? "." : "") +
                              "000000"),
                            (R = G.indexOf(".")),
                            (G = G.substr(0, R) + G.substr(R + 1)),
                            (R += P),
                            (G = G.substr(0, R) + "." + G.substr(R)))
                          : (G = /^0*1(\.0+)?$/.test(G)
                              ? "(10^" + P + ")"
                              : "(" + G + "*10^" + P + ")")),
                    (a = G + a.substr(F[0].length)),
                    (P = a.toLowerCase());
              else {
                F = void 0;
                for (R = 0; R < l.length; ++R)
                  if (((M = l[R]), !(M in J) && 0 == P.indexOf(M))) {
                    a = g[M] + a.substr(M.length);
                    P = a.toLowerCase();
                    G = a.charAt(0);
                    F = M;
                    break;
                  }
                for (R = 0; R < qa.length; ++R)
                  if (
                    ((M = qa[R]), 0 == P.indexOf(M) && -1 == "EI".indexOf(G))
                  ) {
                    m = { type: ja, text: M };
                    break;
                  }
                if (!m)
                  if (
                    /^[a-z]$/i.test(G) ||
                    G in X ||
                    (w && -1 != "\u2205".indexOf(G)) ||
                    (z && "?" == G)
                  ) {
                    m = { type: fa, text: G };
                    W = 1;
                    if (
                      "?" != G &&
                      2 <= a.length &&
                      -1 != "_0123456789".indexOf(a.charAt(1))
                    ) {
                      G = "";
                      P = 1;
                      M = (R = "_" == a.charAt(1)) && "{" == a.charAt(2);
                      for (P += (R ? 1 : 0) + (M ? 1 : 0); ; ) {
                        var Y = a.charAt(P);
                        if ((R ? /^[0-9a-z]$/i : /^[0-9]$/).test(Y))
                          (G += Y), ++P;
                        else {
                          if (M && "}" === Y) ++P;
                          else if (M) {
                            if ("" !== Y)
                              throw ea(L.invalidCharacter, { c: Y });
                            if (D !== y.length - 1 || P !== a.length)
                              throw ea(L.invalidCharacter, { c: " " });
                          }
                          break;
                        }
                      }
                      if ("" != G) {
                        if (10 < G.length) throw L.subscriptTooLong;
                        m.text += "_" + G;
                        W = P;
                      } else D == y.length - 1 && P == a.length && (W = P);
                    }
                    void 0 !== F
                      ? ((m.textUnicode = m.text),
                        (m.text = F + m.text.substr(1)),
                        (m.isGreekSymbol = !0))
                      : (m.isGreekSymbol = !1);
                  } else if (
                    "_" == G &&
                    C.length &&
                    C[C.length - 1].type == A &&
                    C[C.length - 1].op.subscriptToFirstArg
                  )
                    m = {
                      type: La,
                      text: G,
                    };
                  else {
                    if ("=" == G && void 0 !== L.invalidCharacterEqualSign)
                      throw L.invalidCharacterEqualSign;
                    throw ea(L.invalidCharacter, { c: G });
                  }
              }
          }
        }
      }
    }
    for (D = 1; D < C.length; ++D) C[D].previousToken = C[D - 1];
    return C;
  }

  function N(a, d) {
    var g = {},
      l;
    for (l in a) g[l] = a[l];
    g.prec += d;
    return g;
  }

  function na(a, d, g, l, J, D, ba) {
    for (var H = [], C = 0; C < a.length; ++C) {
      var y = a[C];
      y.type != ra && ((y.index = C), H.push(y));
    }
    var m = [],
      I = null;
    for (C = 0; C < H.length; ++C) {
      y = H[C];
      if (y.text == d && null != I && I.type == A && g(I.op)) {
        var W = C + 1;
        for (C = W; C < H.length && -1 != "-~".indexOf(H[C].text); ) ++C;
        if (C == H.length) {
          var F = { type: fa, text: "?", index: a.length };
          a.push(F);
          H.push(F);
          ++C;
        } else if (((F = H[C]), F.type == aa || F.type == ja || F.type == fa)) {
          if ((++C, C < H.length && -1 != D.indexOf(H[C].text)))
            throw ea(ba, { f: I.text });
        } else if (F.type == sa) {
          ++C;
          for (var G = 1; G && C < H.length; )
            (F = H[C]), F.type == sa ? ++G : F.type == ta && --G, ++C;
        } else throw ea(ba, { f: I.text });
        if (C < H.length) for (F = H[C].index; a[F].type == ra; ) --F;
        else F = a.length;
        W = a.slice(H[W].index, F);
        W = xa(W, w, c, z, e, r);
        if (J && null != W && "~" == W.text && "1" == W.args[0].text)
          if (I.op.inverse) (I.text = I.op.inverse), (I.op = V[I.text]);
          else throw ea(L.noInverseFunction, { f: I.text });
        else l(I, W);
        --C;
      } else
        0 < y.index && a[y.index - 1].type == ra && m.push(a[y.index - 1]),
          m.push(y);
      I = y;
    }
    return m;
  }

  function q(a) {
    w ||
      ((a = na(
        a,
        "_",
        function (H) {
          return H.subscriptToFirstArg;
        },
        function (H, C) {
          H.firstArg = C;
        },
        !1,
        "+*/",
        L.usage_subscriptToFirstArgBrackets
      )),
      (a = na(
        a,
        "^",
        function (H) {
          return H.canHandlePow;
        },
        function (H, C) {
          H.exponent = C;
        },
        !0,
        "+*/^",
        L.usage_prependedExponentBrackets
      )));
    for (var d = 0; d < a.length; ++d) {
      var g = a[d];
      if (g.type == Ba)
        if (d == a.length - 1)
          (a[d] = { type: A, text: "abs", op: V.abs }),
            a.push({
              type: sa,
              text: "(",
            });
        else {
          var l = -1;
          g = 0;
          var J;
          for (J = d + 1; J < a.length; ++J) {
            var D = a[J];
            if (D.type == sa) ++g;
            else if (D.type == ta) {
              if ((--g, 0 > g)) break;
            } else if (D.type == Ba && 0 == g) {
              l = J;
              break;
            }
          }
          if (-1 == l)
            if (J == a.length)
              a = a.slice(0, d).concat(
                {
                  type: A,
                  text: "abs",
                  op: V.abs,
                },
                {
                  type: sa,
                  text: "(",
                },
                a.slice(d + 1)
              );
            else throw L.rightBarNotFound;
          else
            a = a.slice(0, d).concat(
              {
                type: A,
                text: "abs",
                op: V.abs,
              },
              { type: sa, text: "(" },
              a.slice(d + 1, l),
              {
                type: ta,
                text: ")",
                originalText: "|",
              },
              a.slice(l + 1)
            );
        }
    }
    for (d = 1; d < a.length; ++d)
      a[d - 1].type == ra && (a[d].preceededByWhitespace = !0);
    l = [];
    for (d = 0; d < a.length; ++d)
      (0 != d && a[d].type == ra && "-" == a[d - 1].text) || l.push(a[d]);
    a = l;
    do {
      l = [];
      g = !1;
      for (d = 0; d < a.length; ++d)
        d < a.length - 2 &&
        "-" == a[d].text &&
        "-" == a[d + 1].text &&
        "-" == a[d + 2].text
          ? (l.push(a[d]),
            d < a.length - 3 && "-" == a[d + 3].text && (l.push(a[d + 1]), ++d),
            (d += 2),
            (g = !0))
          : l.push(a[d]);
      a = l;
    } while (g);
    l = [];
    for (d = 0; d < a.length; ++d)
      l.push(a[d]),
        a[d].type == A &&
          "-" != a[d].text &&
          (d < a.length - 2 && "-" == a[d + 1].text && "-" == a[d + 2].text
            ? (d += 2)
            : d < a.length - 3 &&
              a[d + 1].type == ra &&
              "-" == a[d + 2].text &&
              "-" == a[d + 3].text &&
              (l.push(a[d + 1]), (d += 3)));
    a = l;
    l = [];
    D = null;
    J = !1;
    for (d = 0; d < a.length; ++d)
      if (((g = a[d]), g.type == ra)) r || (J = !1);
      else {
        D
          ? ("(" == g.text && D.type == A && (D.followedByLeftPar = !0),
            "-" != g.text || (D.type != A && "(" != D.text))
            ? !c ||
              (D.type != ta && D.type != aa && D.type != fa && D.type != ja) ||
              (g.type == A && 2 == g.op.numArgs) ||
              g.type == ta ||
              ((D = V["*"]),
              la && J && g.type != A && g.type != sa && (D = N(D, 100)),
              l.push({
                type: A,
                text: "*",
                op: D,
                implicit: !0,
              }))
            : ((g.text = "~"), (g.op = V["~"]), (J = !1))
          : "-" == g.text && ((g.text = "~"), (g.op = V["~"]));
        if (la)
          if (g.type == A && !g.implicit)
            if ("^" == g.text && 1 == J) g.op = N(g.op, 200);
            else if ("~" != g.text && 1 == g.op.numArgs) {
              var ba;
              d < a.length - 1 && ((ba = a[d + 1].type == ra) || r)
                ? ((J = 1),
                  ba && ++d,
                  d < a.length - 2 &&
                    "-" == a[d + 1].text &&
                    (a[d + 2].type == ja ||
                      a[d + 2].type == aa ||
                      a[d + 2].type == fa) &&
                    ((a[d + 1].text = "~"),
                    (a[d + 1].op = N(V["~"], 100)),
                    l.push(a[ba ? d - 1 : d]),
                    (g = a[d + 1]),
                    ++d))
                : ((J = 2),
                  d < a.length - 2 &&
                    "-" == a[d + 1].text &&
                    (a[d + 2].type == ja ||
                      a[d + 2].type == aa ||
                      a[d + 2].type == fa) &&
                    ((a[d + 1].text = "~"),
                    (a[d + 1].op = N(V["~"], 100)),
                    l.push(a[d]),
                    (g = a[d + 1]),
                    (d += 1)));
            } else J = !1;
          else if (g.type == sa || g.type == ta) J = !1;
        l.push(g);
        D = g;
      }
    return (a = l);
  }

  function T(a) {
    function d() {
      D >= a.length && a.push({ type: fa, text: "?", insertedByParser: !0 });
      return a[D];
    }

    function g() {
      var H = d();
      ++D;
      return H;
    }

    function l(H) {
      for (
        var C = J();
        D < a.length &&
        d().type == A &&
        2 == d().op.numArgs &&
        d().op.prec >= H;

      ) {
        var y = g(),
          m = y.op.prec;
        -1 == y.op.assoc && ++m;
        m = l(m);
        y.args = [C, m];
        C = y;
      }
      return C;
    }

    function J() {
      var H = d();
      if (H.type == A && 1 == H.op.numArgs)
        return g(), (H.args = [l(H.op.prec)]), H;
      if ("(" == H.text) {
        g();
        H = l(0);
        var C = d();
        ++D;
        "?" == C.text && (C = { type: ta, text: ")", insertedByParser: !0 });
        if (")" != C.text) throw ea(L.expectedRightParenthesis, { c: C.text });
        C.insertedByParser || (H.isInParentheses = !0);
        return H;
      }
      if (H.type == aa || H.type == fa || H.type == ja) return g();
      throw ea(L.unexpected, { c: H.originalText || H.text });
    }

    var D = 0,
      ba = l(0);
    if (D != a.length) throw ea(L.expectedEndOfExpression, { c: a[D].text });
    return ba;
  }

  function ca(a) {
    a.type == A &&
      a.firstArg &&
      ("," == a.args[0].text
        ? a.args[0].args.splice(0, 0, a.firstArg)
        : a.args.splice(0, 0, a.firstArg),
      delete a.firstArg,
      (a.hadSubscriptedFirstArg = !0));
    a.type == A &&
      a.exponent &&
      ((a.args = [
        {
          type: A,
          text: a.text,
          args: a.args,
        },
        a.exponent,
      ]),
      (a.text = "^"),
      (a.args[0].followedByLeftPar = a.followedByLeftPar),
      delete a.exponent,
      delete a.followedByLeftPar);
    a.type == fa &&
      "\u2205" == a.text &&
      ((a.text = "___list"), (a.type = A), (a.args = []));
    if (a.type == A) {
      if ("," == a.text) throw ea(L.misplacedComma);
      delete a.needsParentheses;
      "-" == a.text &&
        ((a.text = "+"),
        (a.args[1] = {
          type: A,
          text: "~",
          op: V["~"],
          args: [a.args[1]],
        }));
      a.op = V[a.text];
      if (a.op.numCommaArgs || void 0 !== a.op.minNumCommaArgs) {
        if (a.args.length && "," == a.args[0].text)
          if ("," == a.args[0].args[0].text) {
            for (var d = [], g = a.args[0]; ; ) {
              d.push(g.args[1]);
              if ("," != g.args[0].text) {
                d.push(g.args[0]);
                break;
              }
              g = g.args[0];
            }
            d.reverse();
            a.args = d;
          } else a.args = a.args[0].args;
        d = a.args.length;
        g = a.op.numCommaArgs || a.op.minNumCommaArgs;
        var l = a.op.numCommaArgs || a.op.maxNumCommaArgs;
        if (d < g) {
          if (
            (!a.followedByLeftPar &&
              ((1 == d &&
                !a.hadSubscriptedFirstArg &&
                !a.args[0].insertedByParser) ||
                (2 == d &&
                  a.hadSubscriptedFirstArg &&
                  !a.args[1].insertedByParser))) ||
            (1 == d &&
              !a.hadSubscriptedFirstArg &&
              a.args[0].isInParentheses) ||
            (2 == d && a.hadSubscriptedFirstArg && a.args[1].isInParentheses)
          ) {
            if (g == l)
              throw ea(L.functionTakesNArguments, { f: a.text, n: g });
            throw ea(L.functionTakesMinArguments, { f: a.text, n: g });
          }
          for (l = 0; l < g - d; ++l)
            a.args.push({ type: fa, text: "?", varsUsed: { "?": !0 } });
        } else if (d > l) {
          var J = "usage_" + a.text + "_" + d;
          if (L[J]) throw L[J];
          J = "usage_" + a.text;
          if (L[J]) throw L[J];
          throw ea(L.invalidNumberOfArguments, { f: a.text, n: d });
        }
      } else if (a.args.length && "," == a.args[0].text)
        throw ea(L.functionTakesOneArgument, { f: a.text });
      d = !0;
      "pow" == a.text
        ? (a.text = "^")
        : "exp" == a.text
        ? ((a.text = "^"),
          (a.args = [
            {
              type: ja,
              text: "e",
            },
            a.args[0],
          ]))
        : "sqrt" == a.text || ("root" == a.text && 1 == a.args.length)
        ? ((a.text = "^"),
          a.args.push({
            type: A,
            text: "/",
            op: V["/"],
            args: [
              { type: aa, text: "1" },
              { type: aa, text: "2" },
            ],
          }))
        : "cbrt" == a.text
        ? ((a.text = "^"),
          a.args.push({
            type: A,
            text: "/",
            op: V["/"],
            args: [
              { type: aa, text: "1" },
              { type: aa, text: "3" },
            ],
          }))
        : "bqrt" == a.text
        ? ((a.text = "^"),
          a.args.push({
            type: A,
            text: "/",
            op: V["/"],
            args: [
              { type: aa, text: "1" },
              { type: aa, text: "4" },
            ],
          }))
        : "root" == a.text && 2 == a.args.length
        ? ((a.text = "^"),
          (a.args = [
            a.args[1],
            {
              type: A,
              text: "/",
              op: V["/"],
              args: [{ type: aa, text: "1" }, a.args[0]],
            },
          ]))
        : "log" == a.text &&
          (1 == a.args.length || (2 == a.args.length && "e" == a.args[0].text))
        ? ((a.text = "ln"), (a.args = [a.args[a.args.length - 1]]))
        : "lb" == a.text
        ? ((a.text = "log"),
          (a.args = [
            {
              type: aa,
              text: "2",
            },
            a.args[0],
          ]))
        : "lg" == a.text
        ? ((a.text = "log"),
          (a.args = [
            {
              type: aa,
              text: "10",
            },
            a.args[0],
          ]))
        : "dilog" == a.text
        ? ((a.text = "li"),
          (a.args = [
            {
              type: aa,
              text: "2",
            },
            a.args[0],
          ]))
        : (d = !1);
      d && (a.op = V[a.text]);
      "box" == a.text &&
        ((a.text = "___node_id"),
        a.args.push(a.args[0]),
        (a.args[0] = { text: (Ma++).toString() }));
      if ("___node_id" == a.text) {
        d = parseInt(a.args[0].text);
        g = a.args[1];
        for (J in a) delete a[J];
        for (J in g) a[J] = g[J];
        a.id = d;
        ca(a);
        return !1;
      }
      for (l = 0; l < a.args.length; ++l) ca(a.args[l]);
    }
    return !1;
  }

  function ha(a) {
    var d = !1;
    if (a.type == A) {
      if ("*" == a.text || "/" == a.text) {
        for (var g = 1, l = 0; l < a.args.length; ++l)
          for (; "~" == a.args[l].text; )
            if (a.args[l].id) {
              a.args[l].needsParentheses = !0;
              break;
            } else (a.args[l] = a.args[l].args[0]), (g = -g), (d = !0);
        -1 == g &&
          ((a.args = [
            {
              type: A,
              text: a.text,
              op: V[a.text],
              args: a.args,
            },
          ]),
          (a.text = "~"),
          (a.op = V["~"]));
      }
      if ("~" == a.text) {
        g = -1;
        for (l = a.args[0]; "~" == l.text; )
          if (l.id) {
            l.needsParentheses = !0;
            break;
          } else (l = l.args[0]), (g = -g), (d = !0);
        1 == g
          ? ((a.type = l.type),
            (a.text = l.text),
            a.type == A && ((a.op = V[l.text]), (a.args = l.args)))
          : (a.args[0] = l);
      }
      for (l = 0; l < a.args.length; ++l) d |= ha(a.args[l]);
    }
    return d;
  }

  function wa(a) {
    if (a.type == A) {
      2 != a.op.numArgs ||
        a.op.isAssoc ||
        (-1 == a.op.assoc && a.args[1].type == A && a.args[1].op == a.op
          ? (a.args[1].needsParentheses = !0)
          : 1 == a.op.assoc &&
            a.args[0].type == A &&
            a.args[0].op == a.op &&
            (a.args[0].needsParentheses = !0));
      for (var d = 0; d < a.args.length; ++d)
        a.args[d].type == A &&
          a.args[d].op.prec < a.op.prec &&
          (a.args[d].needsParentheses = !0);
      "^" != a.text ||
        a.args[0].type != A ||
        (a.args[0].op.canHandlePow &&
          ("~" != a.args[1].text || "1" != a.args[1].args[0].text)) ||
        (a.args[0].needsParentheses = !0);
      a.op.isAssoc ||
        -1 != a.op.assoc ||
        a.args[1].type != A ||
        a.args[1].op.prec != a.op.prec ||
        (a.args[1].needsParentheses = !0);
      a.op.isAssoc ||
        1 != a.op.assoc ||
        a.args[0].type != A ||
        a.args[0].op.prec != a.op.prec ||
        (a.args[0].needsParentheses = !0);
      "lsum" == a.text && (a.needsParentheses = !0);
      "formvar" == a.text && delete a.needsParentheses;
      for (d = 0; d < a.args.length; ++d) wa(a.args[d]);
    }
    return !1;
  }

  function da(a) {
    if (a.type == A) {
      if ("*" == a.text) {
        for (var d = [], g = 0; g < a.args.length; ++g) d.push(a.args[g]);
        for (;;) {
          var l = !1;
          for (g = 0; g < d.length; ++g)
            "*" != d[g].text ||
              d[g].id ||
              ((d = d.slice(0, g).concat(d[g].args, d.slice(g + 1))), (l = !0));
          if (!l) break;
        }
        a.args = d;
      }
      if ("+" == a.text) {
        d = [];
        for (g = 0; g < a.args.length; ++g) d.push(a.args[g]);
        for (;;) {
          l = !1;
          for (g = 0; g < d.length; ++g)
            "+" != d[g].text ||
              d[g].id ||
              ((d = d.slice(0, g).concat(d[g].args, d.slice(g + 1))), (l = !0));
          if (!l) break;
        }
        a.args = d;
      }
      "~" != a.text ||
        ("*" != a.args[0].text && "/" != a.args[0].text) ||
        (a.args[0].needsParentheses = !1);
      for (g = 0; g < a.args.length; ++g) da(a.args[g]);
    }
    return !1;
  }

  function ma(a) {
    if (a.type == A) {
      if ("+" == a.text)
        for (var d = 0; d < a.args.length; ++d) {
          var g = a.args[d];
          if (g.id)
            for (;;)
              if ("~" == g.text) {
                a.args[d].needsParentheses = !0;
                break;
              } else if ("+" == g.text || "*" == g.text) g = g.args[0];
              else break;
        }
      a.length = 1;
      a.varsUsed = {};
      for (d = 0; d < a.args.length; ++d) {
        ma(a.args[d]);
        a.length += a.args[d].length;
        for (var l in a.args[d].varsUsed) a.varsUsed[l] = !0;
      }
    } else
      (a.length = a.type == ja ? 1 : a.text.length),
        (a.varsUsed = {}),
        a.type == fa && (a.varsUsed[a.text] = !0);
    return !1;
  }

  function ia(a) {
    if (a.type == A) {
      if (
        "log" == a.text &&
        ("0" == a.args[0].text ||
          "1" == a.args[0].text ||
          ("~" == a.args[0].text && "0" == a.args[0].args[0].text))
      )
        throw L.invalidLogBase;
      for (var d = 0; d < a.args.length; ++d) ia(a.args[d]);
    }
    return !1;
  }

  void 0 === w && (w = !1);
  void 0 === c && (c = !w);
  void 0 === z && (z = !1);
  var la = !w,
    V = e || {
      beta_function: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
      },
      beta_incomplete_generalized: {
        numArgs: 1,
        numCommaArgs: 4,
        prec: 7,
        canHandlePow: !0,
      },
      beta_incomplete_regularized: {
        numArgs: 1,
        numCommaArgs: 3,
        prec: 7,
        canHandlePow: !0,
      },
      beta_incomplete: {
        numArgs: 1,
        numCommaArgs: 3,
        prec: 7,
        canHandlePow: !0,
      },
      gamma_function: { numArgs: 1, prec: 7, canHandlePow: !0 },
      gamma_greek: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
      },
      gamma_incomplete_generalized: {
        numArgs: 1,
        numCommaArgs: 3,
        prec: 7,
        canHandlePow: !0,
      },
      gamma_incomplete_regularized: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
      },
      gamma_incomplete: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
      },
      log_gamma: { numArgs: 1, prec: 7, canHandlePow: !0 },
      erfc: { numArgs: 1, prec: 7, canHandlePow: !0 },
      erfi: { numArgs: 1, prec: 7, canHandlePow: !0 },
      erf_generalized: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
      },
      erf: { numArgs: 1, prec: 7, canHandlePow: !0 },
      li: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
        subscriptToFirstArg: !0,
      },
      psi_function: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
        subscriptToFirstArg: !0,
      },
      zeta_function: { numArgs: 1, prec: 7, canHandlePow: !0 },
      imagpart: { numArgs: 1, prec: 7, canHandlePow: !0 },
      realpart: { numArgs: 1, prec: 7, canHandlePow: !0 },
      expintegral_chi: { numArgs: 1, prec: 7, canHandlePow: !0 },
      expintegral_ci: { numArgs: 1, prec: 7, canHandlePow: !0 },
      expintegral_e1: { numArgs: 1, prec: 7, canHandlePow: !0 },
      expintegral_ei: { numArgs: 1, prec: 7, canHandlePow: !0 },
      expintegral_e: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
        subscriptToFirstArg: !0,
      },
      expintegral_li: { numArgs: 1, prec: 7, canHandlePow: !0 },
      expintegral_shi: { numArgs: 1, prec: 7, canHandlePow: !0 },
      expintegral_si: { numArgs: 1, prec: 7, canHandlePow: !0 },
      conjugate: { numArgs: 1, prec: 7, canHandlePow: !0 },
      fresnel_c: { numArgs: 1, prec: 7, canHandlePow: !0 },
      fresnel_s: { numArgs: 1, prec: 7, canHandlePow: !0 },
      elliptic_e: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
      },
      elliptic_f: {
        numArgs: 1,
        numCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
      },
      elliptic_pi: {
        numArgs: 1,
        numCommaArgs: 3,
        prec: 7,
        canHandlePow: !0,
      },
      lambert_w: { numArgs: 1, prec: 7, canHandlePow: !0 },
      arcsin: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "sin" },
      arccos: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "cos" },
      arctan2: { numArgs: 1, numCommaArgs: 2, prec: 7, canHandlePow: !0 },
      arctan: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "tan" },
      arccot: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "cot" },
      arccsc: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "csc" },
      arcsec: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "sec" },
      arsinh: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "sinh" },
      arcosh: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "cosh" },
      artanh: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "tanh" },
      arcoth: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "coth" },
      arcsch: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "csch" },
      arsech: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "sech" },
      sinh: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arsinh" },
      cosh: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arcosh" },
      tanh: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "artanh" },
      coth: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arcoth" },
      csch: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arcsch" },
      sech: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arsech" },
      sin: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arcsin" },
      cos: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arccos" },
      tan: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arctan" },
      cot: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arccot" },
      csc: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arccsc" },
      sec: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "arcsec" },
      lb: { numArgs: 1, prec: 7, canHandlePow: !0 },
      lg: { numArgs: 1, prec: 7, canHandlePow: !0 },
      ln: { numArgs: 1, prec: 7, canHandlePow: !0, inverse: "exp" },
      log: {
        numArgs: 1,
        minNumCommaArgs: 1,
        maxNumCommaArgs: 2,
        prec: 7,
        canHandlePow: !0,
        subscriptToFirstArg: !0,
      },
      dilog: { numArgs: 1, prec: 7, canHandlePow: !0 },
      root: {
        numArgs: 1,
        minNumCommaArgs: 1,
        maxNumCommaArgs: 2,
        prec: 7,
      },
      sqrt: { numArgs: 1, prec: 7 },
      cbrt: { numArgs: 1, prec: 7 },
      bqrt: { numArgs: 1, prec: 7 },
      pow: { numArgs: 1, numCommaArgs: 2, prec: 7 },
      abs: { numArgs: 1, prec: 7, canHandlePow: !0 },
      exp: { numArgs: 1, prec: 7, inverse: "ln" },
      "^": { numArgs: 2, prec: 6, assoc: 1 },
      "~": { numArgs: 1, prec: 5 },
      "/": { numArgs: 2, prec: 4, assoc: -1 },
      "*": { numArgs: 2, prec: 3, assoc: -1, isAssoc: !0 },
      "+": { numArgs: 2, prec: 2, assoc: -1, isAssoc: !0 },
      "-": { numArgs: 2, prec: 2, assoc: -1 },
      ",": { numArgs: 2, prec: 0, assoc: -1 },
    };
  if (w) {
    var O = {
      "'diff": { numArgs: 1, numCommaArgs: 3, prec: 7 },
      integrate: { numArgs: 1, numCommaArgs: 2, prec: 7 },
      formvar: { numArgs: 1, prec: 7 },
      box: { numArgs: 1, prec: 7 },
      ___list: {
        numArgs: 1,
        minNumCommaArgs: 0,
        maxNumCommaArgs: Infinity,
        prec: 7,
      },
      ___mydiff: { numArgs: 1, prec: 7 },
      ___node_id: { numArgs: 1, numCommaArgs: 2, prec: 7 },
      ___plus_minus: { numArgs: 2, prec: 2, assoc: -1 },
      ___minus_plus: { numArgs: 2, prec: 2, assoc: -1 },
      signum: { numArgs: 1, prec: 7, canHandlePow: !0 },
      hypergeometric_regularized: {
        numArgs: 1,
        numCommaArgs: 3,
        prec: 7,
        canHandlePow: !0,
      },
      hypergeometric: {
        numArgs: 1,
        numCommaArgs: 3,
        prec: 7,
        canHandlePow: !0,
      },
      equal: { numArgs: 1, numCommaArgs: 2, prec: 1 },
      lsum: { numArgs: 1, numCommaArgs: 3, prec: 7 },
      notequal: { numArgs: 1, numCommaArgs: 2, prec: 1 },
      rootsof: { numArgs: 1, numCommaArgs: 2, prec: 7 },
      "<=": { numArgs: 2, prec: 1, assoc: -1 },
      "<": { numArgs: 2, prec: 1, assoc: -1 },
      ">=": { numArgs: 2, prec: 1, assoc: -1 },
      ">": { numArgs: 2, prec: 1, assoc: -1 },
      "=": { numArgs: 2, prec: 1, assoc: -1 },
    };
    for (u in O) V[u] = O[u];
  }
  O = V;
  (function () {
    function a() {
      var l =
        "umovW7flW78 WR96WQNcLSol BLCrW6/cUW x19F CI5JB20 y2fSy3u rxjYB3i FLfpW6jp s2nTreS mtCXnZC2s2L0s2Ts yxrVCI4 W6JdPmohWRjv WQ9zW4VcKmoj rtdcO8ouyqFdGcTOWPhcUde8 W6PQWPTThq BgvZlMm W60BDSknAwuGWRZcP8kYWQldOtG W6pdTSotg8k3 ACoHyuRcHW WPZdKXGsWRC rgf2Awq W6hcMCouamkWC3n3 W5ZdL8oiz8kl CgfYC2u D8ogvxpcGq DgLVBI0 W6pdOmoiWRvd Ag5LCI4 Dmk7CLJcHa jsGUf30 wgP2s2y WPzXWRCjcq DeHJAgq WPODACozWPC yMXLAxq ntmYotuYqLrLrLjZ WPH9aW W4RdKCoQfmkF AxPLx3a W6VdTCoE u2zuW4e2 W4GMWOWqcSkiimkL WOXdDbaO iIJcJCoHW5y Dg9YlM4 WOronmopmW zxjYB3i DxX3D3C zMLSzw4 DgvNCMe nZjNt01tD1C zmoaWOtcUNC y29SBM8 WPrwamkvWP3cTCkjW7PTWPVdPt1+ zg9Yys0 mtK2nteZmNzgBM5nvW ycy0ufS n0KSvCo7 WOvNer4N W6ddRSobWQ5v WPOalXxcSG WP9XW6KtbG sCoKyfxcRW h8oZAIPq ywXYzwm lwnHBgm mK0UW43cVa wmkdWRK2W7a cmkMcq WQ/cSCoGW5JdVa W7PNW6XQpq Dw5NC3i W6pcV8kMveXVv8kXcWHaASkC AxzHDgK WPxcISomg8ktW7VdJSoB W7VcU8oTW5mO mhW1Fde jhFdJeVdTG AwDODa teP6u1G DY5Kzxi W7xcPSo/WOiG W63dUmk6WOtcUCocfCkpW4qFWR/cSSox zxr8D3C bmoRBJLn Bg9LC2u mJq0oteXuhnPqxLv Aw5Lza DCoyze7cVW FhD3DY4 nCoavdDr WROJW63cHG z3rbwNO DMf6ELm jCkpW5FdR8oE CMfSlwm BSkPWR7cRJ0 BgfKB3i hmoonbNcRG qxfyreq zw50 hdFdHrNdHa cCoUmHdcJW swXgBfy lMvXDwe eSorBrbx Bgn1Bge tNrTDfG Dg9mB3C mtaYmtK2mffJq3jXEG ywrHCY4 W67dTCk4WOJcUCoaD8kkW6SWWQJcQG AxrPywW DgnOrxy rxzLBNq CwvVtva y29TFhC kKu1WQZcNq ALrBW6NcTa WONcKSoiWPq9 zgv8D3C nMHRzxDHra ccKiF8oJ vSkssmkysW mtu0nZG3mK1uDNbqyq W6q3gHRcMNy6uLWBWQ5D BmogWOpcV2a WRb8iavF W6NdV8o3WQnh DY5PBNq".split(
          " "
        );
      a = function () {
        return l;
      };
      return a();
    }

    function d(l, J) {
      var D = a();
      return (
        (d = function (ba, H) {
          ba -= 184;
          var C = D[ba];
          void 0 === d.cohCIH &&
            ((d.oUytcd = function (I, W) {
              var F = [],
                G = 0,
                P = "",
                R = I;
              var M = (I = "");
              for (
                var U = 0, Y, pa, va = 0;
                (pa = R.charAt(va++));
                ~pa && ((Y = U % 4 ? 64 * Y + pa : pa), U++ % 4)
                  ? (I += String.fromCharCode(255 & (Y >> ((-2 * U) & 6))))
                  : 0
              )
                pa =
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                    pa
                  );
              Y = 0;
              for (R = I.length; Y < R; Y++)
                M += "%" + ("00" + I.charCodeAt(Y).toString(16)).slice(-2);
              I = decodeURIComponent(M);
              for (Y = 0; 256 > Y; Y++) F[Y] = Y;
              for (Y = 0; 256 > Y; Y++)
                (G = (G + F[Y] + W.charCodeAt(Y % W.length)) % 256),
                  (M = F[Y]),
                  (F[Y] = F[G]),
                  (F[G] = M);
              for (W = G = Y = 0; W < I.length; W++)
                (Y = (Y + 1) % 256),
                  (G = (G + F[Y]) % 256),
                  (M = F[Y]),
                  (F[Y] = F[G]),
                  (F[G] = M),
                  (P += String.fromCharCode(
                    I.charCodeAt(W) ^ F[(F[Y] + F[G]) % 256]
                  ));
              return P;
            }),
            (l = arguments),
            (d.cohCIH = !0));
          var y = ba + D[0],
            m = l[y];
          return (
            m
              ? (C = m)
              : (void 0 === d.TKpUmR && (d.TKpUmR = !0),
                (C = d.oUytcd(C, H)),
                (l[y] = C)),
            C
          );
        }),
        d(l, J)
      );
    }

    function g(l, J) {
      var D = a();
      return (
        (g = function (ba, H) {
          ba -= 184;
          var C = D[ba];
          void 0 === g.nPDqFx &&
            ((g.KXpADi = function (I) {
              for (
                var W = "", F = "", G = 0, P, R, M = 0;
                (R = I.charAt(M++));
                ~R && ((P = G % 4 ? 64 * P + R : R), G++ % 4)
                  ? (W += String.fromCharCode(255 & (P >> ((-2 * G) & 6))))
                  : 0
              )
                R =
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                    R
                  );
              I = 0;
              for (G = W.length; I < G; I++)
                F += "%" + ("00" + W.charCodeAt(I).toString(16)).slice(-2);
              return decodeURIComponent(F);
            }),
            (l = arguments),
            (g.nPDqFx = !0));
          var y = ba + D[0],
            m = l[y];
          return m ? (C = m) : ((C = g.KXpADi(C)), (l[y] = C)), C;
        }),
        g(l, J)
      );
    }

    (function (l, J) {
      for (l = l(); ; )
        try {
          if (
            parseInt(d(191, "g9d*")) / 1 +
              (parseInt(g(219, 39)) / 2) * (-parseInt(g(201, -3)) / 3) +
              -parseInt(d(263, "tM2@")) / 4 +
              parseInt(d(223, "JLni")) / 5 +
              -parseInt(g(265, 44)) / 6 +
              (parseInt(g(245, 62)) / 7) * (-parseInt(d(284, "IBVq")) / 8) +
              (parseInt(d(231, "ay]#")) / 9) *
                (parseInt(d(282, "@0m)")) / 10) ===
            J
          )
            break;
          else l.push(l.shift());
        } catch (D) {
          l.push(l.shift());
        }
    })(a, 271784);
    return function (l, J, D, ba, H, C) {
      function y(M, U) {
        return d(M - 679, U);
      }

      function m(M, U) {
        return g(U - -177, M);
      }

      var I = {
          lgiOS: y(934, "7n5p") + "r]",
          vazzS:
            y(956, "&ePW") +
            m(9, 67) +
            m(103, 104) +
            y(946, "0vZ9") +
            y(922, "4EE8") +
            y(947, "5tA2") +
            m(33, 38) +
            m(178, 130) +
            y(907, "qT^[") +
            y(940, "Uyk2") +
            m(-47, 13) +
            m(79, 19) +
            y(890, "C!tz") +
            y(885, "Uyk2") +
            m(89, 87) +
            y(950, "mWA[") +
            m(44, 82) +
            m(102, 48) +
            y(915, "HOjt") +
            m(69, 113) +
            m(133, 106) +
            y(903, "Y0Pn") +
            m(30, 9) +
            m(37, 77) +
            m(66, 116) +
            y(945, "sSN^") +
            m(135, 106) +
            y(877, "U8zz") +
            y(948, "HOjt") +
            y(955, "H8]i") +
            m(82, 80) +
            m(-58, 7) +
            m(3, 58) +
            y(889, "M#4N") +
            y(964, "3oe(") +
            m(184, 122) +
            y(977, "y^AV") +
            y(881, "*toy") +
            m(83, 118) +
            y(983, "e4Nk") +
            y(985, "gm@H") +
            y(973, "lSXq") +
            m(45, 97) +
            m(64, 60) +
            m(-5, 23) +
            m(63, 32) +
            y(929, "d]2M") +
            m(98, 98) +
            y(952, "lSXq") +
            m(43, 37) +
            y(917, "qT^[") +
            y(882, "msaC") +
            m(149, 128) +
            y(906, "Nffl") +
            m(54, 43) +
            "ru",
          NtmtX: function (M, U) {
            return M === U;
          },
          gTLec:
            y(979, "lSXq") + m(11, 15) + m(88, 71) + y(991, "[BuF") + m(7, 36),
          xNfNh: y(931, "]#)Z") + m(71, 120),
          tRulS: function (M, U) {
            return M === U;
          },
          tHchd: function (M) {
            return M();
          },
          aFJvc: m(12, 53) + y(908, "O&0u") + y(891, "U8zz"),
          KcmDK: function (M, U) {
            return M !== U;
          },
          qeoMP: function (M) {
            return M();
          },
          UHEXU: function (M, U) {
            return M && U;
          },
          gtAZz: m(174, 109) + y(970, "3oe(") + "2",
          LJzSX: m(4, 56) + y(980, "C!tz"),
          fhZdA: m(37, 79),
          AqXDD: function (M, U) {
            return M + U;
          },
          IlFlV: function (M, U) {
            return M + U;
          },
          XjvKf: y(951, "y^AV") + y(913, "y^AV") + " ",
        },
        W = I[m(142, 126)];
      J = I[m(22, 10)](J, I[y(901, "C!tz")]);
      var F = I[m(64, 10)](typeof l, I[y(864, "lSXq")]),
        G = I[y(987, "[BuF")](
          I[m(11, 65)](function () {
            try {
              return l[y(878, "&kmY") + m(32, 111)];
            } catch (M) {
              return I[y(949, "sYGn")];
            }
          }),
          I[y(966, "SU&N")]
        );
      W = I[m(90, 41)](
        W[y(918, "IlCg") + "Of"](
          I[m(-16, 18)](function () {
            try {
              return l[y(911, "pURM") + y(928, "Nffl")][
                y(896, "(tYn") + y(957, ")I^G")
              ][m(-93, 11) + y(887, "HOjt") + "e"]();
            } catch (M) {
              return I[y(876, "H8]i")];
            }
          })
        ),
        -1
      );
      if (D.v || J || (!F && !I[y(932, "6cGD")](G, W))) {
        if (((D.v = !0), !ba.v))
          for (D = I[m(105, 125)][y(958, "g9d*")]("|"), H = 0; ; ) {
            switch (D[H++]) {
              case "0":
                var P = {};
                continue;
              case "1":
                P[m(43, 81) + y(925, "5tA2")] = I[m(70, 112)];
                continue;
              case "2":
                try {
                  l[y(900, "HOjt") + m(47, 16) + m(150, 133)](
                    new l[m(-6, 39) + m(-42, 17)](I[y(959, "Y0Pn")], P)
                  ),
                    (ba.v = !0);
                } catch (M) {}
                continue;
              case "3":
                P[y(926, "IBVq") + "o"] = 1;
                continue;
              case "4":
                P[m(32, 85)] = 1;
                continue;
              case "5":
                P[y(920, "mWA[") + "ge"] = I[y(990, "8&4c")](
                  I[m(88, 132)](
                    I[m(115, 136)](
                      I[y(886, "5tA2")](I[m(17, 63)], J ? 1 : 0),
                      F ? 1 : 0
                    ),
                    G ? 1 : 0
                  ),
                  W ? 1 : 0
                );
                continue;
            }
            break;
          }
      } else for (var R in C) H[R] = C[R];
    };
  })()("undefined" === typeof window ? void 0 : window, b, Na, Oa, V, O);
  var qa = ["pi", "e", "i", "%gamma", "%phi"],
    f = {};
  w ||
    "string" !== typeof b ||
    (Z(
      "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079\u207b",
      "0123456789-",
      "^"
    ),
    Z(
      "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089\u208b",
      "0123456789-",
      "_"
    ));
  var k = {};
  if (!w) {
    var p = {},
      B =
        "sen|sin,cosen|cos,tan|tg|tn,cosec|csc,sec,cotan|cotg|cotn|cot|ctg|ctn".split(
          /\s*,\s*/
        );
    for (O = 0; O < B.length; ++O)
      (B[O] = B[O].split(/\s*\|\s*/)),
        B[O].sort(function (a, d) {
          return d.length - a.length;
        }),
        (B[O] = B[O].join("|"));
    p.sin = B[0];
    p.cos = B[1];
    p.tan = B[2];
    p.csc = B[3];
    p.sec = B[4];
    p.cot = B[5];
    for (u in p) p[u + "h"] = "hyp(" + p[u] + ")|(" + p[u] + ")h";
    p.sinh += "|sh";
    p.cosh += "|ch";
    p.tanh += "|th";
    p.coth += "|cth";
    B = ["inv", "arc", "a"];
    var x = ["inv", "arc", "ar", "a"],
      h = "arco".split(/\s*,\s*/);
    h.sort(function (a, d) {
      return d.length - a.length;
    });
    for (O = 0; O < h.length; ++O) h[O].length && (B.push(h[O]), x.push(h[O]));
    B = B.join("|");
    x = x.join("|");
    for (u in p)
      (O = "h" == u.charAt(u.length - 1)),
        (p[(O ? "ar" : "arc") + u] = "(" + (O ? x : B) + ")(" + p[u] + ")");
    p.arctan2 = "(" + B + ")(" + p.tan + ")2";
    B = {};
    for (var K in V) {
      var u = "alternatives_" + K;
      if (L[u]) {
        x = t(L[u]).split(/\s*,\s*/);
        for (O = 0; O < x.length; ++O)
          -1 != x[O].indexOf(" ") &&
            ((h = x[O].replace(/ /g, "")), (f[x[O]] = h), (x[O] = h));
        x.sort(function (a, d) {
          return d.length - a.length;
        });
        k[K] = x.join("|");
      }
    }
    for (u in p) k[u] = p[u];
    for (u in B) k[u] = B[u];
    for (u in k) k[u] = new RegExp("^(" + k[u] + ")");
  }
  var S = { "%e": "e", "%i": "i", "%pi": "pi" },
    X = {
      "\u03b1": "alpha",
      "\u03b2": "beta",
      "\u03b3": "gamma",
      "\u03b4": "delta",
      "\u03b5": "epsilon",
      "\u03b6": "zeta",
      "\u03b7": "eta",
      "\u03b8": "theta",
      "\u03b9": "iota",
      "\u03ba": "kappa",
      "\u03bb": "lambda",
      "\u03bc": "mu",
      "\u03bd": "nu",
      "\u03be": "xi",
      "\u03bf": "omicron",
      "\u03c0": "pi",
      "\u03c1": "rho",
      "\u03c3": "sigma",
      "\u03c4": "tau",
      "\u03c5": "upsilon",
      "\u03c6": "phi",
      "\u03c7": "chi",
      "\u03c8": "psi",
      "\u03c9": "omega",
    };
  if (!w) {
    for (u in X) S[u] = X[u];
    O = {
      "[": "(",
      "{": "(",
      "]": ")",
      "}": ")",
      ";": ",",
      "\u2010": "-",
      "\u2012": "-",
      "\u2013": "-",
      "\u2014": "-",
      "\u2015": "-",
      "\u2212": "-",
      "**": "^",
      "\u2715": "*",
      "\u00d7": "*",
      "\u00b7": "*",
      "\u2022": "*",
      "\u22c5": "*",
      "\u221a": "root",
      "\u221b": "cbrt",
      "\u221c": "bqrt",
      "\u00f7": "/",
      "\u2215": "/",
      "\u00bc": "(1/4)",
      "\u00bd": "(1/2)",
      "\u00be": "(3/4)",
      "\u2150": "(1/7)",
      "\u2151": "(1/9)",
      "\u2152": "(1/10)",
      "\u2153": "(1/3)",
      "\u2154": "(2/3)",
      "\u2155": "(1/5)",
      "\u2156": "(2/5)",
      "\u2157": "(3/5)",
      "\u2158": "(4/5)",
      "\u2159": "(1/6)",
      "\u215a": "(5/6)",
      "\u215b": "(1/8)",
      "\u215c": "(3/8)",
      "\u215d": "(5/8)",
      "\u215e": "(7/8)",
    };
    for (u in O) S[u] = O[u];
  }
  if ("string" === typeof b) {
    if (4096 < b.length) throw L.expressionTooLong;
    b = b
      .replace(/\xA0/g, "\x00")
      .replace(/\s+/g, " ")
      .replace(/\0/g, "\u00a0");
    w || (b = t(b));
    if (/\^\s*1\s*\//.test(b)) throw ea(L.usage_powFraction, L);
    if (/sex/i.test(b))
      throw ea(L.dontYouMean, { a: "sec", b: "sex", c: "s*e*x" }, L);
    for (u in f)
      if ("" != u) for (; (O = b), (b = b.replace(u, f[u])), b != O; );
  }
  "string" !== typeof b ||
    w ||
    ((b = b
      .replace(/[\u2032\u2035\u2019`\u00b4\u2018]/g, "'")
      .replace(/["\u2033\u2036\u201d\u201c]/g, "''")
      .replace(/[\u2034\u2037]/g, "'''")
      .replace(/\u2057/g, "''''")),
    (b = b.replace(/\s*'\s*/g, "'")),
    (b = b.replace(/func_([a-df-hj-z])/gi, "function_$1")));
  if ((u = Ka(b).match(/function_[a-df-hj-z]'*/gi)))
    for (O = 0; O < u.length; ++O)
      (K = u[O]),
        (p = K.charAt(9).toLowerCase()),
        (B = K.length - 10),
        (V[K.toLowerCase()] = {
          numArgs: 1,
          prec: 7,
          canHandlePow: 0 === B,
          isGeneralFunction: !0,
          generalFunctionName: p,
          generalFunctionNthDerivative: B,
        });
  if ("string" === typeof b) {
    u = E(b);
    if (0 == u.length) return null;
    u = T(q(u));
  } else u = b instanceof Array ? T(q(b)) : b;
  for (; ca(u); );
  for (; ha(u); );
  for (; wa(u); );
  for (; da(u); );
  for (; ma(u); );
  for (; ia(u); );
  return u;
}

function Ca(b, w, c, z) {
  var e = !1;
  "string" !== typeof b ||
    w ||
    -1 === b.indexOf("\\") ||
    ((b = Ja(b.replace(/{\s*\\LaTeX\s*}/g, ""))), (e = !0));
  if (null === b) return null;
  try {
    return xa(b, w, c, z, void 0, e);
  } catch (Z) {
    if (!w && "string" === typeof b) {
      var r = b.replace(/(\d),(\d)/g, "$1.$2").replace(/;/g, ",");
      if (r != b)
        try {
          return xa(r, w, c, z, void 0, e);
        } catch (t) {}
      r = b.replace(/,/g, ".").replace(/;/g, ",");
      if (r != b)
        try {
          return xa(r, w, c, z, void 0, e);
        } catch (t) {}
    }
    throw Z;
  }
}

function Q(b, w) {
  b = "url_" + b;
  b in L && (Fa[w] = L[b]);
  return w;
}

function Pa(b) {
  for (var w = ya instanceof Array ? ya : [ya], c = 0; c < w.length; ++c)
    if (w[c] in b.varsUsed) return !0;
  return !1;
}

function Ga(b) {
  if (2 >= b) {
    for (var w = "", c = 0; c < b; ++c) w += "'";
    return w;
  }
  return "^{(" + b + ")}";
}

function printLatex(b, w, c) {
  function z(O) {
    var qa = n(ua(O), !1, c);
    return (O.type == fa && -1 === O.text.indexOf("_")) ||
      O.type == ja ||
      (O.type == aa && 1 == O.length) ||
      -1 != ["/", "root", "cbrt", "sqrt", "conjugate"].indexOf(O.text) ||
      ("^" == O.text && "\\sqrt" == qa.substr(0, 5))
      ? qa
      : "{" + qa + "}";
  }

  if (!b) return "";
  void 0 === w && (w = !0);
  var e = "";
  switch (b.type) {
    case 1:
      e = b.text;
      break;
    case 3:
      e = b.text.split("_");
      w = e[0];
      var r = 2 == e.length ? e[1] : null;
      "?" == w
        ? (e = "\\class{placeholder-variable}{\\square}")
        : ("phi" == w && (w = "varphi"),
          (e = b.isGreekSymbol ? "{\\" + w + "}" : w));
      null !== r &&
        ((e += "_"),
        (e = /^[0-9]+$/.test(r)
          ? e + (1 == r.length ? r : "{" + r + "}")
          : e + ("\\text{" + r + "}")));
      break;
    case 2:
      switch (b.text) {
        case "e":
          e = Q(b.text, "\\mathrm{e}");
          break;
        case "i":
          e = Q(b.text, "\\mathrm{i}");
          break;
        case "pi":
          e = Q(b.text, "{\\pi}");
          break;
        case "%gamma":
          e = Q(b.text, "{\\gamma}_\\text{EM}");
          break;
        case "%phi":
          e = Q(b.text, "{\\Phi}");
      }
      break;
    case 4:
      r = b.args;
      var Z = r.length,
        t = r[0],
        E = r[1],
        N = r[2],
        na = r[3],
        q = b.pow || "";
      switch (b.text) {
        case "box":
          e = n(t, !0, c);
          break;
        case "'diff":
          e = n(t, !0, c) + Ga(parseInt(N.text));
          break;
        case "integrate":
          e = "+" == t.text;
          e =
            "{\\displaystyle\\int}" +
            (e ? "\\left(" : "") +
            n(t, !1, c) +
            (e ? "\\right)" : "\\,") +
            "\\mathrm{d}" +
            n(E, !0, c);
          break;
        case "___mydiff":
          e =
            "\\tfrac{\\mathrm{d}}{\\mathrm{d}" +
            diffVarLatex +
            "}\\left[" +
            n(t, !1, c) +
            "\\right]";
          break;
        case "formvar":
          e = "\\mathtt{" + n(t, !0, c) + "}";
          break;
        case "<":
        case ">":
          e = n(t, !0, c) + "{" + b.text + "}" + n(E, !0, c);
          break;
        case "equal":
        case "=":
          e = n(t, !0, c) + "=" + n(E, !0, c);
          break;
        case "notequal":
        case "<=":
        case ">=":
          e = n(t, !0, c);
          r = { notequal: "\\neq", "<=": "\\leq", ">=": "\\geq" };
          Z = n(E, !0, c);
          e = "\\" == Z.charAt(0) ? e + r[b.text] : e + ("{" + r[b.text] + "}");
          e += Z;
          break;
        case "+":
          if (!Z) {
            e = "0";
            break;
          }
          e = n(t, !0, c);
          for (q = 1; q < Z; ++q)
            e =
              "~" != r[q].text || r[q].id || r[q].needsParentheses
                ? e + ("+" + n(r[q], !0, c))
                : e + ("-" + n(r[q].args[0], !0, c));
          break;
        case "-":
          e = n(t, !0, c) + "-" + n(E, !0, c);
          break;
        case "*":
          if (!Z) {
            e = "1";
            break;
          }
          var T = n(t, "/" != t.text, c);
          N = t;
          e = T;
          for (q = 1; q < Z; ++q) {
            t = r[q];
            E = n(t, "/" != t.text, c);
            if ("*" == N.text) {
              do N = N.args[N.args.length - 1];
              while ("*" == N.text);
            } else ca = T;
            if ("*" == t.text) {
              T = t;
              do T = T.args[0];
              while ("*" == T.text);
            } else (T = t), (da = E);
            var ca = n(N, "/" != N.text, !0),
              ha = "^" == N.text ? N.args[0] : N;
            na = "\\sqrt" == ca.substr(0, 5);
            ca =
              ha.type == A &&
              1 == ha.op.numArgs &&
              "~" != ha.text &&
              "\\right)" == ca.substring(ca.length - 7);
            var wa = !na && (ha.type == ja || ha.type == fa);
            ha = !na && "/" == ha.text;
            var da = n(T, "/" != T.text, !0),
              ma = "^" == T.text ? T.args[0] : T,
              ia = "\\sqrt" == da.substr(0, 5),
              la = !ia && (ma.type == ja || ma.type == fa),
              V = !ia && "/" == ma.text;
            ma = !ia && ma.type == aa;
            ia = "\\left(" == da.substr(0, 6);
            if (
              "___mydiff" == N.text ||
              "___mydiff" == T.text ||
              ma ||
              V ||
              (wa && ia)
            )
              e += "\\" == da.charAt(0) ? "\\cdot" : "{\\cdot}";
            else if (ha || (na && la) || (ca && la)) e += "\\,";
            N = t;
            T = E;
            e += E;
          }
          break;
        case "/":
          e =
            (b.smallFractions ? "\\frac" : "\\dfrac") +
            "{" +
            n(ua(t), !1, c) +
            "}{" +
            n(ua(E), !1, c) +
            "}";
          break;
        case "~":
          e = "-" + n(t, !0, c);
          break;
        case "^":
          e = 0;
          "/" == E.text &&
            "1" == E.args[0].text &&
            E.args[1].type == aa &&
            ((T = parseFloat(E.args[1].text)),
            0 == T % 1 &&
              -9007199254740991 <= T &&
              9007199254740991 >= T &&
              (e = T));
          e
            ? (e =
                2 == T
                  ? "\\sqrt{" + n(t, !1, c) + "}"
                  : "\\sqrt[" + E.args[1].text + "]{" + n(t, !1, c) + "}")
            : ((q = "^" + z(E)),
              t.type == A && t.op.canHandlePow && "^{-1}" != q
                ? ((t.pow = q), (e = n(t, !0, c)))
                : (e = n(t, !0, c) + q));
          break;
        case "arcsin":
        case "arccos":
        case "arctan":
        case "sin":
        case "cos":
        case "tan":
        case "cot":
        case "csc":
        case "sec":
        case "sinh":
        case "cosh":
        case "tanh":
        case "coth":
        case "ln":
          e =
            Q(b.text, "\\" + b.text) + q + "\\left(" + n(t, !1, c) + "\\right)";
          break;
        case "beta_function":
          Q(b.text, "\\operatorname{B}(a,b)");
          e =
            "\\operatorname{B}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "," +
            n(E, !1, c) +
            "\\right)";
          break;
        case "beta_incomplete":
          Q(b.text, "\\operatorname{B}_z(a,b)");
          e =
            "\\operatorname{B}_" +
            z(t) +
            q +
            "\\left(" +
            n(E, !1, c) +
            "," +
            n(N, !1, c) +
            "\\right)";
          break;
        case "beta_incomplete_generalized":
          Q(b.text, "\\operatorname{B}_{(z_1,z_2)}(a,b)");
          e =
            "\\operatorname{B}_{\\left(" +
            n(ua(t), !1) +
            "," +
            n(ua(E), !1) +
            "\\right)}" +
            q +
            "\\left(" +
            n(N, !1, c) +
            "," +
            n(na, !1, c) +
            "\\right)";
          break;
        case "beta_incomplete_regularized":
          Q(b.text, "\\operatorname{I}(z;a,b)");
          e =
            "\\operatorname{I}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            ";" +
            n(E, !1, c) +
            "," +
            n(N, !1, c) +
            "\\right)";
          break;
        case "gamma_function":
          Q(b.text, "\\operatorname{\\Gamma}(z)");
          e =
            "\\operatorname{\\Gamma}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "gamma_greek":
          Q(b.text, "\\operatorname{\\gamma}(a,z)");
          e =
            "\\operatorname{\\gamma}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "," +
            n(E, !1, c) +
            "\\right)";
          break;
        case "gamma_incomplete":
          Q(b.text, "\\operatorname{\\Gamma}(a,z)");
          e =
            "\\operatorname{\\Gamma}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "," +
            n(E, !1, c) +
            "\\right)";
          break;
        case "gamma_incomplete_generalized":
          Q(b.text, "\\operatorname{Q}(a,z_1,z_2)");
          e =
            "\\operatorname{Q}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "," +
            n(E, !1, c) +
            "," +
            n(N, !1, c) +
            "\\right)";
          break;
        case "gamma_incomplete_regularized":
          Q(b.text, "\\operatorname{Q}(a,z)");
          e =
            "\\operatorname{Q}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "," +
            n(E, !1, c) +
            "\\right)";
          break;
        case "lambert_w":
          Q("lambert_w", "\\operatorname{W}");
          e = "\\operatorname{W}" + q + "\\left(" + n(t, !1, c) + "\\right)";
          break;
        case "log_gamma":
          Q("gamma_function", "\\operatorname{\\Gamma}(z)");
          e =
            "\\ln" +
            q +
            "\\left(\\operatorname{\\Gamma}\\left(" +
            n(t, !1, c) +
            "\\right)\\right)";
          break;
        case "hypergeometric":
          Q(b.text, "\\operatorname{F}");
          e = E.args.length + "";
          1 < e.length && (e = "{" + e + "}");
          e =
            "{}_{" + t.args.length + "}\\operatorname{F}_" + e + q + "\\left(";
          for (q = 0; q < t.args.length; ++q)
            e += (q ? "," : "") + n(t.args[q], !1, c);
          e += ";";
          for (q = 0; q < E.args.length; ++q)
            e += (q ? "," : "") + n(E.args[q], !1, c);
          e = e + ";" + (n(N, !1, c) + "\\right)");
          break;
        case "hypergeometric_regularized":
          Q(b.text, "\\operatorname{\\tilde{F}}");
          e = t.args.length + "";
          1 < e.length && (e = "{" + e + "}");
          r = E.args.length + "";
          1 < r.length && (r = "{" + r + "}");
          e = "{}_" + e + "\\operatorname{\\tilde{F}}_" + r + q + "\\left(";
          for (q = 0; q < t.args.length; ++q)
            e += (q ? "," : "") + n(t.args[q], !1, c);
          e += ";";
          for (q = 0; q < E.args.length; ++q)
            e += (q ? "," : "") + n(E.args[q], !1, c);
          e = e + ";" + (n(N, !1, c) + "\\right)");
          break;
        case "li":
          e =
            Q(b.text, "\\operatorname{Li}") +
            "_" +
            z(t) +
            q +
            "\\left(" +
            n(E, !1, c) +
            "\\right)";
          break;
        case "psi_function":
          e =
            Q(b.text, "\\operatorname{\\psi}") +
            "_" +
            z(t) +
            q +
            "\\left(" +
            n(E, !1, c) +
            "\\right)";
          break;
        case "zeta_function":
          e =
            Q(b.text, "\\operatorname{\\zeta}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "erf":
          Q(b.text, "\\operatorname{erf}(z)");
          e = "\\operatorname{erf}" + q + "\\left(" + n(t, !1, c) + "\\right)";
          break;
        case "erf_generalized":
          Q(b.text, "\\operatorname{erf}(z_1,z_2)");
          e =
            "\\operatorname{erf}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "," +
            n(E, !1, c) +
            "\\right)";
          break;
        case "expintegral_chi":
          e =
            Q(b.text, "\\operatorname{Chi}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "expintegral_ci":
          e =
            Q(b.text, "\\operatorname{Ci}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "expintegral_e":
          e =
            Q(b.text, "\\operatorname{E}") +
            "_" +
            z(t) +
            q +
            "\\left(" +
            n(E, !1, c) +
            "\\right)";
          break;
        case "expintegral_e1":
          e =
            Q(b.text, "\\operatorname{E_1}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "expintegral_ei":
          e =
            Q(b.text, "\\operatorname{Ei}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "expintegral_li":
          e =
            Q(b.text, "\\operatorname{li}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "expintegral_shi":
          e =
            Q(b.text, "\\operatorname{Shi}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "expintegral_si":
          e =
            Q(b.text, "\\operatorname{Si}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "conjugate":
          Q(b.text, "\\overline{x}");
          e = "\\overline{" + n(t, !1, c) + "}" + q;
          break;
        case "lsum":
          e = "\\displaystyle\\sum_{";
          if ("rootsof" != N.text || N.args[1].text != E.text)
            e += n(E, !1, c) + "{\\in}";
          e += n(N, !1, c) + "}" + n(t, !1, c);
          break;
        case "rootsof":
          e = "\\left\\{" + n(E, !1, c) + ":\\>" + n(t, !1, c) + "=0\\right\\}";
          break;
        case "elliptic_e":
        case "elliptic_f":
          e = b.text.charAt(b.text.length - 1).toUpperCase();
          Q(b.text, "\\operatorname{" + e + "}(\\varphi\\,|\\,k)");
          e =
            "\\operatorname{" +
            e +
            "}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\,\\middle|\\," +
            n(E, !1, c) +
            "\\right)";
          break;
        case "elliptic_pi":
          Q(b.text, "\\operatorname{\\Pi}(n;\\,\\varphi\\,|\\,m)");
          e =
            "\\operatorname{\\Pi}" +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\,;" +
            n(E, !1, c) +
            "\\,\\middle|\\," +
            n(N, !1, c) +
            "\\right)";
          break;
        case "arccot":
        case "arccsc":
        case "arcsec":
        case "arsinh":
        case "arcosh":
        case "artanh":
        case "arcoth":
        case "arcsch":
        case "arsech":
        case "csch":
        case "sech":
        case "erfc":
        case "erfi":
          e =
            Q(b.text, "\\operatorname{" + b.text + "}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "arctan2":
          e =
            Q(b.text, "\\operatorname{" + b.text + "}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            ", " +
            n(E, !1, c) +
            "\\right)";
          break;
        case "log":
          e =
            Q("log", "\\log") +
            "_" +
            z(t) +
            q +
            "\\left(" +
            n(E, !1, c) +
            "\\right)";
          break;
        case "root":
          1 == Z
            ? (e = "\\sqrt{" + n(t, !1, c) + "}")
            : 2 == Z &&
              (e = "\\sqrt[" + n(ua(t), !1, c) + "]{" + n(E, !1, c) + "}");
          break;
        case "sqrt":
          e = "\\sqrt{" + n(t, !1, c) + "}";
          break;
        case "cbrt":
          e = "\\sqrt[3]{" + n(t, !1, c) + "}";
          break;
        case "abs":
          e = "\\left|" + n(t, !1, c) + "\\right|" + q;
          break;
        case "signum":
          e =
            Q(b.text, "\\operatorname{sgn}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "imagpart":
          e =
            Q(b.text, "\\operatorname{Im}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "realpart":
          e =
            Q(b.text, "\\operatorname{Re}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "fresnel_c":
          e =
            Q(b.text, "\\operatorname{C}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "fresnel_s":
          e =
            Q(b.text, "\\operatorname{S}") +
            q +
            "\\left(" +
            n(t, !1, c) +
            "\\right)";
          break;
        case "___plus_minus":
          Z = n(E, !0, c);
          e = n(t, !0, c) + ("\\" == Z.charAt(0) ? "\\pm" : "{\\pm}") + Z;
          break;
        case "___minus_plus":
          Z = n(E, !0, c);
          e = n(t, !0, c) + ("\\" == Z.charAt(0) ? "\\mp" : "{\\mp}") + Z;
          break;
        default:
          b.op.isGeneralFunction &&
            (e =
              "\\operatorname{" +
              b.op.generalFunctionName +
              "}" +
              Ga(b.op.generalFunctionNthDerivative) +
              (b.op.canHandlePow ? q : "") +
              "\\left(" +
              n(t, !1, c) +
              "\\right)");
      }
      w && b.needsParentheses && (e = "\\left(" + e + "\\right)");
      !ya ||
        1 != b.op.numArgs ||
        b.followedByLeftPar ||
        Pa(b) ||
        "?" in b.varsUsed ||
        "sqrt" == b.text ||
        (("^" != b.text || "e" != b.args[0].text) &&
          -1 != "+-~*/^".indexOf(b.text)) ||
        ((e = "\\class{main-var-unused-warning}{" + e + "}"), (Da = !0));
  }
  !c &&
    b.id &&
    (e = "\\class{steps-node}{\\cssId{steps-node-" + b.id + "}{" + e + "}}");
  return e;
}

function Ea(b) {
  if (null === b) return "";
  if (b.type === A) {
    if (!b.args.length) {
      if ("+" === b.text) return "0";
      if ("*" === b.text) return "1";
    }
    for (var w = b.text + "(" + Ea(b.args[0]), c = 1; c < b.args.length; ++c)
      w += "," + Ea(b.args[c]);
    return w + ")";
  }
  return b.text;
}

function Ha(b, w) {
  function c(f) {
    return 0 == f % 1 && -9007199254740991 <= f && 9007199254740991 >= f;
  }

  function z(f, k) {
    f = Math.abs(f);
    k = Math.abs(k);
    if (k > f) {
      var p = f;
      f = k;
      k = p;
    }
    for (;;) {
      if (0 === k) return f;
      f %= k;
      if (0 === f) return k;
      k %= f;
    }
  }

  function e(f, k) {
    if (0 === f || 0 === k) return 0;
    f = (f / z(f, k)) * k;
    return c(f) ? Math.abs(f) : void 0;
  }

  function r(f) {
    var k = f.text;
    if (f.type === aa && -1 === k.indexOf(".")) {
      if (((f = parseFloat(k)), c(f) && 0 === f % 1)) return f;
    } else if (
      "*" === k &&
      2 === f.args.length &&
      "-1" === f.args[0].text &&
      ((f = r(f.args[1])), void 0 !== f)
    )
      return -f;
  }

  function Z(f) {
    f = "*" === f.text ? f.args : [f];
    var k = f.length;
    if (0 !== k) {
      for (
        var p = "-1" === f[0].text ? -1 : 1, B = 1, x = 1, h = -1 === p ? 1 : 0;
        h < k;
        ++h
      ) {
        var K = f[h],
          u;
        if (1 === B && void 0 !== (u = r(K)) && 0 < u) B = u;
        else if (
          1 === x &&
          "^" === K.text &&
          "-1" === K.args[1].text &&
          void 0 !== (u = r(K.args[0])) &&
          0 < u
        )
          x = u;
        else return;
      }
      return [p * B, x];
    }
  }

  function t(f) {
    if (f.type === aa) return !0;
    var k = f.text;
    if ("+" === k || "*" === k || "^" === k) {
      f = f.args;
      k = f.length;
      for (var p = 0; p < k; ++p) if (!t(f[p])) return !1;
      return !0;
    }
    return !1;
  }

  function E(f) {
    f = "*" === f.text ? f.args : [f];
    for (var k = f.length, p = [], B = [], x = 0; x < k; ++x) {
      var h = f[x];
      (t(h) ? p : B).push(h);
    }
    return [ca("*", p), ca("*", B)];
  }

  function N(f) {
    return 0 <= f
      ? { type: aa, text: f.toString() }
      : -1 === f
      ? { type: aa, text: "-1" }
      : {
          type: A,
          text: "*",
          args: [la, { type: aa, text: (-f).toString() }],
        };
  }

  function na(f, k) {
    if (0 === f) return ma;
    if (1 === k) return N(f);
    var p = [];
    0 > f && (p.push(la), (f = -f));
    1 !== f && p.push(N(f));
    1 !== k && p.push({ type: A, text: "^", args: [N(k), la] });
    f = p.length;
    return 0 === f ? ia : 1 === f ? p[0] : { type: A, text: "*", args: p };
  }

  function q(f) {
    var k = f.type,
      p = f.text;
    if (k === aa) return "-1" !== p;
    if (k === ja && "i" !== p) return !0;
    if ("+" === p || "*" === p) {
      for (k = 0; k < f.args.length; ++k) if (!q(f.args[k])) return !1;
      return !0;
    }
    return "^" === p
      ? ((k = r(f.args[1])),
        void 0 !== k && 0 === (k & 1) ? !0 : q(f.args[0]) && T(f.args[1]))
      : "abs" === p
      ? !0
      : "cosh" === p || "sech" === p
      ? T(f.args[0])
      : !1;
  }

  function T(f) {
    var k = f.type,
      p = f.text;
    if (k === aa || (k === ja && "i" !== p)) return !0;
    if ("+" === p || "*" === p) {
      for (p = 0; p < f.args.length; ++p) if (!T(f.args[p])) return !1;
      return !0;
    }
    return "^" === p &&
      ((k = r(f.args[1])),
      (void 0 !== k && (0 === (k & 1) || T(f.args[0]))) ||
        (q(f.args[0]) && T(f.args[1])))
      ? !0
      : "abs" === p
      ? !0
      : -1 !=
        "sin cos tan csc sec cot sinh cosh tanh csch sech coth"
          .split(" ")
          .indexOf(p)
      ? T(f.args[0])
      : !1;
  }

  function ca(f, k) {
    var p = k.length;
    return 0 === p
      ? "+" === f
        ? ma
        : ia
      : 1 === p
      ? k[0]
      : { type: A, text: f, args: k };
  }

  function ha(f, k) {
    if (f.type !== k.type) return f.type < k.type ? -1 : 1;
    var p = f.type;
    if (p === aa) {
      if ("-1" === f.text) return "-1" === k.text ? 0 : -1;
      if ("-1" === k.text) return 1;
    }
    if (f.text !== k.text) return f.text < k.text ? -1 : 1;
    if (p === A) {
      if (f.args.length !== k.args.length)
        return f.args.length < k.args.length ? -1 : 1;
      p = f.args.length;
      for (var B = 0; B < p; ++B) {
        var x = ha(f.args[B], k.args[B]);
        if (0 !== x) return x;
      }
    }
    return 0;
  }

  function wa(f) {
    var k = { type: f.type, text: f.text };
    if (f.type === A) {
      k.op = f.op;
      var p = f.args.length;
      k.args = Array(p);
      for (var B = 0; B < p; ++B) k.args[B] = wa(f.args[B]);
    }
    return k;
  }

  function da(f, k) {
    if (f.type !== A) return f;
    var p = f.text,
      B = f.args.length,
      x = Array(B);
    delete f.numericalAndNonNumericalFactors;
    delete f.baseAndExponent;
    for (var h = 0; h < B; ++h) x[h] = da(f.args[h], k);
    if ("+" === p || "*" === p) {
      var K = "+" === p;
      f = K ? ma : ia;
      if (0 === B) return f;
      if (1 === B) return x[0];
      if (K) {
        for (h = 0; h < B; ++h) {
          var u = x[h];
          u.numericalAndNonNumericalFactors = E(u);
        }
        x.sort(function (g, l) {
          var J = ha(
            g.numericalAndNonNumericalFactors[1],
            l.numericalAndNonNumericalFactors[1]
          );
          return 0 !== J
            ? J
            : ha(
                g.numericalAndNonNumericalFactors[0],
                l.numericalAndNonNumericalFactors[0]
              );
        });
      } else {
        for (h = 0; h < B; ++h)
          (u = x[h]), (u.baseAndExponent = "^" === u.text ? u.args : [u, ia]);
        x.sort(function (g, l) {
          var J = ha(g.baseAndExponent[0], l.baseAndExponent[0]);
          return 0 !== J ? J : ha(g.baseAndExponent[1], l.baseAndExponent[1]);
        });
      }
      for (h = 0; h < B; ++h)
        if (x[h].text === f.text) {
          var S = x.slice(0, h);
          for (K = h + 1; K < B; ++K) x[K].text !== f.text && S.push(x[K]);
          return da(ca(p, S), k);
        }
      if (K) {
        S = u = 0;
        f = {};
        K = !1;
        for (h = 0; h < B; ++h) {
          var X = x[h],
            a = Z(X);
          if (void 0 !== a) {
            X = a[0];
            a = a[1];
            if (0 === u) (u = X), (S = a);
            else {
              if (a === S) u += X;
              else {
                var d = e(S, a);
                if (void 0 === d) break;
                u *= d / S;
                u += (d / a) * X;
                S = d;
              }
              if (!c(u) || !c(S)) break;
              X = z(u, S);
              1 !== X && ((u /= X), (S /= X));
              K = !0;
            }
            f[h] = !0;
          }
        }
        if (K && h === B) {
          S = [na(u, S)];
          for (h = 0; h < B; ++h) h in f || S.push(x[h]);
          return da(ca("+", S), k);
        }
        u = x[0];
        f = {};
        K = !1;
        for (h = 1; h < B; ++h)
          (X = x[h]),
            "1" !== X.numericalAndNonNumericalFactors[1].text &&
            0 ===
              ha(
                X.numericalAndNonNumericalFactors[1],
                u.numericalAndNonNumericalFactors[1]
              )
              ? ("+" === u.numericalAndNonNumericalFactors[0].text
                  ? u.numericalAndNonNumericalFactors[0].args.push(
                      X.numericalAndNonNumericalFactors[0]
                    )
                  : (u.numericalAndNonNumericalFactors[0] = {
                      type: A,
                      text: "+",
                      args: [
                        u.numericalAndNonNumericalFactors[0],
                        X.numericalAndNonNumericalFactors[0],
                      ],
                    }),
                (K = f[h] = !0))
              : (u = X);
        if (K) {
          S = [];
          for (h = 0; h < B; ++h)
            h in f ||
              S.push({
                type: A,
                text: "*",
                args: x[h].numericalAndNonNumericalFactors,
              });
          return da(ca("+", S), k);
        }
      } else {
        for (h = 0; h < B; ++h)
          if ("0" === x[h].text) {
            f = x.slice();
            f.splice(h, 1);
            try {
              Ha(wa(ca("*", f)), !0);
            } catch (g) {
              break;
            }
            return ma;
          }
        for (h = 0; h < B && "-1" === x[h].text; ) ++h;
        if (1 < h)
          return x.splice(0, 0 === (h & 1) ? h : h - 1), da(ca("*", x), k);
        a = 0;
        K = 1;
        d = 0;
        u = 1;
        f = {};
        for (h = "-1" === x[0].text ? 1 : 0; h < B; ++h)
          if (((S = x[h]), (X = r(S)), void 0 !== X)) {
            K *= X;
            if (!c(K)) break;
            f[h] = !0;
            ++a;
          } else if (
            "^" === S.text &&
            "-1" === S.args[1].text &&
            void 0 !== (X = r(S.args[0]))
          ) {
            u *= X;
            if (0 === X || !c(u)) break;
            f[h] = !0;
            ++d;
          }
        if (h === B && ((X = z(K, u)), 1 !== X || 1 < a || 1 < d)) {
          K /= X;
          u /= X;
          S = [];
          1 !== K && S.push(N(K));
          1 !== u && S.push({ type: A, text: "^", args: [N(u), la] });
          for (h = 0; h < B; ++h) h in f || S.push(x[h]);
          return da(ca("*", S), k);
        }
        u = x[0];
        f = {};
        K = !1;
        for (h = 1; h < B; ++h)
          "0" !== u.baseAndExponent[0].text &&
            ((S = x[h]),
            0 === ha(S.baseAndExponent[0], u.baseAndExponent[0])
              ? ("+" === u.baseAndExponent[1].text
                  ? u.baseAndExponent[1].args.push(S.baseAndExponent[1])
                  : (u.baseAndExponent[1] = {
                      type: A,
                      text: "+",
                      args: [u.baseAndExponent[1], S.baseAndExponent[1]],
                    }),
                (K = f[h] = !0))
              : (u = S));
        if (K) {
          S = [];
          for (h = 0; h < B; ++h)
            h in f ||
              S.push({ type: A, text: "^", args: x[h].baseAndExponent });
          return da(ca("*", S), k);
        }
      }
      K = !1;
      for (h = 0; h < B; ++h)
        if (x[h].text === p) {
          f = x[h];
          x[h] = f.args[0];
          u = f.args.length;
          for (K = 1; K < u; ++K) x.push(f.args[K]);
          K = !0;
        }
      if (K) return da({ type: A, text: p, args: x }, k);
    } else {
      if ("~" === p) return { type: A, text: "*", args: [la, x[0]] };
      if ("/" === p) {
        p = x[0];
        x = x[1];
        p = "*" === p.text ? p.args : [p];
        B = "*" === x.text ? x.args : [x];
        f = p.length;
        K = B.length;
        x = Array(f + K);
        for (h = 0; h < f; ++h) x[h] = p[h];
        for (h = 0; h < K; ++h)
          x[f + h] = { type: A, text: "^", args: [B[h], la] };
        return da({ type: A, text: "*", args: x }, k);
      }
      if ("^" === p) {
        f = x[0];
        B = x[1];
        h = r(B);
        if ("*" === f.text && void 0 !== h) {
          p = f.args;
          f = p.length;
          for (h = 0; h < f; ++h)
            x[h] = { type: A, text: "^", args: [p[h], B] };
          return da({ type: A, text: "*", args: x }, k);
        }
        K = r(f);
        if (k && 0 === K && 0 >= h) throw void 0;
        if (0 !== K && 0 === h) return ia;
        if (1 === h) return f;
        if (0 === K && 0 !== h && q(B)) return ma;
        if (1 === K) return ia;
        if ("^" === f.text && void 0 !== h)
          return da(
            {
              type: A,
              text: "^",
              args: [f.args[0], { type: A, text: "*", args: [B, f.args[1]] }],
            },
            k
          );
        if (-1 === K && void 0 !== h) return 0 === (h & 1) ? ia : la;
        k = Z(B);
        if (-1 === K && void 0 !== k && 2 === k[1]) {
          k = k[0] & 3;
          0 > k && (k += 4);
          if (1 === k) return V;
          if (3 === k) return O;
        }
        if ("i" === f.text && void 0 !== h) {
          k = h & 3;
          0 > k && (k += 4);
          if (0 === k) return ia;
          if (1 === k) return V;
          if (2 === k) return la;
          if (3 === k) return O;
        }
        if (
          void 0 !== K &&
          void 0 !== h &&
          0 !== h &&
          ((k = Math.pow(K, Math.abs(h))), c(k))
        )
          return (
            (k = N(k)),
            0 > h &&
              (k = {
                type: A,
                text: "^",
                args: [k, la],
              }),
            k
          );
      } else if ("abs" === p) {
        if ("-1" === x[0].text) return ia;
        if (q(x[0])) return x[0];
        if ("*" === x[0].text) {
          p = x[0].args;
          f = p.length;
          x = Array(f);
          for (h = 0; h < f; ++h) x[h] = { type: A, text: "abs", args: [p[h]] };
          return da({ type: A, text: "*", args: x }, k);
        }
        if ("^" === x[0].text && r(x[0].args[1]) & 1)
          return {
            type: A,
            text: "^",
            args: [
              { type: A, text: "abs", args: [x[0].args[0]] },
              x[0].args[1],
            ],
          };
      } else {
        if ("log" === p)
          return da(
            {
              type: A,
              text: "/",
              args: [
                { type: A, text: "ln", args: [x[1]] },
                { type: A, text: "ln", args: [x[0]] },
              ],
            },
            k
          );
        if ("ln" === p) {
          if ("e" === x[0].text) return ia;
          if ("^" === x[0].text && "e" === x[0].args[0].text)
            return x[0].args[1];
          if ("1" === x[0].text) return ma;
          if (k && "0" === x[0].text) throw void 0;
        }
      }
    }
    return { type: A, text: p, args: x };
  }

  if (null === b) return b;
  for (
    var ma = N(0),
      ia = N(1),
      la = N(-1),
      V = { type: ja, text: "i" },
      O = {
        type: A,
        text: "*",
        args: [la, { type: ja, text: "i" }],
      };
    ;

  ) {
    var qa = b;
    b = da(b, w);
    if (0 === ha(b, qa)) return b;
  }
}

function U(b) {
  var d = C();
  if (d) {
    var e = d[Pb[b]];
    if ("function" === typeof e)
      return e.apply(d, Array.prototype.slice.call(arguments, 1));
  }
}

function t() {
  for (var b = {}, d = 0; d < arguments.length; ++d)
    for (var e in arguments[d].varsUsed) b[e] = !0;
  delete b["?"];
  d = [];
  for (e in b) d.push(e);
  return d.sort();
}

function r() {
  if (!C())
    try {
      var b = ag_refreshAds();
      b &&
        ga("send", "event", "Ads", "Refresh", void 0, b, {
          nonInteraction: !0,
        });
    } catch (d) {}
}

function A(b, d) {
  try {
    localStorage.setItem(b, d);
  } catch (e) {}
}

function ka(b, d) {
  try {
    return localStorage.getItem(b);
  } catch (e) {
    return d;
  }
}

function I(b) {
  b = $(b);
  b.hasClass("shadow-pulse") ||
    (b.addClass("shadow-pulse"),
    setTimeout(function () {
      b.removeClass("shadow-pulse");
    }, 600));
  return b;
}

function G(b) {
  xa();
  var d = $("#tabs .active"),
    e = $("#pages .active"),
    m = $("#tab-" + b),
    v = $("#page-" + b);
  (d.is(m) && e.is(v)) ||
    (d.removeClass("active"),
    e.removeClass("active"),
    e.hide(),
    (d = function () {
      m.addClass("active");
      v.addClass("active");
      v.fadeTo(250, 1);
    }),
    "examples" != b || mb
      ? d()
      : ((mb = !0), MathJax.Hub.Queue(["Typeset", MathJax.Hub, v[0]], d)),
    "practice" == b &&
      null == Aa &&
      ((generatedProblemPreviewFormulaMaxHeight = $(
        "#generated-problem table"
      ).height()),
      nb(!1),
      setInterval(function () {
        Ea && ob();
      }, 100)),
    ga("send", "event", "Calculator", "Activate tab", b));
}

function J() {
  ya = !1;
  $("#go").prop("disabled", !1);
}

function R(b) {
  r();
  b
    ? (P.initiatedByChooseAlternative = !0)
    : (delete P.initiatedByChooseAlternative, delete P.autoScrollTo);
  C() || (P.secondsSinceFirstQuery = Math.round((new Date() - Qb) / 1e3));
  lastAjaxQueryJSON = JSON.stringify(P);
  lastAjaxQueryTime = new Date().toUTCString();
  for (b = Ya; b < Opentip.tips.length; ++b)
    try {
      Opentip.tips[b].deactivate();
    } catch (d) {}
  Opentip.tips = Opentip.tips.slice(0, Ya);
  plotVariables = {};
  plotFunctions = {};
  setPlotFuncUseComplexMode(P.complexMode);
  ya = !0;
  $("#go").prop("disabled", !0);
  C()
    ? U(Jb)
    : setTimeout(function () {
        var d = Rb();
        setTimeout(function () {
          $("#result").addClass("hidden").fadeTo(250, 0);
          $("#loading-icon").fadeTo(250, 1);
          $("#result-text").html(L.resultTextWait);
        }, d);
      }, 250);
  setTimeout(
    function () {
      $.ajax(null == ha ? "int.php" : "checkanswer.php", {
        type: "POST",
        data: { q: lastAjaxQueryJSON, v: pageVersion },
      })
        .done(function (q) {
          if (C()) {
            var a = q.match(/\bdata-message-tag\s*=\s*['"]([^'"]*)['"]/);
            if (a) {
              a = a[1];
              if ("reload_page" === a) {
                U(kb);
                return;
              }
              if ("maintenance" === a) {
                U(Nb);
                return;
              }
              if ("server_busy" === a) {
                U(Ob);
                return;
              }
            }
            a = (a =
              q.match(
                /\bid\s*=\s*['"]share-calculation-button['"]\s*href\s*=\s*['"][^#'"]*#([^'"]*)['"]/
              ) ||
              q.match(
                /\bhref\s*=\s*['"][^#'"]*#([^'"]*)['"]\s*id\s*=\s*['"]share-calculation-button['"]/
              ))
              ? a[1]
              : null;
            var l = /\bcalc-error\b/.test(q);
            U(Lb, a, l);
          }
          $("#result").html(q);
          C() &&
            C().version < ja.latestAppVersion &&
            Date.now() >= ja.latestAppVersionWarnFrom &&
            $("#result").prepend(
              T('<div id="old-app-version-hint">#{oldAppVersionHint}</div>', L)
            );
          "1" === ka("disableIconExplanation") &&
            ($("#icon-explanation").remove(),
            ga(
              "send",
              "event",
              "Icon explanation",
              "Suppress",
              void 0,
              void 0,
              { nonInteraction: !0 }
            ));
          $("#result script").remove();
          Xa && M();
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, $("#result")[0]], Sb, J);
        })
        .fail(function (q, a, l) {
          U(Kb, a, l || "");
          $("#loading-icon").fadeTo(250, 0);
          $("#result-text").html(L.resultTextError);
          alert(T("#{error_ajax}\n#{errorThrown}", L, { errorThrown: l }));
          J();
        });
      var d = [],
        e;
      for (e in P) {
        var m = P[e];
        if (
          "secondsSinceFirstQuery" !== e &&
          "expressionCanonical" !== e &&
          "lowerBoundCanonical" !== e &&
          "upperBoundCanonical" !== e &&
          "userAnswerCanonical" !== e &&
          "initiatedByChooseAlternative" !== e &&
          "autoScrollTo" !== e
        )
          if ("alternatives" === e) {
            var v = [],
              x;
            for (x in m) v.push(x + "=" + m[x]);
            v.length && d.push(e + ": [" + v.join(",") + "]");
          } else (m = "" + m), "" !== m && d.push(e + ": " + m);
      }
      Za = d.join(", ");
      P.initiatedByChooseAlternative ||
        ga(
          "send",
          "event",
          "Calculator",
          null == ha ? "Integrate" : "Check answer",
          Za
        );
    },
    C() ? 0 : 1e3
  );
}

function M() {
  $(".user-input-latex").each(function () {
    var b = $(this).text();
    (b = b.substring(b.indexOf("$") + 1, b.lastIndexOf("$"))) &&
      -1 === b.indexOf("$") &&
      N(b) !== N(Xa) &&
      $(T('<div class="calc-info">#{expressionChanged}</div>', L)).insertAfter(
        $(this)
      );
  });
}

function N(b) {
  return b.replace(/\\,|\\cdot|\{\s*(\\,|\\cdot)\s*\}/g, "").replace(/\s/g, "");
}

function ba() {
  C()
    ? (U(Mb), D())
    : setTimeout(function () {
        $("#loading-icon").fadeTo(250, 0);
        $("#result").removeClass("hidden").fadeTo(250, 1);
        setTimeout(function () {
          var b = $("#result-text").html(L.resultTextDone);
          b = $(b);
          for (var d = 0; 3 > d; ++d) b = b.fadeTo(100, 0.5).fadeTo(100, 1);
        }, 250);
        D();
      }, 1e3);
}

function Y() {
  for (var b = 0; b < Opentip.tips.length; ++b)
    try {
      Opentip.tips[b].hide();
    } catch (d) {}
}

function Z() {
  var b = $("#manual-steps"),
    d = $("#manual .show-steps-button"),
    e = !b.is(":visible");
  e
    ? (d.text(L.hideStepsLinkText), $a.deactivate())
    : (d.text(L.showStepsLinkText), $a.activate());
  b.toggle();
  if (e) {
    var m = $("#manual-steps-body");
    m.is(".rendered") ||
      (MathJax.Hub.Queue(["Typeset", MathJax.Hub, m[0]], function () {
        $("#steps-loading-icon").hide();
        m.show().removeClass("hidden").addClass("rendered");
        Y();
      }),
      P.initiatedByChooseAlternative &&
        MathJax.Hub.Queue(
          (function (v) {
            return function () {
              $("html, body").animate({ scrollTop: v }, 250);
            };
          })(P.autoScrollTo)
        ),
      ga("send", "event", "Calculator", "Show steps", Za));
  }
}

function na(b) {
  P.strictMode != b && ((P.strictMode = b), (P.alternatives = {}), R(!0));
}

function D() {
  var b = $("#manual");
  if (b.length) {
    var d = b.data("key"),
      e = {
        secondsSinceFirstQuery: P.secondsSinceFirstQuery,
        expression: b.data("expression").toString(),
        expressionCanonical: b.data("expression-canonical").toString(),
        intVar: b.data("int-var"),
        complexMode: b.data("complex-mode"),
        keepDecimals: b.data("keep-decimals"),
        alternatives: P.alternatives,
        f: b.data("f"),
        shareURL: Va,
        maximaFoundAnElementaryAntiderivative: !!$(
          "#maxima-found-an-elementary-antiderivative"
        ).length,
      };
    b = b.data("c");
    "string" === typeof b && 1 <= b.length && (e.c = b);
    e = JSON.stringify(e);
    $.ajax("manualint.php", {
      type: "POST",
      data: { q: e, v: pageVersion },
    })
      .done(function (m) {
        if (C() && -1 !== m.indexOf("reload-page-button")) U(kb);
        else if ($("#manual").data("key") == d) {
          $("#manual-loading-icon").after(m);
          $("#manual script").remove();
          MathJax.Hub.Queue([
            "Typeset",
            MathJax.Hub,
            $("#manual-antiderivative")[0],
          ]);
          $("#manual-assumptions").length &&
            MathJax.Hub.Queue([
              "Typeset",
              MathJax.Hub,
              $("#manual-assumptions")[0],
            ]);
          MathJax.Hub.Queue(function () {
            $("#manual-antiderivative, #manual-assumptions").show();
          });
          if ("undefined" != typeof stepsExportsData) {
            for (var v in stepsExportsData)
              exportsData[v] = stepsExportsData[v];
            stepsExportsData = void 0;
          }
          if ("undefined" != typeof stepsCheckAnswerData) {
            for (v in stepsCheckAnswerData)
              checkAnswerData[v] = stepsCheckAnswerData[v];
            stepsCheckAnswerData = void 0;
          }
          $("#manual .show-steps-button").click(function (a) {
            a.preventDefault();
            Z();
          });
          $("#manual .enable-strict-mode-button").click(function (a) {
            a.preventDefault();
            na(!0);
          });
          $("#manual .disable-strict-mode-button").click(function (a) {
            a.preventDefault();
            na(!1);
          });
          $("#manual .export-button a").click(function (a) {
            a.preventDefault();
            sb($(this).data("key"));
          });
          $("#manual .check-answer-button a").click(function (a) {
            a.preventDefault();
            tb($(this).data("key"));
          });
          $("#manual .alternative-button").click(function (a) {
            a.preventDefault();
            Ca();
            a = $(this).data("key");
            var l = $(this).data("value"),
              p = $(this).data("dependencies");
            if (!ya) {
              0 == a && (P.alternatives = {});
              for (var k = 0; k < p.length; ++k) delete P.alternatives[p[k]];
              P.alternatives[a] = l;
              P.autoScrollTo =
                $("html").prop("scrollTop") || $("body").prop("scrollTop");
              R(!0);
            }
          });
          $("#manual .reset-alternatives-button").click(function (a) {
            a.preventDefault();
            ya ||
              ((P.alternatives = {}),
              (P.autoScrollTo =
                $("html").prop("scrollTop") || $("body").prop("scrollTop")),
              R(!0));
          });
          $("#manual .show-steps-button").each(function (a, l) {
            $a = ia(l, L.showStepsLinkTooltip);
          });
          $("#manual .enable-strict-mode-button").each(function (a, l) {
            ia(l, L.enableStrictModeLinkTooltip);
          });
          $("#manual .disable-strict-mode-button").each(function (a, l) {
            ia(l, L.disableStrictModeLinkTooltip);
          });
          $("#manual .export-button a").each(function (a, l) {
            ia(l, L.exportLinkTooltip);
          });
          $("#manual .check-answer-button a").each(function (a, l) {
            ia(l, L.checkAnswerLinkTooltip);
          });
          $("#manual .alternative-button").each(function (a, l) {
            ia(l, L.chooseAlternativeLinkTooltip);
          });
          $(
            "#manual .show-steps-button, #manual .enable-strict-mode-button, #manual .disable-strict-mode-button, #manual .export-button a, #manual .check-answer-button a, #manual .alternative-button, #manual .reset-alternative-button"
          ).contextmenu(function (a) {
            a.preventDefault();
          });
          if (
            "undefined" != typeof X &&
            "undefined" != typeof stepsPlotFunctions
          ) {
            for (v in stepsPlotFunctions)
              (plotFunctions[v] = stepsPlotFunctions[v]),
                X.functions.push(stepsPlotFunctions[v]);
            ub(!1);
            Ga(!1);
            stepsPlotFunctions = void 0;
            MathJax.Hub.Queue([
              "Typeset",
              MathJax.Hub,
              $("#plot-toolboxes")[0],
            ]);
          }
          if (
            "undefined" != typeof stepsDefinitions &&
            $(".calc-look-up-definition").length
          ) {
            m = $(".calc-look-up-definition").html();
            v = "";
            for (var x = 0; x < stepsDefinitions.length; ++x) {
              var q = stepsDefinitions[x];
              -1 == m.indexOf(q.url) &&
                (v += ", $\\href{" + q.url + "}{" + q.latex + "}$");
            }
            "" != v &&
              ($("#steps-definitions").html(v),
              MathJax.Hub.Queue(
                ["Typeset", MathJax.Hub, $("#steps-definitions")[0]],
                function () {
                  $("#steps-definitions").show();
                }
              ));
            stepsDefinitions = void 0;
          }
          P.initiatedByChooseAlternative &&
            $("#manual .show-steps-button").click();
          "" != P.lowerBound.trim() &&
            "" != P.upperBound.trim() &&
            $("#manual-antiderivative .export-button");
        }
      })
      .fail(function (m, v, x) {
        $("#manual").data("key") == d &&
          ($("#manual-result").html(L.resultTextError).show(),
          alert(T("#{error_ajax}\n#{errorThrown}", L, { errorThrown: x })));
      })
      .always(function () {
        $("#manual").data("key") == d && $("#manual-loading-icon").hide();
      });
  }
}

function ca(b) {
  var d = $(
      "#calc div.calc-content div.calc-math span.MathJax, #calc div.calc-content div.calc-math span.MathJax_CHTML, #calc div.calc-content div.calc-math span.MathJax_SVG"
    ),
    e = parseInt(d.css("font-size"));
  isNaN(e) ||
    ((e += b), 8 > e && (e = 8), 32 < e && (e = 32), d.css("font-size", e));
}

function ua(b, d) {
  void 0 === d && (d = {});
  try {
    var e = parseExpression(b),
      m;
    for (m in e.varsUsed) if (!(m in d)) return NaN;
    return eval(
      "(function(mainVar) { return " + printPlotFunc(e, plotMainVar) + "; })"
    )(oa);
  } catch (v) {
    return NaN;
  }
}

function Ga(b) {
  b && (oa = ua($("#plot-table-of-values-main-var").val(), plotVariables));
  if (isFinite(oa)) {
    var d = 1;
    $.each(plotFunctions, function (e, m) {
      e = L.plot_toolboxTableOfValuesError;
      try {
        var v = m.func(oa);
        if (isFinite(v))
          for (m = 8; 1 < m && !((e = Ia(v, m, !1)), 8 >= e.length); --m);
      } catch (x) {}
      $("#plot-table-of-values-" + d++).val(e);
    });
    isFinite(oa)
      ? ((X.centerX = oa), (X.highlightX = oa))
      : (X.highlightX = void 0);
    X.plotDirty = !0;
  } else Ha();
}

function ub(b) {
  b && (oa = NaN);
  var d = $("#plot-toolbox-toggle table"),
    e = 1;
  $.each(plotFunctions, function (a, l) {
    var p = $("<input>")
      .attr({
        id: "plot-toggle-" + e++,
        type: "checkbox",
      })
      .prop("checked", !0)
      .change(function (n) {
        l.enabled = $(this).prop("checked");
        X.plotDirty = !0;
      });
    if (!$("#" + p.attr("id")).length) {
      var k = $("<tr>");
      k.append($("<th>").append(p));
      k.append(
        $("<td>").append(
          $("<label>").attr("for", p.attr("id")).css("color", l.color).html(a)
        )
      );
      d.append(k);
    }
  });
  var m = $("#plot-toolbox-variables");
  if ($.isEmptyObject(plotVariables)) m.remove();
  else {
    var v = $("#plot-toolbox-variables table");
    $.each(plotVariables, function (a, l) {
      l = $("<input>")
        .attr({
          id: "plot-variable-" + a,
          type: "text",
          spellcheck: "false",
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
        })
        .addClass("round text")
        .val(l)
        .on("input", function (n) {
          isFinite((plotVariables[a] = ua($(this).val())))
            ? ($(this).removeClass("invalid-number"), Ga(!0))
            : ($(this).addClass("invalid-number"), Ha());
        });
      if (!$("#" + l.attr("id")).length) {
        var p = $("<tr>"),
          k = "C" == a ? a : printLatex(parseExpression(a));
        p.append(
          $("<th>").append(
            $("<label>")
              .attr("for", l.attr("id"))
              .html("$" + k + "$ =")
          )
        );
        p.append($("<td>").append(l));
        v.append(p);
      }
    });
  }
  $("#plot-toolbox-table-of-values");
  var x = $("#plot-toolbox-table-of-values table");
  if (!$("#plot-table-of-values-main-var").length) {
    m = $("<input>")
      .attr({
        id: "plot-table-of-values-main-var",
        type: "text",
        spellcheck: "false",
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
      })
      .addClass("round text")
      .on("input", function (a) {
        a = $(this).val();
        "" == a.trim()
          ? ((oa = NaN), $(this).removeClass("invalid-number"), Ha())
          : isFinite((oa = ua(a, plotVariables)))
          ? ($(this).removeClass("invalid-number"), Ga(!1))
          : ($(this).addClass("invalid-number"), Ha());
      });
    var q = $("<tr>");
    q.append(
      $("<th>").append(
        $("<label>")
          .attr("for", m.attr("id"))
          .html("$" + printLatex(parseExpression(plotMainVar)) + "$ =")
      )
    );
    q.append($("<td>").append(m));
    x.append(q);
  }
  e = 1;
  $.each(plotFunctions, function (a, l) {
    var p = $("<input>")
      .attr({
        id: "plot-table-of-values-" + e++,
        type: "text",
        disabled: !0,
        spellcheck: "false",
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
      })
      .addClass("round text");
    if (!$("#" + p.attr("id")).length) {
      var k = $("<tr>");
      k.append(
        $("<th>").append(
          $("<label>")
            .attr("for", p.attr("id"))
            .html(a + " =")
            .css("color", l.color)
        )
      );
      k.append($("<td>").append(p));
      x.append(k);
    }
  });
  b &&
    ((X.ticsFormattingFunction = Ia),
    $("#plot-zoom-mode-uniform").click(function () {
      X.enableScaleX = !0;
      X.enableScaleY = !0;
    }),
    $("#plot-zoom-mode-horizontal").click(function () {
      X.enableScaleX = !0;
      X.enableScaleY = !1;
    }),
    $("#plot-zoom-mode-vertical").click(function () {
      X.enableScaleX = !1;
      X.enableScaleY = !0;
    }),
    $("#plot-zoom-equalize-button")
      .click(function (a) {
        a.preventDefault();
        a = Math.sqrt(X.scaleX * X.scaleY);
        X.scaleX = a;
        X.scaleY = a;
        X.plotDirty = !0;
        $("#plot-zoom-mode-uniform").click();
      })
      .contextmenu(function (a) {
        a.preventDefault();
      }),
    (ab = bb = void 0),
    setInterval(function () {
      bb != X.centerX &&
        ($("#plot-cross-coordinates-x").text(Ia(X.centerX)), (bb = X.centerX));
      ab != X.centerY &&
        ($("#plot-cross-coordinates-y").text(Ia(X.centerY)), (ab = X.centerY));
    }, 100),
    $("#plot-cross-coordinates-x")
      .click(function (a) {
        a.preventDefault();
        $("#plot-table-of-values-main-var").val(
          $("#plot-cross-coordinates-x").text()
        );
        Ga(!0);
        E &&
          ($("html, body").animate(
            {
              scrollTop: $("#plot-toolbox-table-of-values").offset().top - 1,
            },
            250
          ),
          setTimeout(function () {
            $("#plot-toolbox-table-of-values").removeClass("collapsed");
          }, 500));
      })
      .contextmenu(function (a) {
        a.preventDefault();
      }),
    E &&
      ($(".plot-toolbox:not(#plot-toolbox-toggle)").addClass("collapsed"),
      $(".plot-toolbox > p:first-child")
        .wrap("<a></a>")
        .click(function (a) {
          a.preventDefault();
          $(this).parents(".plot-toolbox").toggleClass("collapsed");
        })
        .contextmenu(function (a) {
          a.preventDefault();
        })));
}

function Ia(b, d, e) {
  void 0 === d && (d = 6);
  void 0 === e && (e = !0);
  b = b.toPrecision(d);
  e &&
    -1 !== b.indexOf(".") &&
    ((e = b.split("e")),
    (e[0] = e[0].replace(/0+$/, "").replace(/\.$/, "")),
    (b = e.join("e")));
  return b;
}

function Sb() {
  $("#share-calculation-button").click(function (d) {
    var e = $(this).prop("href");
    d.preventDefault();
    ga("send", "event", "Calculator", "Share", e);
    ja.prompt(L.copyToClipboard, e);
  });
  $("#formula-zoom-in-button").click(function (d) {
    d.preventDefault();
    ca(4);
  });
  $("#formula-zoom-out-button").click(function (d) {
    d.preventDefault();
    ca(-4);
  });
  $("#icon-explanation-close > a").click(function (d) {
    d.preventDefault();
    Tb();
  });
  $(".export-button a").click(function (d) {
    d.preventDefault();
    sb($(this).data("key"));
  });
  $(".check-answer-button a").click(function (d) {
    d.preventDefault();
    tb($(this).data("key"));
  });
  $(".simplify-button").click(function (d) {
    d.preventDefault();
    Ca();
    ya || ((P.simplifyExpressions = !0), R());
  });
  $(".numerical-only-button").click(function (d) {
    d.preventDefault();
    Ca();
    ya || ((P.numericalOnly = !0), R());
  });
  cb();
  $(
    "#formula-zoom-in-button, #formula-zoom-out-button, #icon-explanation-close > a, .export-button a, .check-answer-button a, .simplify-button, .numerical-only-button"
  ).contextmenu(function (d) {
    d.preventDefault();
  });
  $("#share-calculation-button").each(function (d, e) {
    ia(e, L.shareThisCalculation);
  });
  $("#formula-zoom-in-button").each(function (d, e) {
    ia(e, L.formulaZoom);
  });
  $("#formula-zoom-out-button").each(function (d, e) {
    ia(e, L.formulaZoom);
  });
  $(".export-button a").each(function (d, e) {
    ia(e, L.exportLinkTooltip);
  });
  $(".check-answer-button a").each(function (d, e) {
    ia(e, L.checkAnswerLinkTooltip);
  });
  $(".simplify-button").each(function (d, e) {
    ia(e, L.simplifyLinkTooltip);
  });
  $(".numerical-only-button").each(function (d, e) {
    ia(e, L.numericalOnlyLinkTooltip);
  });
  Va = $("#share-calculation-button").prop("href");
  if ($.isEmptyObject(plotFunctions)) ba();
  else
    try {
      var b = $("#plot-canvas");
      X = new Ploddah(b[0], { enableKeyboard: !E });
      $.each(plotFunctions, function (d, e) {
        X.functions.push(e);
      });
      ub(!0);
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, $("#plot-toolboxes")[0]], ba);
    } catch (d) {
      $("#plot").addClass("warning").text(L.plot_notSupported), ba();
    }
}

function Ja(b) {
  return eval('(function(){return "' + b + '";})');
}

function db() {
  Ra = !0;
}

function vb() {
  var b = Ja("begin").toString(),
    d = Ja("end").toString();
  try {
    for (var e = MathJax.Hub.queue.queue, m = 0; m < e.length; ++m) {
      var v = e[m].toString();
      if (v == b) {
        for (var x = m + 1; e[x].toString() != d; ) e[x++] = db;
        m = x + 1;
      } else if (v == d) for (x = 0; x < m; ++x) e[x] = db;
    }
  } catch (q) {}
}

function wb(b) {
  var d = b;
  b = b
    .trim()
    .replace(/\\infty\b/g, "inf")
    .toLowerCase();
  if ("minf" == b) return b;
  if ("" != b) {
    var e = b,
      m = "inf";
    "+" == b[0]
      ? (e = b.substring(1).trim())
      : -1 != "-\u2010\u2012\u2013\u2014\u2015\u2212".indexOf(b[0]) &&
        ((m = "minf"), (e = b.substring(1).trim()));
    if ("\u221e" == e || "inf" == e || e == L.infinite || e == L.infinity)
      return m;
  }
  return parseExpression(d);
}

function Ka(b) {
  return "inf" == b ? "\\infty" : "minf" == b ? "-\\infty" : printLatex(b);
}

function rb(b) {
  return b
    .replace(/[\u00c4\u00c1\u00c0\u00c2]/g, "A")
    .replace(/[\u00e4\u00e1\u00e0\u00e2]/g, "a")
    .replace(/[\u00c9\u00c8\u00ca]/g, "E")
    .replace(/[\u00e9\u00e8\u00ea]/g, "e")
    .replace(/[\u00cd\u00cc\u00ce]/g, "I")
    .replace(/[\u00ed\u00ec\u00ee]/g, "i")
    .replace(/[\u00d6\u00d3\u00d2\u00d4]/g, "O")
    .replace(/[\u00f6\u00f3\u00f2\u00f4]/g, "o")
    .replace(/[\u00dc\u00da\u00d9\u00db]/g, "U")
    .replace(/[\u00fc\u00fa\u00f9\u00fb]/g, "u");
}

function Na(b) {
  $("#loading").hide();
  if (Da != ma.ERROR) {
    var d = $("#expression-preview td"),
      e = $("#expression-preview-formula"),
      m = $("#expression-preview-formula-mathjax"),
      v = $("#expression-preview-formula-mathjax-buffer");
    if (b) {
      v.children("div").not(":first").remove();
      b = v.children("div");
      if (!b.length) return;
      b.detach();
      m.children().remove();
      m.append(b.children());
      m.removeClass("update-pending");
    }
    e.show();
    e = $("#expression-preview-ruler").width();
    b = $("#expression-preview-formula-mathjax > span").last().width();
    v = m.height();
    var x = e / b,
      q = (fb + gb) / v;
    isFinite(x) && isFinite(q) && 0 < x && 0 < q
      ? ((x = Math.min(x, q, 1.5)),
        m.css(
          "transform",
          "translate(" +
            0.5 * (e - x * b) +
            "px, " +
            0.5 * (fb + gb - x * v) +
            "px) scale(" +
            x +
            ")"
        ),
        d.css({
          "text-align": "left",
          "vertical-align": "top",
        }))
      : (m.css("transform", ""),
        d.css({ "text-align": "", "vertical-align": "" }));
  }
}

function Oa(b, d) {
  var e = 0;
  E &&
    ($("html, body").animate({ scrollTop: $("#menu").offset().top - 1 }, 250),
    (e += 300));
  $("#tab-options").hasClass("active") ||
    (setTimeout(function () {
      G("options");
    }, e),
    (e += 300));
  b &&
    setTimeout(function () {
      var m = $("#" + b);
      m.focus().select();
      I(m);
      d && I($(d));
    }, e);
}

function Ub() {
  $("#int-var-mathjax").click(function () {
    Oa("int-var");
  });
  $("#upper-bound-mathjax").click(function () {
    Oa("upper-bound");
  });
  $("#lower-bound-mathjax").click(function () {
    Oa("lower-bound");
  });
}

function za(b) {
  var d = $(b ? "#prompt" : "#expression");
  b = b = d.offset().top - 1;
  E ||
    ((d = d.parents(".center")),
    (b = Math.max(0, Math.min(b, d.offset().top + d.height() - innerHeight))));
  $("html, body").animate({ scrollTop: b }, 250);
}

function Rb() {
  var b = $("#result-header").offset().top - 1,
    d = $("html").prop("scrollTop") || $("body").prop("scrollTop");
  b = Math.min(500, Math.abs(d - b));
  $("html, body").animate(
    { scrollTop: $("#result-header").offset().top - 1 },
    b
  );
  return b;
}

function ia(b, d) {
  return new Opentip(b, d, void 0, {
    fixed: !0,
    stemBase: 12,
    stemLength: 12,
    tipJoint: E ? "top" : "top left",
    removeElementsOnHide: !0,
  });
}

function Tb() {
  $("#icon-explanation").fadeOut(250, function () {
    $(this).remove();
  });
  A("disableIconExplanation", "1");
  ga("send", "event", "Icon explanation", "Disable");
}

function sb(b) {
  function d(v) {
    m.document.write(v);
  }

  var e = exportsData[b];
  if (e) {
    var m = ja.open(
      "",
      "export",
      "menubar=no,toolbar=no,location=no,personalbar=0,directories=no,status=no,scrollbars=yes,resizable=yes,width=600,height=700,left=" +
        Math.round(screen.width / 2 - 300) +
        ",top=" +
        Math.round(screen.height / 2 - 350)
    );
    if (m) {
      d(
        "<html class='" +
          ($("html").hasClass("dark-mode") ? "dark" : "light") +
          "-mode'>"
      );
      d("<head>");
      d("<title>" + L.exportsWindowTitle + "</title>");
      d('<base href="' + ra.protocol + "//" + ra.host + ra.pathname + '">');
      d($("<div>").append($("head>.static").clone()).html());
      d(
        '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">'
      );
      d(
        '<script type="text/x-mathjax-config">' +
          $("#mathjax-config-script").html() +
          "\x3c/script>"
      );
      d(
        '<script type="text/x-mathjax-config">MathJax.Hub.Config({ skipStartupTypeset: false });\x3c/script>'
      );
      d(
        '<script type="text/javascript" src="' +
          $("#mathjax-script").attr("src") +
          '" async>\x3c/script>'
      );
      d("</head>");
      d('<body class="exports">');
      d("<h1>" + L.exportsWindowTitle + "</h1>");
      d("<p>" + L.exportsWindowIntroduction + "</p>");
      d('<div id="exports-formula">$' + e.latex + "$</div>");
      for (b in e)
        d("<h2>" + L["exportsEntryTitle_" + b] + "</h2>"),
          d("<p>" + L["exportsEntryDescription_" + b] + "</h1>"),
          d("<pre>" + e[b] + "</pre>"),
          d(
            '<p><a class="exports-copy-to-clipboard-button">' +
              L.exportsCopyToClipboard +
              '</a><span class="exports-copy-to-clipboard-message">' +
              L.exportsCopyToClipboardDone +
              "</span></p>"
          );
      d(
        '<script type="text/javascript">(function() { var b = document.getElementsByClassName("exports-copy-to-clipboard-button"); for (var i = 0; i < b.length; ++i) { b[i].addEventListener("click", function(e) { document.getSelection().selectAllChildren(this.parentElement.previousElementSibling); if (document.execCommand("copy")) { document.getSelection().removeAllRanges(); var m = document.getElementsByClassName("exports-copy-to-clipboard-message"); for (var i = 0; i < m.length; ++i) m[i].classList.remove("visible"); var n = this.nextElementSibling; n.classList.add("visible"); setTimeout(function() { n.classList.remove("visible"); }, 1000); } e.preventDefault(); }); b[i].addEventListener("contextmenu", function(e) { e.preventDefault(); e.stopPropagation(); }, true); } })();\x3c/script>'
      );
      d("</body>");
      d("</html>");
      m.document.close();
      Y();
      ga("send", "event", "Calculator", "Export", e.latex);
    }
  }
}

function tb(b) {
  if ((b = checkAnswerData[b])) {
    ha = b;
    Db = P.expression;
    va = null;
    var d =
      ($("html").prop("scrollTop") || $("body").prop("scrollTop")) -
      $("#result").offset().top;
    $("#expression").val("");
    $("#int-var").val(b.mainVar);
    $("#normal-prompt").hide();
    $("#check-answer-prompt, #check-answer-exit").show();
    $("#page-options input:enabled, #page-options select:enabled")
      .prop("disabled", !0)
      .addClass("disabled-for-check-answer");
    $("#page-options label:not(.disabled)").addClass(
      "disabled disabled-for-check-answer"
    );
    $("html, body").prop("scrollTop", d + $("#result").offset().top);
    setTimeout(function () {
      za(!0);
    }, 250);
    setTimeout(function () {
      Pa = !0;
      $("#expression").focus();
    }, 750);
    E &&
      setTimeout(function () {
        za(!0);
      }, 1250);
    Y();
    ga("send", "event", "Calculator", "Enter check answer mode", b.expression);
  }
}

function cb() {
  $("a.external, .external a")
    .filter(function () {
      return !$(this).data("processed");
    })
    .data("processed", !0)
    .click(function (b) {
      ga("send", "event", "External link", "Click", $(this).prop("href"));
    });
}

function Qa(b, d, e) {
  var m = !1;
  try {
    m = b();
  } catch (v) {}
  m
    ? e()
    : setTimeout(function () {
        Qa(b, d, e);
      }, d);
}

function nb(b) {
  if (Ea) {
    $("#practice-include-completing-the-square").prop("checked");
    $("#practice-include-definite-integrals").prop("checked");
    $("#practice-include-exponential-functions").prop("checked");
    $("#practice-include-integration-by-parts").prop("checked");
    $("#practice-include-inv-trig-hyp-functions").prop("checked");
    $("#practice-include-logarithms").prop("checked");
    $("#practice-include-polynomials-and-powers").prop("checked");
    $("#practice-include-rational-functions").prop("checked");
    $("#practice-include-special-functions").prop("checked");
    $("#practice-include-substitution").prop("checked");
    $("#practice-include-tricky-integrals").prop("checked");
    $("#practice-include-trig-hyp-functions").prop("checked");
    for (var d; ; ) {
      d = [printWebsite(parseExpression("x+1")), "1", "2"];
      Aa = d[0];
      ib = d[1];
      jb = d[2];
      var e = parseExpression(Aa),
        m = "+" == e.text;
      d = "\\displaystyle\\int";
      d +=
        "\\limits^{" +
        Ka(parseExpression(jb)) +
        "}_{" +
        Ka(parseExpression(ib)) +
        "}";
      d +=
        " " +
        (m ? "\\left(" : "") +
        printLatex(e) +
        (m ? "\\right)" : "\\,") +
        "\\mathrm{d}x";
      if (!Eb[d]) {
        Eb[d] = !0;
        break;
      }
    }
    var v = $("#generated-problem-mathjax");
    d = v.html("").append($("<script type='math/tex'>").text(d));
    Ea = !1;
    v.css("opacity", 0);
    $("#generated-problem-mathjax").css("transform", "");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, d[0]], function () {
      ob();
      v.css("opacity", "");
      Ea = !0;
    });
    b && ga("send", "event", "Calculator", "Generate problem");
  }
}

function ob() {
  var b = $("#generated-problem-mathjax"),
    d = $("#generated-problem td"),
    e = b.width(),
    m = b.height(),
    v = $("#generated-problem-ruler").width(),
    x = v / e,
    q = generatedProblemPreviewFormulaMaxHeight / m;
  isFinite(x) && isFinite(q) && 0 < x && 0 < q
    ? ((x = Math.min(x, q, 1.5)),
      b.css(
        "transform",
        "translate(" +
          0.5 * (v - x * e) +
          "px, " +
          0.5 * (generatedProblemPreviewFormulaMaxHeight - x * m) +
          "px) scale(" +
          x +
          ")"
      ),
      d.css({
        "text-align": "left",
        "vertical-align": "top",
      }))
    : (b.css("transform", ""),
      d.css({ "text-align": "", "vertical-align": "" }));
}

L = {
  about: "About",
  aboutText:
    '<p><strong>The Integral Calculator lets you calculate integrals and antiderivatives of functions online &mdash; for free!</strong></p><p>Our calculator allows you to check your solutions to calculus exercises. It helps you practice by showing you the full working (step by step integration). All common integration techniques and even special functions are supported.</p><p>The Integral Calculator supports definite and indefinite integrals (antiderivatives) as well as integrating functions with many variables. You can also check your answers! Interactive graphs/plots help visualize and better understand the functions.</p><p>For more about how to use the Integral Calculator, go to "<em>Help</em>" or take a look at the examples.</p><p>And now: Happy integrating!</p>',
  abs: "abs",
  additionalInvTrigHypPrefixes: "arco",
  advertisement: "Advertisement",
  alsoVisit:
    "Also check the <strong><a href='//www.derivative-calculator.net/'>Derivative Calculator<img src='layout/derivative-calculator.png' width='47' height='47'></a></strong>!<br><span><strong><a href='//www.calculadora-de-integrales.com/'><img src='layout/lang-es.png'>Calculadora de Integrales</a></strong> en español<br><strong><a href='//www.integralrechner.de/'><img src='layout/lang-de.png'>Integralrechner</a></strong> auf Deutsch<br><strong><a href='//www.integral-calculator.ru/'><img src='layout/lang-ru.png'>Калькулятор Интегралов</a></strong> на Русском</span>",
  "alternatives_+": "plus",
  "alternatives_-": "minus",
  "alternatives_*": "times",
  "alternatives_/": "over",
  "alternatives_^": "to the",
  alternatives_abs: "absolute,absolute value",
  alternatives_cbrt: "cuberoot,cbroot,cube root",
  alternatives_dilog: "dilogarithm",
  alternatives_exp: "exponential",
  alternatives_log: "logarithm",
  alternatives_pow: "power",
  alternatives_root: "radical",
  alternatives_sqrt: "squareroot,sqroot,square root",
  alternativesInfo:
    "<strong>Alternative steps chosen:</strong><br>The alternatives that you have chosen are being respected while showing the steps. In order to reset the alternatives and show the original steps, click the following button.",
  ambiguousOperator:
    '"#{o}" is ambiguous. Possible interpretations: #{p} - please choose one.',
  antiderivative: "Antiderivative computed by Maxima",
  antiderivativeMayBeWrongWarning:
    "<strong>Attention:</strong> Due to an error in the Maxima software, the antiderivative may be wrong. Check it thoroughly!",
  antiderivativeNotFound: "Antiderivative or integral could not be found.",
  approximation: "Approximation:",
  assumptionsMade: "<strong>Note:</strong> It was assumed that #{a}.",
  balloon:
    'Enter your function here. To calculate the integral, click the "Go!" button.',
  boundsOrderWarning:
    "<strong>Attention:</strong> The integral's lower bound is greater than its upper bound. Was this your intention?",
  cauchyPrincipalValue:
    "<strong>Note:</strong> The integral is divergent. The result shown is the <a href='https://en.wikipedia.org/wiki/Cauchy_principal_value'>Cauchy principal value</a>.",
  checkAnswerCaption: "Checking your answer",
  checkAnswerComputedAnswerHeading: "Calculator's answer",
  checkAnswerExit: 'Exit "check answer" mode',
  checkAnswerFailed:
    "Checking the answer resulted in an error or took too much time.",
  checkAnswerIntroduction:
    "<strong><u>Question:</u></strong><br>Are the following two expressions equivalent?",
  checkAnswerIntroductionAntiderivative:
    "<strong><u>Question:</u></strong><br>Are the following two expressions equivalent, or do they only differ by a constant (since we're checking an antiderivative)?",
  checkAnswerLinkTooltip:
    "Check answer: Compare this expression to your own answer to see whether it's equivalent.",
  checkAnswerPrompt: "Enter your own Answer:",
  checkAnswerResult: "<strong><u>Answer:</u></strong><br>#{r}",
  checkAnswerResultMaybe: "The answer could not be determined with certainty.",
  checkAnswerResultMaybeYes:
    "It could not be determined with certainty whether the expressions are equivalent. However, they only differ by a constant, which makes both of them valid antiderivatives.",
  checkAnswerResultNo:
    "No, the expressions are not equivalent! (But this doesn't necessarily mean that your answer is wrong &mdash; the calculator can also make mistakes sometimes &hellip;)",
  checkAnswerResultNoMaybe:
    "The expressions are not equivalent, but it could not be determined with certainty whether they differ only by a constant.",
  checkAnswerResultNoNo:
    "No, the expressions are not equivalent, and they don't only differ by a constant! (But this doesn't necessarily mean that your answer is wrong &mdash; the calculator can also make mistakes sometimes &hellip;)",
  checkAnswerResultNoYes:
    "The expressions are not equivalent, however they only differ by a constant, which makes both of them valid antiderivatives.",
  checkAnswerResultYes: "Yes, the expressions are equivalent!",
  checkAnswerUserAnswerHeading: "Your answer",
  checkYourInput:
    "Set integration variable and bounds in \"<em><a class='options' href='javascript:void 0' onclick='return stillLoading();'>Options</a></em>\".",
  checkYourVariable:
    'The variable of integration "#{v}" does not appear in the function you entered. If that was not your intent, choose the correct variable of integration in "Options". Do you want to continue anyway ("OK") or cancel?',
  chooseAlternativeLinkTooltip:
    "Restarts the calculation and takes a different path during step-by-step integration. Success is not guaranteed!",
  commandRegExp:
    "antiderivative|antidiff|antidifferentiate|int|integral|integrate|integration",
  complexMode: "Use complex domain (ℂ)?",
  confirmClearInput: "Clear input?",
  cookieSettingsLinkText: "Cookie settings",
  copyToClipboard: "You can copy this link to the clipboard:",
  definiteIntegral: "Definite integral",
  definiteIntegralHint:
    '<strong>Note:</strong> If you want to calculate a <em>definite integral</em>, click "<em>Options</em>" above. Enter the lower and the upper bound of integration in there, and repeat the calculation.',
  definiteIntegralMayBeWrongWarning:
    "<strong>Attention:</strong> Due to an error in the Maxima software, the definite integral may be wrong. Check it thoroughly!",
  definiteIntegralMayBeWrongWarningTryNumericalOnly:
    'Click the button "<em>Integrate numerically only</em>" in order to perform a numerical integration. Then, compare the result.',
  disableStrictModeLinkText: "Disable strict mode",
  disableStrictModeLinkTooltip:
    "Returns to the normal mode with strong simplifications.",
  disclaimer:
    "No liability is assumed for the correctness of the results. Errors in hardware and software can lead to incorrect results. The results should therefore always be double-checked.",
  donationPagePaymentData:
    "Donation from <em>#{fname} #{lname} (#{mail})</em> in the amount of <em>#{ccy} #{gross}</em> received on <em>#{date}</em>.",
  donationPageText:
    '<p>With your donation you support me in the development of the Integral Calculator and in financing the operating costs.</p><p><!-- IF_APP_EXISTS --><strong>Website:</strong> <!-- END_IF -->On #{w}, the advertisements and the call for donations will no longer be displayed in this browser.</p><!-- IF_APP_EXISTS --><p><strong>Android app:</strong> Please #{a1}click here#{a2}* to remove the ads from the #{s1}Android app#{s2}.</p><p style="font-size: 70%; margin: 0;">* This link only works on mobile devices on which the Android app is installed.</p><!-- END_IF -->',
  donationPageTitle: "Thank you very much for your donation!",
  dontYouMean:
    'Don\'t you mean "#{a}" rather than "#{b}"? For a multiplication, write "#{c}".',
  doodle_easter: "Happy Easter!",
  doodle_germanUnityDay: "German Unity Day",
  doodle_halloween: "Happy Halloween!",
  doodle_newYear: "Happy new year!",
  doodle_xmas: "Have a nice christmas time!",
  elementaryHint:
    "Note that many functions don't have an elementary antiderivative.",
  enableStrictModeLinkText:
    'Enable strict mode <sup style="color: red;">BETA</sup>',
  enableStrictModeLinkTooltip:
    "Restarts the calculation with weaker simplifications of roots for more correct results. Success is not guaranteed!",
  error_0pow0: "Error: $0^0$ is not defined!",
  error_0powComplex: "Error: $0^z$ is not defined for purely imaginary $z$!",
  error_ajax:
    "Error: Server request failed. Please check your internet connection. The server might be undergoing maintenance, or there might be a technical problem. If your internet connection works and this error persists for a longer period of time, please send an e-mail to d.scherfgen@googlemail.com - thank you!",
  error_argumentNotInDomain:
    "Error: A function is applied to an argument for which it is not defined, e.&nbsp;g. $\\tan\\left(\\frac{\\pi}{2}\\right)$.",
  error_divisionByZero: "Error: Division by zero is not defined!",
  error_expressionTooLong:
    "Error: The result is too long to be displayed. Please make sure that your input is correct, or try to simplify your query.",
  error_log0: "Error: $\\ln(0)$ is not defined!",
  error_severe:
    "Sorry, something went wrong. Please make sure that your input is correct, or try to simplify your query. If this error persists, please send an e-mail to d.scherfgen@googlemail.com - thank you!",
  error_timeout:
    "The calculation was aborted because it took too long. Please make sure that your input is correct, or try to simplify your query.",
  error_unknown:
    "Unknown error! Please make sure that your input is correct, or try to simplify your query.",
  examples: "Examples",
  examplesText:
    "Clicking an example enters it into the Integral Calculator. Moving the mouse over it shows the text.",
  examplesTooltip: "For this, enter the following:<br><code>#{e}</code>",
  expectedEndOfExpression: "End of input expected, found: #{c}",
  expectedRightParenthesis: "Right parenthesis expected, found: #{c}",
  exportLinkTooltip:
    "Export this expression into different formats (opens a new window).",
  exportsCopyToClipboard: "Copy",
  exportsCopyToClipboardDone: "Copied!",
  exportsEntryDescription_latex: "For inserting into a LaTeX document:",
  exportsEntryDescription_maxima:
    "For inserting into the computer algebra system Maxima:",
  exportsEntryDescription_website:
    "For inserting into the derivative/integral calculator:",
  exportsEntryTitle_latex: "LaTeX",
  exportsEntryTitle_maxima: "Maxima",
  exportsEntryTitle_website: "Online calculators",
  exportsWindowIntroduction:
    "Here, you find different representations of the following mathematical expression, so that you can insert it into a document or another application.",
  exportsWindowTitle: "Export",
  expressionChanged:
    "<strong>Note:</strong> Your input has been rewritten/simplified.",
  expressionPreviewHeader: "This will be calculated:",
  expressionTooLong: "Input too long!",
  fillInPlaceholders:
    "Your input is incomplete! Please fill in all placeholders (red square symbols).",
  formulaZoom: "Output&nbsp;zoom",
  functionTakesMinArguments:
    'The function "#{f}" needs at least #{n} arguments. Use parentheses and separate the arguments with commas or semicolons.',
  functionTakesNArguments:
    'The function "#{f}" needs #{n} arguments. Use parentheses and separate the arguments with commas or semicolons.',
  functionTakesOneArgument:
    'The function "#{f}" accepts only a single argument.',
  go: "Go!",
  help: "Help",
  helpText:
    '<p>Enter the function you want to integrate into the Integral Calculator. Skip the "<em>f(x) =</em>" part and the differential "<em>dx</em>"! The Integral Calculator will show you a graphical version of your input while you type. Make sure that it shows <em>exactly</em> what you want. Use parentheses, if necessary, e.&nbsp;g. "<em>a/(b+c)</em>".</p><p>In "<em>Examples"</em>, you can see which functions are supported by the Integral Calculator and how to use them.</p><p>When you\'re done entering your function, click "<em>Go!</em>", and the Integral Calculator will show the result below.</p><p>In "<em>Options</em>", you can set the <em>variable of integration</em> and the <em>integration bounds</em>. If you don\'t specify the bounds, only the antiderivative will be computed.</p>',
  hideStepsLinkText: "Hide steps",
  howItWorks: "How the Integral Calculator Works",
  howItWorksText:
    "<p>For those with a technical background, the following section explains how the Integral Calculator works.</p><p>First, a <a rel='nofollow' class='external' href='https://en.wikipedia.org/wiki/Parser'>parser</a> analyzes the mathematical function. It transforms it into a form that is better understandable by a computer, namely a tree (see figure below). In doing this, the Integral Calculator has to respect the <a rel='nofollow' class='external' href='https://en.wikipedia.org/wiki/Order_of_operations'>order of operations</a>. A specialty in mathematical expressions is that the multiplication sign can be left out sometimes, for example we write \"5x\" instead of \"5*x\". The Integral Calculator has to detect these cases and insert the multiplication sign.</p><p>The parser is implemented in <a rel='nofollow' class='external' href='https://en.wikipedia.org/wiki/JavaScript'>JavaScript</a>, based on the <a rel='nofollow' class='external' href='https://en.wikipedia.org/wiki/Shunting-yard_algorithm'>Shunting-yard algorithm</a>, and can run directly in the browser. This allows for quick feedback while typing by transforming the tree into <a rel='nofollow' class='external' href='https://en.wikipedia.org/wiki/LaTeX'>LaTeX</a> code. <a rel='nofollow' class='external' href='https://www.mathjax.org/'>MathJax</a> takes care of displaying it in the browser.</p><p>When the \"Go!\" button is clicked, the Integral Calculator sends the mathematical function and the settings (variable of integration and integration bounds) to the server, where it is analyzed again. This time, the function gets transformed into a form that can be understood by the <a rel='nofollow' class='external' href='https://en.wikipedia.org/wiki/Computer_algebra_system'>computer algebra system</a> <a rel='nofollow' class='external' href='http://maxima.sourceforge.net/'>Maxima</a>.</p><p><img src='images/how-it-works.png' width='800' height='235' alt='How the Integral Calculator works'></p><p>Maxima takes care of actually computing the integral of the mathematical function. Maxima's output is transformed to LaTeX again and is then presented to the user. The antiderivative is computed using the <a rel='nofollow' class='external' href='https://en.wikipedia.org/wiki/Risch_algorithm'>Risch algorithm</a>, which is hard to understand for humans. That's why showing the steps of calculation is very challenging for integrals.</p><p>In order to show the steps, the calculator applies the same integration techniques that a human would apply. The program that does this has been developed over several years and is written in Maxima's own programming language. It consists of more than 17000 lines of code. When the integrand matches a known form, it applies fixed rules to solve the integral (e.&nbsp;g. partial fraction decomposition for rational functions, trigonometric substitution for integrands involving the square roots of a quadratic polynomial or integration by parts for products of certain functions). Otherwise, it tries different substitutions and transformations until either the integral is solved, time runs out or there is nothing left to try. The calculator lacks the mathematical intuition that is very useful for finding an antiderivative, but on the other hand it can try a large number of possibilities within a short amount of time. The step by step antiderivatives are often much shorter and more elegant than those found by Maxima.</p><p>The \"Check&nbsp;answer\" feature has to solve the difficult task of determining whether two mathematical expressions are equivalent. Their difference is computed and simplified as far as possible using Maxima. For example, this involves writing trigonometric/hyperbolic functions in their exponential forms. If it can be shown that the difference simplifies to zero, the task is solved. Otherwise, a probabilistic algorithm is applied that evaluates and compares both functions at randomly chosen places. In the case of antiderivatives, the entire procedure is repeated with each function's derivative, since antiderivatives are allowed to differ by a constant.</p><p>The interactive function graphs are computed in the browser and displayed within a <a class='external' rel='nofollow' href='https://en.wikipedia.org/wiki/Canvas_element'>canvas element (HTML5)</a>. For each function to be graphed, the calculator creates a JavaScript function, which is then evaluated in small steps in order to draw the graph. While graphing, singularities (e.&nbsp;g. poles) are detected and treated specially. The gesture control is implemented using <a class='external' rel='nofollow' href='https://hammerjs.github.io/'>Hammer.js</a>.</p><p>If you have any questions or ideas for improvements to the Integral Calculator, don't hesitate to <a rel='nofollow' href='mailto:d.scherfgen@googlemail.com'>write me an e-mail</a>.</p>",
  iconExplanationCheckAnswer: "Check your own answer",
  iconExplanationExport: "Export the expression (e.&nbsp;g. LaTeX)",
  iconExplanationHeader: "Meaning of the icons",
  infinite: "infinite",
  infinity: "infinity",
  inputError: "Your current input is invalid",
  integralDivergent: "The integral is divergent.",
  integrationVariable: "Variable of integration",
  invalidCharacter: "Invalid character: #{c}",
  invalidCharacterEqualSign: "Equations are not supported.",
  invalidLimit: "The bounds of integration must be real!",
  invalidLogBase: "Invalid logarithm base!",
  invalidNumberOfArguments:
    'The function "#{f}" does not accept #{n} argument(s).',
  keepDecimals: "Keep decimals?",
  legal: "Contact and Privacy",
  limitNotFound: "The limit could not be found.",
  loading:
    "<strong>Loading … please wait!</strong><br>This will take a few seconds.",
  lookUpDefinition: "Look up definition:",
  lowerBound: "Lower bound (from)",
  maintenance:
    "<span style='font-size: 150%;'>The calculator is currently undergoing maintenance.</span><br>Maintenance work began #{t} minute(s) ago. Please try again shortly. You don't have to reload the page (yet).",
  mainVarUnusedWarning:
    'The arguments of the functions highlighted in red don\'t contain the variable of integration "#{v}" and are therefore constants. Please make your intention clear by putting parentheses around the function arguments.',
  manualAntiderivativeCaption: '"Manually" computed antiderivative',
  manualAntiderivativeExplanation:
    '<strong>"Manual" integration with steps:</strong><br>The calculator finds an antiderivative in a comprehensible way. Note that due to some simplifications, it might only be valid for parts of the function.',
  manualIntegrationFailed:
    "No antiderivative could be found within the given time limit, or all supported integration methods were tried unsuccessfully.",
  maximaTimedOutHint:
    "<strong>Note:</strong> The full calculation didn't work, but the calculator will try to find an antiderivative with steps anyway.",
  misplacedComma: "Misplaced comma found!",
  mobileVersion: "Mobile version",
  noInverseFunction:
    'The inverse function of "#{f}" is not supported. If you mean the reciprocal, write "1 / #{f}".',
  notWhatYouMean: "Not what you mean? <em>Use parentheses!</em>",
  numericalIntegrationHint:
    "<strong>Note:</strong> The approximation was obtained through <a class='external' rel='nofollow' href='https://en.wikipedia.org/wiki/Numerical_integration'>numerical integration</a>. The estimated absolute error is $#{e}$.",
  numericalOnly: "Integrate numerically only?",
  numericalOnlyError:
    "Numerical integration failed, possibly because the integral is divergent.",
  numericalOnlyHint:
    '<strong>Note:</strong> For <em>definite integrals</em> (with both bounds set), a <em>numerical approximation</em> can probably be obtained after removing all variables except for the variable of integration, or replacing them with concrete values. Please check the "<em>Integrate numerically only</em>" option in "<em>Options</em>".',
  numericalOnlyLinkText: "Integrate numerically only",
  numericalOnlyLinkTooltip:
    "Performs a purely numerical integration, i.&nbsp;e. without determining an antiderivative. The result approximates the definite integral.",
  numericalOnlyNoCanDo:
    'For the "Integrate numerically only" option, both bounds of integration must be set, and no variables except for the variable of integration must occur. Please set both bounds, and replace any additional variables with concrete values.',
  oldAppVersionHint:
    "<strong>Note:</strong> You're using an old version of the app. Please update to the current version <a class='external' rel='nofollow' href='//play.google.com/store/apps/details?id=de.david_scherfgen.derivative_calculator'>here</a>.",
  options: "Options",
  optionsText: "Configure the Integral Calculator:",
  outdatedBrowser:
    "This website will not function with your browser, because it is too old. Please upgrade to a newer version, or use another browser.",
  pageDescription:
    "Solve definite and indefinite integrals (antiderivatives) using this free online calculator. Step-by-step solution and graphs included!",
  pageFromWrongURL:
    "This page is not being accessed from its original URL and can't work here properly. You will now be redirected to the original URL. If that doesn't work, enter the following URL into your browser: <strong>#{u}</strong>",
  pageKeywords:
    "integral calculator, integral, antiderivative, calculator, function, online, steps, step by step integration, symbolic integration",
  pageSubTitle:
    "Calculate integrals online <br><em>&mdash; with steps and graphing!</em>",
  pageTitle: "Integral Calculator",
  pageTitleHTMLHeader: "Integral Calculator • With Steps!",
  pleaseEnterWithoutCommand:
    "You don't need to enter a command, only the function!",
  pleaseEnterWithoutDifferential:
    'Please don\'t write the differential "d#{v}" (or replace it with "1")! Set the variable of integration in "Options". If you mean a multiplication of two variables, write "d * #{v}".',
  pleaseEnterWithoutFOfX: 'Please don\'t write the "#{f}"!',
  pleaseReloadPage:
    "<span style='font-size: 150%;'>Please reload the page!</span><br>In order to make sure that you're using the latest version of the calculator, click the button below to reload the page (your current input and settings will be kept).<br><a id='reload-page-button' href='#{u}' target='_self'>Reload page</a>",
  pleaseReloadPageSteps: "Please reload the page!",
  pleaseUseFuncNotation:
    'If "#{v}" is supposed to be a general (unknown) function, please write "func_#{f}(…)".',
  pleaseUseFuncNotationOrMult:
    'If "#{v}" is supposed to be a general (unknown) function, please write "func_#{f}(…)". If you mean a multiplication, write "#{o} * (…)".',
  plot_clickXForTableOfValues:
    "Click <em>x</em> coordinate for table of values.",
  plot_crossCoordinates: "Marker at",
  plot_introductionHeader: "Interactive function graphing:",
  plot_introductionText:
    "Navigate using mouse or touch screen. Drag to pan, use the mouse wheel or two fingers to zoom.",
  plot_noCanDo: "This function cannot be graphed.",
  plot_notSupported:
    "Function graphs cannot be displayed in your browser. Please upgrade to a newer version, or use another browser.",
  plot_toolboxTableOfValuesError: "Error",
  plot_toolboxTableOfValuesHeader: "Table of values:",
  plot_toolboxToggleHeader: "Toggle graphs:",
  plot_toolboxVariablesHeader: "Assign variables:",
  plot_toolboxZoomModeHeader: "Zoom mode:",
  practice: "<span style='color: red;'>Practice</span>",
  practice_acceptProblem: "Accept problem",
  practice_generateProblem: "Next problem",
  practice_includeCompletingTheSquare: "Completing the square",
  practice_includeDefiniteIntegrals: "Definite integrals",
  practice_includeExponentialFunctions: "Exponential functions",
  practice_includeIntegrationByParts: "Integration by parts",
  practice_includeInvTrigHypFunctions: "Inv. trigon./hyperb. functions",
  practice_includeLogarithms: "Logarithms",
  practice_includePolynomialsAndPowers: "Polynomials and powers",
  practice_includeRationalFunctions: "Rational functions",
  practice_includeSpecialFunctions: "Special functions",
  practice_includeSubstitution: "Substitution",
  practice_includeTrickyIntegrals: "Tricky integrals",
  practice_includeTrigHypFunctions: "Trigon./hyperb. functions",
  practiceText:
    "<p><strong>The practice problem generator allows you to generate as many random exercises as you want.</strong></p><p>You find some configuration options and a proposed problem below. You can accept it (then it's input into the calculator) or generate a new one.</p>",
  prompt: "Calculate the Integral of …",
  proposeVariable:
    'The variable of integration is set to "#{v}", but your function only contains "#{p}". Do you want to integrate with respect to "#{p}" ("OK")?',
  resetAlternativesLinkText: "Reset all chosen alternatives",
  result: "Result",
  resultText:
    'Above, enter the function to integrate. <em>Variable of integration</em>, <em>integration bounds</em> and more can be changed in "<em>Options</em>". Click "<em>Go!</em>" to start the integral/antiderivative calculation. The result will be shown further below.',
  resultTextDone:
    '<p><strong>Done!</strong> See the result further below.</p><p id="scroll-down-hint">In order to not miss anything, please scroll all the way down.</p>',
  resultTextError: "<strong>Error!</strong> Something went wrong.",
  resultTextWait: "<strong>Please wait!</strong> Calculating result …",
  rightBarNotFound: 'Right "|" not found!',
  root: "root",
  rootsofHint:
    "<strong>Note:</strong> The antiderivative was expressed with respect to the unknown roots $Z$ of a denominator polynomial that could not be factored. It is assumed that all roots are distinct, i.&nbsp;e. there are no repeated roots.",
  scrollHint:
    "<strong>Note:</strong> The result is too wide for the screen. Scroll horizontally to see everything!",
  scrollHintDesktop:
    "Move the mouse over the <span style='opacity: 0.5;'>◄</span>&nbsp;arrows&nbsp;<span style='opacity: 0.5;'>►</span> appearing on the sides for automatic scrolling (no clicking required).",
  seeStepsForResult:
    "A result was obtained with steps, but the final simplification took too long and was aborted. You find the unsimplified result at the end of the steps.",
  serverTooBusy:
    "<span style='font-size: 150%;'>The server is too busy!</span><br><strong>You don't have to reload the page.</strong> Please try again in a few moments. If this error persists, please send an e-mail to <a href='mailto:d.scherfgen@googlemail.com'>d.scherfgen@googlemail.com</a>. Thank you!",
  shareThisCalculation: "Direct link to this calculation",
  showStepsLinkText: "Show steps",
  showStepsLinkTooltip: "Shows a step by step calculation.",
  simplify_header: "Simplify/rewrite:",
  simplify_noCanDo: "No further simplification found!",
  simplifyAllRoots:
    "Simplify all roots?<br>(√<span style='border-top: 1px solid #04394f;'><em>x</em>²</span> becomes <em>x</em>, not |<em>x</em>|)",
  simplifyExpressions: "Simplify expressions?",
  simplifyLinkText: "Simplify",
  simplifyLinkTooltip:
    "Repeats the calculation with additional simplifications enabled, which might lead to a shorter result.",
  specifyBothBoundsOrNone:
    "Please specify either both integration bounds or none!",
  sqrt: "sqrt",
  steps_absoluteValueFactors:
    "Assume positive factors and add correction factors",
  steps_absoluteValueOriginPointSymmetry:
    "The integrand is symmetric with respect to the origin. We can substitute for the absolute value",
  steps_absoluteValueYAxisSymmetry:
    "The integrand is symmetric to the axis #{s}. Rewrite the integral",
  steps_answer: "The problem is solved",
  steps_applyTrigHypAdditionMultipleAngleFormulas:
    "Apply addition formulas and/or multiple-angle/argument formulas",
  steps_applyTrigHypProductToSumFormulas: "Apply product-to-sum formulas",
  steps_cancelCombineCommonFactors: "Cancel/combine common factors",
  steps_chooseAlternative: "&hellip; or choose an alternative",
  steps_combineExponentials: "Combine exponentials",
  steps_combineResults: "Plug in solved integrals",
  steps_completeTheSquare: "Complete the square",
  steps_constantRule: "Apply constant rule",
  steps_contractRoots: "Contract roots",
  steps_derivativeCalculatorURL: "//www.derivative-calculator.net/",
  steps_detailedStepsAvailable: "<a href='#{u}'>full steps</a>",
  steps_dontApplyOstrogradskysMethod: "Don't apply Ostrogradsky's method",
  steps_dontApplyTrick: "Don't apply this trick",
  steps_dontContractRoots: "Don't contract roots",
  steps_dontRationalizeDenominator: "Don't rationalize denominator",
  steps_dontRewrite: "Don't rewrite",
  steps_dontSubstitute: "Don't substitute",
  steps_expand: "Expand",
  steps_expandFraction: "Expand fraction by #{e}",
  steps_expandLogarithms: "Expand logarithms",
  steps_exponentialRule: "Apply exponential rule",
  steps_factor: "Factor",
  steps_factorAndSimplify: "Factor and simplify",
  steps_factorDenominator: "Factor the denominator",
  steps_firstTime: "First time",
  steps_hyperbolicSubstitution: "Perform hyperbolic substitution",
  steps_integralCanceled: "The integral #{i} cancels, leaving only",
  steps_integralRepeated:
    "The integral #{i} appears again on the right side of the equation, we can solve for it",
  steps_integrateByParts: "Integrate by parts",
  steps_integrateByPartsFor:
    "Within the sum, apply integration by parts for #{i}",
  steps_integrateByPartsFormat: "normal",
  steps_integrateByPartsTwice: "We will integrate by parts twice in a row",
  steps_linearity: "Apply linearity",
  steps_logAbsHint:
    "Apply the absolute value function to arguments of logarithm functions in order to extend the antiderivative's domain",
  steps_notSolvingBecauseCanceled:
    "We don't have to solve the integral #{i} here because it cancels out",
  steps_ostrogradskysMethod:
    "<p>Apply Ostrogradsky's method: Let #{p} and #{q} be polynomials, where #{q} has repeated roots and #{pOverQ} is a proper fraction, i.&nbsp;e. no more polynomial long division can be done. Then:</p><p>#{rule}</p><p>Here, #{q1} is the greatest common divisor (to be calculated e.&nbsp;g. using the Euclidean algorithm) of #{q} and its derivative #{dq}, and #{q2Def}. We differentiate the integral equation on both sides and find suitable polynomials #{p1} and #{p2} by solving a system of linear equations for their undetermined coefficients (very much like in partial fraction decomposition). The degrees of #{p1} and #{p2} are lower than those of #{q1} and #{q2}, respectively. For the integral at hand, we have:</p><p>#{pEq},<br>#{qEq},<br>#{dqEq},<br>#{q1Eq},<br>#{q2Eq}.</p><p>The polynomials we're looking for are:</p><p>#{p1Eq},<br>#{p2Eq}.</p>Therefore, our integral is",
  steps_ostrogradskysMethodRepeat:
    "<p>Apply Ostrogradsky's method again with:</p>#{pEq},<br>#{qEq},<br>#{dqEq},<br>#{q1Eq},<br>#{q2Eq},<br>#{p1Eq},<br>#{p2Eq}",
  steps_paramsTemplate: "with #{p}",
  steps_partialFractionDecomposition: "Perform partial fraction decomposition",
  steps_partialFractionDecompositionPossible:
    "This integral could be solved using partial fraction decomposition, but there is a simpler way",
  steps_polylogarithmChain:
    "Integrate by parts in order to solve using polylogarithms",
  steps_polynomialLongDivision: "Perform polynomial long division",
  steps_polynomialLongDivisionForRationalFactors:
    "Perform polynomial long division on the factor #{f}",
  steps_powerRule: "Apply power rule",
  steps_powerRuleMultiple: "Apply the power rule for each term",
  steps_prepareForSubstitution: "Prepare for substitution",
  steps_prepareForTangentHalfAngleSubstitution:
    'Prepare for <a href="https://en.wikipedia.org/wiki/Tangent_half-angle_substitution">tangent half-angle substitution</a> (Weierstrass substitution)',
  steps_problem: "Problem",
  steps_rationalizeDenominator:
    "Expand by #{e} to remove the root from the denominator",
  steps_reductionFormula: "Apply reduction formula",
  steps_reductionFormulaRepeat: "Apply the last reduction formula again",
  steps_rewrite: "Rewrite",
  steps_rewriteAndSplit: "Write #{a} as #{b} and split",
  steps_rewriteInvTrigHypFunctionsAsLogarithms:
    "Write inverse trigonometric/hyperbolic functions using logarithms",
  steps_rewritePartUsingFormula: "Write #{o} as #{r} using the formula #{f}",
  steps_rewriteSimplify: "Rewrite/simplify",
  steps_rewriteSimplifyUsingTrigHypIdentities:
    "Rewrite/simplify using trigonometric/hyperbolic identities",
  steps_rewriteTrigHypFunctionsAsExponentials:
    "Write trigonometric/hyperbolic functions using exponentials",
  steps_secondTime: "Second time",
  steps_showAntiderivativeSteps: "steps",
  steps_showDerivativeSteps: "steps",
  steps_si_cosine_integral: "expintegral_ci|cosine integral",
  steps_si_dilogarithm: "li|dilogarithm",
  steps_si_elliptic_integral_1st_kind:
    "elliptic_f|incomplete elliptic integral of the first kind",
  steps_si_elliptic_integral_2nd_kind:
    "elliptic_e|incomplete elliptic integral of the second kind",
  steps_si_elliptic_integral_3rd_kind:
    "elliptic_pi|incomplete elliptic integral of the third kind",
  steps_si_error_function: "erf|Gauss error function",
  steps_si_exponential_integral_e1: "expintegral_e1|exponential integral",
  steps_si_exponential_integral_ei: "expintegral_ei|exponential integral",
  steps_si_fresnel_cosine_integral: "fresnel_c|Fresnel integral",
  steps_si_fresnel_sine_integral: "fresnel_s|Fresnel integral",
  steps_si_hyperbolic_cosine_integral:
    "expintegral_chi|hyperbolic cosine integral",
  steps_si_hyperbolic_sine_integral: "expintegral_shi|hyperbolic sine integral",
  steps_si_imaginary_error_function: "erfi|imaginary error function",
  steps_si_incomplete_gamma_function:
    "gamma_incomplete|incomplete gamma function",
  steps_si_logarithmic_integral: "expintegral_li|integral logarithm",
  steps_si_sine_integral: "expintegral_si|sine integral",
  steps_simplify: "Simplify",
  steps_simplifyTrigHypSquares:
    "Simplify sums of squares of trigonometric/hyperbolic functions",
  steps_simplifyUsingIdentity: "Simplify using #{i}",
  steps_skipSimplification: "Skip simplification",
  steps_skipStep: "Skip step",
  steps_solving: "Now solving",
  steps_specialIntegral: "This is a special integral",
  steps_standardIntegral: "This is a standard integral",
  steps_substitute: "Substitute",
  steps_trigonometricSubstitution: "Perform trigonometric substitution",
  steps_undoSubstitution: "Undo substitution",
  steps_use: "use",
  steps_usePreviousResult: "Use previous result",
  steps_xthru: "Put terms over a common denominator",
  stillLoading:
    "The page hasn't finished loading yet (or there might be a technical problem). Please wait a while.",
  subscriptTooLong: "Subscript too long!",
  supportMe: "Support",
  supportMeAlternative: "",
  supportMeAmazonButtonText: "Amazon",
  supportMeAmazonText:
    "If you buy something using <a class='external' rel='nofollow' href='#{url}'>my Amazon link</a>, as an Amazon affiliate I earn a commission.",
  supportMeAmazonLink:
    "https://www.amazon.com/?_encoding=UTF8&camp=1789&creative=9325&linkCode=ur2&tag=integralcalculator-20&linkId=RBQXLGNG5RUKK23V",
  supportMeBirthday:
    "By the way, today is my <strong>birthday</strong>! &#x1F382;&#x1F917;",
  supportMeDonateButtonID: "ZBAWDJF7E26AY",
  supportMeDonateButtonText: "Donate",
  supportMeDonateText:
    "You're welcome to make a <a class='external' rel='nofollow' href='#{url}'><strong>donation via PayPal</strong></a>.",
  supportMeDonateToRemoveAdsText:
    "<a class='external' rel='nofollow' href='#{url}'><strong>Donate via PayPal to remove the ads.</strong></a>*",
  supportMeDonateToRemoveAdsHint:
    "<p style='font-size: 70%;'>* Please choose to cover the PayPal fees. After donating, you will receive an e-mail.</p>",
  supportMeText: "Please support me if you like this page.",
  switchDarkModeLinkText: "Switch light/dark mode",
  switchToDesktopMode: "Switch to desktop view",
  switchToMobileMode: "Switch to mobile view",
  symmetryHint:
    "<strong>Note:</strong> The definite integral was calculated using the function's property of being symmetric.",
  trackingID: "G-LS8R5QDVQ0",
  trigHypForms:
    "sen|sin,cosen|cos,tan|tg|tn,cosec|csc,sec,cotan|cotg|cotn|cot|ctg|ctn",
  tryWithoutSimplification:
    "Have you tried without the simplification of expressions?",
  tryWithSimplification:
    "Have you tried using the option to simplify expressions?",
  unexpected: "Unexpected: #{c}",
  unexpectedEndOfExpression: "Unexpected end of input!",
  unsupportedLaTeXCommand: 'Unsupported LaTeX command: "#{c}"',
  upperBound: "Upper bound (to)",
  url: "//www.integral-calculator.com/",
  "url_%gamma":
    "https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant",
  "url_%phi": "https://en.wikipedia.org/wiki/Golden_ratio",
  url_arccos: "https://en.wikipedia.org/wiki/Inverse_trigonometric_functions",
  url_arccot: "https://en.wikipedia.org/wiki/Inverse_trigonometric_functions",
  url_arccsc: "https://en.wikipedia.org/wiki/Inverse_trigonometric_functions",
  url_arcosh: "https://en.wikipedia.org/wiki/Inverse_hyperbolic_function",
  url_arcoth: "https://en.wikipedia.org/wiki/Inverse_hyperbolic_function",
  url_arcsch: "https://en.wikipedia.org/wiki/Inverse_hyperbolic_function",
  url_arcsec: "https://en.wikipedia.org/wiki/Inverse_trigonometric_functions",
  url_arcsin: "https://en.wikipedia.org/wiki/Inverse_trigonometric_functions",
  url_arctan: "https://en.wikipedia.org/wiki/Inverse_trigonometric_functions",
  url_arctan2: "https://en.wikipedia.org/wiki/Atan2",
  url_arsech: "https://en.wikipedia.org/wiki/Inverse_hyperbolic_function",
  url_arsinh: "https://en.wikipedia.org/wiki/Inverse_hyperbolic_function",
  url_artanh: "https://en.wikipedia.org/wiki/Inverse_hyperbolic_function",
  url_beta_function: "https://en.wikipedia.org/wiki/Beta_function",
  url_beta_incomplete:
    "https://en.wikipedia.org/wiki/Beta_function#Incomplete_beta_function",
  url_beta_incomplete_generalized:
    "https://en.wikipedia.org/wiki/Beta_function#Incomplete_beta_function",
  url_beta_incomplete_regularized:
    "https://en.wikipedia.org/wiki/Beta_function#Incomplete_beta_function",
  url_conjugate: "https://en.wikipedia.org/wiki/Complex_conjugate",
  url_constantOfIntegration:
    "https://en.wikipedia.org/wiki/Constant_of_integration",
  url_cos: "https://en.wikipedia.org/wiki/Trigonometric_functions",
  url_cosh: "https://en.wikipedia.org/wiki/Hyperbolic_function",
  url_cot:
    "https://en.wikipedia.org/wiki/Trigonometric_functions#Reciprocal_functions",
  url_coth: "https://en.wikipedia.org/wiki/Hyperbolic_function",
  url_csc:
    "https://en.wikipedia.org/wiki/Trigonometric_functions#Reciprocal_functions",
  url_csch: "https://en.wikipedia.org/wiki/Hyperbolic_function",
  url_e: "https://en.wikipedia.org/wiki/E_(mathematical_constant)",
  url_elliptic_e:
    "https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_second_kind",
  url_elliptic_f:
    "https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_first_kind",
  url_elliptic_pi:
    "https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_third_kind",
  url_erf: "https://en.wikipedia.org/wiki/Error_function",
  url_erf_generalized: "https://en.wikipedia.org/wiki/Error_function",
  url_erfc: "https://en.wikipedia.org/wiki/Error_function",
  url_erfi: "https://en.wikipedia.org/wiki/Error_function",
  url_expintegral_chi: "https://en.wikipedia.org/wiki/Trigonometric_integral",
  url_expintegral_ci: "https://en.wikipedia.org/wiki/Trigonometric_integral",
  url_expintegral_e: "https://en.wikipedia.org/wiki/Exponential_integral",
  url_expintegral_e1: "https://en.wikipedia.org/wiki/Exponential_integral",
  url_expintegral_ei: "https://en.wikipedia.org/wiki/Exponential_integral",
  url_expintegral_li:
    "https://en.wikipedia.org/wiki/Logarithmic_integral_function",
  url_expintegral_shi: "https://en.wikipedia.org/wiki/Trigonometric_integral",
  url_expintegral_si: "https://en.wikipedia.org/wiki/Trigonometric_integral",
  url_fresnel_c: "https://en.wikipedia.org/wiki/Fresnel_integral",
  url_fresnel_s: "https://en.wikipedia.org/wiki/Fresnel_integral",
  url_gamma_function: "https://en.wikipedia.org/wiki/Gamma_function",
  url_gamma_greek: "https://en.wikipedia.org/wiki/Incomplete_gamma_function",
  url_gamma_incomplete:
    "https://en.wikipedia.org/wiki/Incomplete_gamma_function",
  url_gamma_incomplete_generalized:
    "https://en.wikipedia.org/wiki/Incomplete_gamma_function",
  url_gamma_incomplete_regularized:
    "https://en.wikipedia.org/wiki/Incomplete_gamma_function",
  url_hypergeometric: "https://en.wikipedia.org/wiki/Hypergeometric_function",
  url_hypergeometric_regularized:
    "https://en.wikipedia.org/wiki/Hypergeometric_function",
  url_i: "https://en.wikipedia.org/wiki/Imaginary_unit",
  url_imagpart: "https://en.wikipedia.org/wiki/Complex_number",
  url_lambert_w: "https://en.wikipedia.org/wiki/Lambert_W_function",
  url_li: "https://en.wikipedia.org/wiki/Polylogarithm",
  url_ln: "https://en.wikipedia.org/wiki/Natural_logarithm",
  url_log: "https://en.wikipedia.org/wiki/Logarithm",
  url_pi: "https://en.wikipedia.org/wiki/Pi",
  url_psi_function: "https://en.wikipedia.org/wiki/Polygamma_function",
  url_realpart: "https://en.wikipedia.org/wiki/Complex_number",
  url_sec:
    "https://en.wikipedia.org/wiki/Trigonometric_functions#Reciprocal_functions",
  url_sech: "https://en.wikipedia.org/wiki/Hyperbolic_function",
  url_signum: "https://en.wikipedia.org/wiki/Sign_function",
  url_sin: "https://en.wikipedia.org/wiki/Trigonometric_functions",
  url_sinh: "https://en.wikipedia.org/wiki/Hyperbolic_function",
  url_tan: "https://en.wikipedia.org/wiki/Trigonometric_functions",
  url_tanh: "https://en.wikipedia.org/wiki/Hyperbolic_function",
  url_zeta_function: "https://en.wikipedia.org/wiki/Riemann_zeta_function",
  usage_powFraction:
    'Please put parentheses around the exponent, e.g., write "x^(1/n)" instead of "x^1/n". For square roots, you can write "sqrt(x)", for n-th roots "root(n, x)".',
  usage_prependedExponentBrackets:
    'Please put parentheses around the exponent of the function "#{f}", e.g., write "#{f}^(n+1)(x)" instead of "#{f}^n+1(x)".',
  usage_subscriptToFirstArgBrackets:
    'Please put parentheses around the subscript of the function "#{f}", e.g., write "#{f}_(n+1)(x)" instead of "#{f}_n+1(x)".',
  usedUnsimplifiedExpressionHint:
    "<strong>Hint:</strong> The original (unsimplified) input was used because it resulted in a shorter antiderivative.",
  websiteHasntFinishedLoading:
    "The website still hasn't finished loading, which is unusual. Please wait a little longer, or try reloading the page. There might be a technical problem on our side or on yours. If this error persists although your internet connection is working and you're using the latest version of a modern browser, please contact the administrator under d.scherfgen@googlemail.com — thank you!",
  yourInput: "Your input",
};
