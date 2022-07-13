/**
 * 
 * @param s 比对值
 * @param t 目标值
 * @param f 精确单位长度
 * @returns 相似度
 * @url https://blog.csdn.net/xcxy2015/article/details/77164126
 */
export function similar(s:string, t:string, f:number):number {
    if (!s || !t) {
        return 0
    }
    var l = s.length > t.length ? s.length : t.length
    var n = s.length
    var m = t.length
    var d:number[][] = []
    f = f || 3
    var min = function(a: number, b: number, c: number) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    var i, j, si, tj, cost
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    let res = (1 - d[n][m] / l)
    return +res.toFixed(f)
}