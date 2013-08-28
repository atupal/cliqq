class b:
  def __init__(self, b, i):
    self.s = b or 0
    self.e = i or 0
  def __repr__(self):
    return "{%d, %d}" % (self.s, self.e)

def P(i, a):
  r = [None] * 4
  r[0] = int(i) >> 24 & 255
  r[1] = int(i) >> 16 & 255
  r[2] = int(i) >> 8 & 255
  r[3] = int(i) & 255
  j = []
  for e in a:
    j.append(ord(e))
  e = []
  e.append(b(0, len(j) - 1))
  while len(e) > 0:
    c = e.pop()
    if not(c.s >= c.e or c.s < 0 or c.e >= len(j)):
      if c.s + 1 == c.e:
        if j[c.s] > j[c.e]:
          j[c.s], j[c.e] = j[c.e], j[c.s]
      else:
        l = c.s; J = c.e; f = j[c.s]
        while c.s < c.e:
          while c.s < c.e and j[c.e] >= f:c.e = c.e - 1;r[0] = r[0] + 3 & 255
          if c.s < c.e:j[c.s] =j[c.s] = j[c.e];c.s+=1;r[1] = r[1] * 13 + 43 & 255
          while c.s < c.e and j[c.s] <= f:c.s = c.s+1;r[2] = r[2] - 3 & 255
          if c.s < c.e:j[c.e] =j[c.e]=j[c.s];c.e-=1;r[3]=(r[0] ^ r[1] ^ r[2] ^ r[3] + 1)& 255
        j[c.s] = f
        e.append(b(l, c.s-1))
        e.append(b(c.s+1, J))
  j = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
  e = ""
  c = 0
  while c < len(r):
    e += j[r[c] >> 4 & 15]
    e += j[r[c] & 15]
    c += 1
  return e

if __name__ == "__main__":
  print P('1063918489', '88e308f595179b57a78caad53c69df46df3da92c7311cab8a76b089e1a5ba402')
