package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

func main() {
	dataStr, err := ioutil.ReadFile("day3.txt")
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}
	silver := 0
	gold := 0
  priorities := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  rucksacks :=  [][]string{}
	data := strings.Split(string(dataStr), "\n")

	for _, rucksackStr := range data {
    rucksackStrLength := len(rucksackStr) / 2
		rucksack := []string{rucksackStr[0:rucksackStrLength], rucksackStr[rucksackStrLength:]}
    rucksacks = append(rucksacks, rucksack);
	}
  for _, rucksack := range rucksacks {
    for _, letter := range rucksack[0] {
      if(strings.Index(rucksack[1], string(letter)) != -1) {
        silver += strings.Index(priorities, string(letter)) + 1;
        break;
      }
    }
	}

  rucksacksGold :=  [][]string{}
  for i := 0; i < len(data); i+=3 {
    rucksacksGold = append(rucksacksGold, []string{data[i], data[i+1], data[i+2]})
  }
  for _, rucksack := range rucksacksGold {
    for _, letter := range rucksack[0] {
      if(strings.Index(rucksack[1], string(letter)) != -1 && strings.Index(rucksack[2], string(letter)) != -1) {
        gold += strings.Index(priorities, string(letter)) + 1;
        break;
      }        
    }
  }
  
	fmt.Println("silver:", silver)
	fmt.Println("gold:", gold)
}