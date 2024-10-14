<script setup lang="ts"></script>

<template>
  <UContainer>
    <article class="prose lg:prose-lg my-6">
      <h2>Bulls and Cows Tutorial</h2>
      <p>
        Welcome to Bulls and Cows, a fun code-breaking game! The goal is to
        guess a secret 4-digit code, with each guess scored based on "bulls"
        (correct digits in the correct position) and "cows" (correct digits in
        the wrong position).
      </p>

      <h3>How to Play</h3>
      <ol>
        <li>
          The game generates a secret 4-digit code using the digits 0-9.
          Duplicates are allowed.
        </li>
        <li>Enter your guess for the code. Use any 4-digit number, 0-9.</li>
        <li>
          The game will score your guess:
          <ul>
            <li>
              A "bull" (🎯) is a digit that is correct and in the right
              position.
            </li>
            <li>
              A "cow" (🐮) is a digit that is correct but in the wrong position.
            </li>
          </ul>
        </li>
        <li>
          Use the bulls and cows to refine your next guess. The more bulls, the
          closer you are to the code!
        </li>
        <li>
          Keep guessing until you get 4 bulls, meaning you've cracked the code!
          Try to do it in as few guesses as possible.
        </li>
      </ol>

      <h3>Example</h3>
      <p>Let's say the secret code is 4271.</p>

      <table>
        <thead>
          <tr>
            <th>Your guess</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1234</td>
            <td>🐮🎯</td>
          </tr>
          <tr>
            <td>4130</td>
            <td>🎯🐮</td>
          </tr>
          <tr>
            <td>4237</td>
            <td>🎯🎯🐮</td>
          </tr>
          <tr>
            <td>4271</td>
            <td>🎯🎯🎯🎯</td>
          </tr>
        </tbody>
      </table>

      <h3>Tips</h3>
      <ul>
        <li>
          Pay attention to your previous guesses and scores to logically deduce
          the code.
        </li>
        <li>
          If a digit is a "cow", try it in a different position on your next
          guess.
        </li>
        <li>
          Avoid reusing digits you know are wrong based on zero bulls and cows.
        </li>
        <li>
          There's no pressure - have fun and take your time figuring out the
          code!
        </li>
      </ul>

      <p>Good luck, and enjoy playing Bulls and Cows!</p>
    </article>
  </UContainer>
</template>
