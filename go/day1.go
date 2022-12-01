package main

import (
	"strconv"
	"strings"
  "io/ioutil"
  "log"
  "fmt"
  "sort"
)
func main() {
  data, err := ioutil.ReadFile("day1.txt")
  if err != nil {
      log.Fatalf("unable to read file: %v", err)
  }
	elvesStr := strings.Split(string(data), "\n\n")
  elves := []int{}
  for _, e := range elvesStr {
    items := strings.Split(e, "\n")
    sum := 0
    for _, i := range items {
      j, err := strconv.Atoi(i)
        if err != nil {
            panic(err)
        }
      sum += j
    }
    elves = append(elves, sum)
  }
  sort.Ints(elves)
  silver := elves[len(elves)-1]
  gold := elves[len(elves)-1] + elves[len(elves)-2] + elves[len(elves)-3]
  fmt.Println("Day 1", silver)
  fmt.Println("Day 1", gold)
}