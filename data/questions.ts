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
    {
        id: '6',
        title: 'Maximum Subarray',
        difficulty: 'Medium',
        tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
        description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.`,
        examples: [
            {
                input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
                output: '6',
                explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
            },
            {
                input: 'nums = [1]',
                output: '1',
            },
            {
                input: 'nums = [5,4,-1,7,8]',
                output: '23',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        javaSolution: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }
}`,
        solutionExplanation: [
            'Use Kadane\'s algorithm.',
            'Iterate through the array, maintaining the maximum sum ending at the current position.',
            'Update the global maximum sum found so far.',
        ],
    },
    {
        id: '7',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        tags: ['Dynamic Programming'],
        description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
        examples: [
            {
                input: 'n = 2',
                output: '2',
                explanation: 'There are two ways to climb to the top. 1. 1 step + 1 step. 2. 2 steps.',
            },
            {
                input: 'n = 3',
                output: '3',
                explanation: 'There are three ways to climb to the top. 1. 1 step + 1 step + 1 step. 2. 1 step + 2 steps. 3. 2 steps + 1 step.',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        javaSolution: `class Solution {
    public int climbStairs(int n) {
        if (n == 1) return 1;
        int first = 1;
        int second = 2;
        for (int i = 3; i <= n; i++) {
            int third = first + second;
            first = second;
            second = third;
        }
        return second;
    }
}`,
        solutionExplanation: [
            'This is essentially the Fibonacci sequence.',
            'The number of ways to reach step n is the sum of ways to reach step n-1 and n-2.',
            'Use two variables to keep track of the previous two values to optimize space.',
        ],
    },
    {
        id: '8',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        tags: ['Array', 'Dynamic Programming'],
        description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
        examples: [
            {
                input: 'prices = [7,1,5,3,6,4]',
                output: '5',
                explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.',
            },
            {
                input: 'prices = [7,6,4,3,1]',
                output: '0',
                explanation: 'In this case, no transactions are done and the max profit = 0.',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        javaSolution: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
        solutionExplanation: [
            'Iterate through the prices array.',
            'Keep track of the minimum price seen so far.',
            'Calculate the potential profit if we sold at the current price (current price - min price).',
            'Update the maximum profit if the potential profit is higher.',
        ],
    },
    {
        id: '9',
        title: 'Binary Tree Inorder Traversal',
        difficulty: 'Easy',
        tags: ['Stack', 'Tree', 'Depth-First Search', 'Binary Tree'],
        description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
        examples: [
            {
                input: 'root = [1,null,2,3]',
                output: '[1,3,2]',
            },
            {
                input: 'root = []',
                output: '[]',
            },
            {
                input: 'root = [1]',
                output: '[1]',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        javaSolution: `class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            res.add(curr.val);
            curr = curr.right;
        }
        return res;
    }
}`,
        solutionExplanation: [
            'Use a stack to simulate the recursive process.',
            'Traverse to the leftmost node, pushing nodes onto the stack.',
            'Pop a node, add its value to the result, and then move to its right child.',
            'Repeat until the stack is empty and current node is null.',
        ],
    },
    {
        id: '10',
        title: 'Symmetric Tree',
        difficulty: 'Easy',
        tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
        description: `Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).`,
        examples: [
            {
                input: 'root = [1,2,2,3,4,4,3]',
                output: 'true',
            },
            {
                input: 'root = [1,2,2,null,3,null,3]',
                output: 'false',
            },
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        javaSolution: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return isMirror(root, root);
    }
    public boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val)
            && isMirror(t1.right, t2.left)
            && isMirror(t1.left, t2.right);
    }
}`,
        solutionExplanation: [
            'A tree is symmetric if the left subtree is a mirror reflection of the right subtree.',
            'Two trees are a mirror reflection of each other if:',
            '1. Their two roots have the same value.',
            '2. The right subtree of each tree is a mirror reflection of the left subtree of the other tree.',
        ],
    },
];
