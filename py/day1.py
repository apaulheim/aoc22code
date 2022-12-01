import functools

def split_items(string):
  return string.split("\n")

f = open("input.txt", "r")
lines = f.readlines()
items_elf = list(
  map(split_items,
      functools.reduce(lambda x, y: x + y, lines).split("\n\n")))
elves = []
for i in items_elf:
  ints = list(map(int, i))
  elves.append(functools.reduce(lambda x, y: x + y, ints))
elves.sort(reverse=True)
silver = elves[0]
gold = elves[0] + elves[1] + elves[2]
print("silver:", silver)
print("gold:", gold)