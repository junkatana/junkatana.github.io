# Gera um .mid de uma nota só (usado pelo ajustar-fm.js): mid.py saida.mid programa nota segurar_s [bat]
# mid.py out.mid program note hold_s [drum]
import sys, struct
out, prog, note, hold = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), float(sys.argv[4])
drum = len(sys.argv) > 5
ch = 9 if drum else 0
tpq = 480  # 120 bpm -> 1 tick = 1/960 s
def vlq(n):
    b = [n & 0x7f]; n >>= 7
    while n: b.insert(0, (n & 0x7f) | 0x80); n >>= 7
    return bytes(b)
ev = b''
if not drum: ev += vlq(0) + bytes([0xC0 | ch, prog])
ev += vlq(0) + bytes([0x90 | ch, note, 100])
ev += vlq(int(hold * 960)) + bytes([0x80 | ch, note, 0])
ev += vlq(int(0.6 * 960)) + bytes([0xFF, 0x2F, 0])
trk = b'MTrk' + struct.pack('>I', len(ev)) + ev
open(out, 'wb').write(b'MThd' + struct.pack('>IHHH', 6, 0, 1, tpq) + trk)
