



def P(b, i):
  a = [0] * 4
  for ind, s in enumerate(i):
    a[ind%4] ^= ord(s)

  j = ['EC', 'OK']
  d = [0] * 4
  d[0] = int(b) >> 24 & 255 ^ ord( j[0][0] )
  d[1] = int(b) >> 16 & 255 ^ ord( j[0][1] )
  d[2] = int(b) >> 8 & 255 ^ ord( j[1][0] )
  d[3] = int(b) & 255 ^ ord( j[1][1] )
  j = [0] * 8
  for s in xrange(8):
    if s % 2 == 0:
      j[s] = a[s>>1]
    else:
      j[s] = d[s>>1]
  a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
  d = ""
  for s in j:
    d += a[ s >> 4 & 15 ]
    d += a[ s & 15 ]
  return d

 

print (P('1063918489', '092af9ae32e61b95a065d973387d05fca66f01d7e6aa9a40745f035e34a1a435'))
