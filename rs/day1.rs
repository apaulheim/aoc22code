use std::fs;

fn main() {
  let contents = fs::read_to_string("input.txt").expect("Should have been able to read the file");
  let split = contents.split("\n\n");
  let mut elves = split
    .map(|s|
      s.split("\n")
        .map(|s| s.parse::<i32>().unwrap())
        .sum::<i32>()
    )
    .collect::<Vec<i32>>();
  elves.sort();
  elves.reverse();
  let silver = elves[0];
  let gold = elves[0] + elves[1] + elves[2];
  println!("silver: {:?}", silver);
  println!("gold: {:?}", gold);
}