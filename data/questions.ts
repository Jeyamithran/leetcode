import { Question } from '../types';

export const questions: Question[] = [
    {
        id: '1',
        title: 'Two Sum',
        difficulty: 'Easy',
        tags: ['Array', 'Hash Table'],
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
            },
            {
                input: 'nums = [3,2,4], target = 6',
                output: '[1,2]',
            },
            {
                input: 'nums = [3,3], target = 6',
                output: '[0,1]',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        javaSolution: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
        solutionExplanation: [
            'Use a HashMap to store the numbers we have seen so far and their indices.',
            'Iterate through the array, for each number, check if the complement (target - number) exists in the map.',
            'If it exists, we found the pair. Return their indices.',
            'If not, add the current number and its index to the map.',
        ],
    },
    {
        id: '2',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        tags: ['Linked List', 'Recursion'],
        description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
        examples: [
            {
                input: 'head = [1,2,3,4,5]',
                output: '[5,4,3,2,1]',
            },
            {
                input: 'head = [1,2]',
                output: '[2,1]',
            },
            {
                input: 'head = []',
                output: '[]',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        javaSolution: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
        solutionExplanation: [
            'Initialize prev as null and curr as head.',
            'Iterate through the list. In each step, save the next node.',
            'Point the current node\'s next to prev.',
            'Move prev to current, and current to next.',
            'Return prev as the new head.',
        ],
    },
    {
        id: '3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        tags: ['Hash Table', 'String', 'Sliding Window'],
        description: `Given a string s, find the length of the longest substring without repeating characters.`,
        examples: [
            {
                input: 's = "abcabcbb"',
                output: '3',
                explanation: 'The answer is "abc", with the length of 3.',
            },
            {
                input: 's = "bbbbb"',
                output: '1',
                explanation: 'The answer is "b", with the length of 1.',
            },
            {
                input: 's = "pwwkew"',
                output: '3',
                explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(min(m, n))',
        javaSolution: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        Set<Character> set = new HashSet<>();
        int ans = 0, i = 0, j = 0;
        while (i < n && j < n) {
            if (!set.contains(s.charAt(j))){
                set.add(s.charAt(j++));
                ans = Math.max(ans, j - i);
            } else {
                set.remove(s.charAt(i++));
            }
        }
        return ans;
    }
}`,
        solutionExplanation: [
            'Use a sliding window with a HashSet to keep track of unique characters.',
            'Expand the right side of the window (j) as long as the character is unique.',
            'If a duplicate is found, shrink the left side (i) until the duplicate is removed.',
            'Keep track of the maximum window size.',
        ],
    },
    {
        id: '4',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        tags: ['String', 'Stack'],
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.`,
        examples: [
            {
                input: 's = "()"',
                output: 'true',
            },
            {
                input: 's = "()[]{}"',
                output: 'true',
            },
            {
                input: 's = "(]"',
                output: 'false',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        javaSolution: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<Character>();
        for (char c : s.toCharArray()) {
            if (c == '(')
                stack.push(')');
            else if (c == '{')
                stack.push('}');
            else if (c == '[')
                stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c)
                return false;
        }
        return stack.isEmpty();
    }
}`,
        solutionExplanation: [
            'Use a stack to keep track of opening brackets.',
            'When encountering an opening bracket, push the corresponding closing bracket onto the stack.',
            'When encountering a closing bracket, check if it matches the top of the stack.',
            'If the stack is empty or the top doesn\'t match, it\'s invalid.',
            'Finally, check if the stack is empty.',
        ],
    },
    {
        id: '5',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        tags: ['Array', 'Sorting'],
        description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
        examples: [
            {
                input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
                output: '[[1,6],[8,10],[15,18]]',
                explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
            },
            {
                input: 'intervals = [[1,4],[4,5]]',
                output: '[[1,5]]',
                explanation: 'Intervals [1,4] and [4,5] are considered overlapping.',
            },
        ],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n) or O(n)',
        javaSolution: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1)
            return intervals;

        // Sort by ascending starting point
        Arrays.sort(intervals, (i1, i2) -> Integer.compare(i1[0], i2[0]));

        List<int[]> result = new ArrayList<>();
        int[] newInterval = intervals[0];
        result.add(newInterval);
        for (int[] interval : intervals) {
            if (interval[0] <= newInterval[1]) // Overlapping intervals, move the end if needed
                newInterval[1] = Math.max(newInterval[1], interval[1]);
            else {                             // Disjoint intervals, add the new interval to the list
                newInterval = interval;
                result.add(newInterval);
            }
        }

        return result.toArray(new int[result.size()][]);
    }
}`,
        solutionExplanation: [
            'Sort the intervals based on their start times.',
            'Iterate through the sorted intervals and merge overlapping ones.',
            'Maintain a "current" interval and extend its end time if the next interval overlaps.',
            'If the next interval does not overlap, add the current interval to the result and start a new one.',
        ],
    },
];
