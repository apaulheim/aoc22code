package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

func getSilverScore(game string) int {
	switch game {
	case "X":
		return 1
	case "Y":
		return 2
	case "Z":
		return 3
	}
	return 0
}

func getSilverOutcome(game string) int {
	switch game {
	case "A Z", "B X", "C Y":
		return 0
	case "A X", "B Y", "C Z":
		return 3
	case "A Y", "B Z", "C X":
		return 6
	}
	return 0
}

func getGoldScore(game string) int {
	switch game {
	case "A Y", "B X", "C Z":
		return 1
	case "A Z", "B Y", "C X":
		return 2
	case "A X", "B Z", "C Y":
		return 3
	}
	return 0
}

func getGoldOutcome(game string) int {
	switch game {
	case "X":
		return 0
	case "Y":
		return 3
	case "Z":
		return 6
	}
	return 0
}

func main() {
	dataStr, err := ioutil.ReadFile("day2.txt")
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}
	silver := 0
	gold := 0
	data := strings.Split(string(dataStr), "\n")

	for _, gameStr := range data {
		game := strings.Split(gameStr, " ")
		silver += getSilverScore(game[1])
		silver += getSilverOutcome(gameStr)
		gold += getGoldScore(gameStr)
		gold += getGoldOutcome(game[1])
	}

	fmt.Println("silver:", silver)
	fmt.Println("gold:", gold)
}