package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func contained(t1 []int, t2 []int) bool {
  return t1[0] <= t2[0] && t1[1] >= t2[1];
}

func notOverlapped(t1 []int, t2 []int) bool {
  return t1[0] < t2[0] && t1[1] < t2[0];
}

func main() {
  dataStr, err := ioutil.ReadFile("day4.txt")
  if err != nil {
    log.Fatalf("unable to read file: %v", err)
  }
  lines := strings.Split(string(dataStr), "\n")
  pairs :=  [][][]int{}
  for _, line := range(lines) {
    pa := [][]int{}
    p := strings.Split(line, ",");
    for _, t := range(p) {
      t := strings.Split(t, "-");
      tuple1, _ := strconv.Atoi(t[0]);
      tuple2, _ := strconv.Atoi(t[1]);
      pa = append(pa, []int{tuple1, tuple2});
    }
    pairs = append(pairs, pa);
  }
  
  silver := 0;
  for _, p := range(pairs) {
    if (contained(p[0], p[1]) || contained(p[1], p[0])) {
      silver++;
    }
  }
  
  gold := 0;
  for _, p := range(pairs) {
    if (!(notOverlapped(p[0], p[1]) || notOverlapped(p[1], p[0]))) {
      gold++;
    }
  }
  fmt.Println("silver:", silver)
  fmt.Println("gold:", gold)
}