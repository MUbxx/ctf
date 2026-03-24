// ── seed.js ─────────────────────────────────────────────────
// Run this ONCE after setting up Firebase to seed initial data.
// Open browser console on any page that imports firebase.js,
// then paste and call: seed()

import { db } from "./js/firebase.js";
import {
  collection, doc, setDoc, writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function seed() {
  const batch = writeBatch(db);

  const challenges = [
    { id:"ch01", title:"SQL Injection 101",    category:"Web",       difficulty:"Easy",   points:100, solves:0, flag:"flag{sql_inj_easy_bypass}",    description:"Classic SQL injection in a login form. Bypass authentication and retrieve the admin flag.", hint:"Try single quotes and OR conditions in the username field.", tags:["sql","injection","auth"],    visible:true },
    { id:"ch02", title:"XSS Chronicles",       category:"Web",       difficulty:"Medium", points:250, solves:0, flag:"flag{xss_stored_w1n}",          description:"A stored XSS vulnerability lurks in the comment section. Steal the admin cookie.", hint:"Think about how to exfiltrate cookies via fetch to your server.", tags:["xss","javascript","cookie"], visible:true },
    { id:"ch03", title:"SSRF Gateway",         category:"Web",       difficulty:"Hard",   points:500, solves:0, flag:"flag{ssrf_internal_leak}",      description:"The application fetches URLs on your behalf. Can you reach the internal metadata endpoint?", hint:"Cloud providers expose metadata at 169.254.169.254.", tags:["ssrf","cloud","network"],    visible:true },
    { id:"ch04", title:"RSA Baby Steps",       category:"Crypto",    difficulty:"Easy",   points:150, solves:0, flag:"flag{rsa_small_e_cube_root}",   description:"A weak RSA implementation with small public exponent. Recover the plaintext message.", hint:"What happens when e=3 and m^e < n? No modular reduction needed!", tags:["rsa","math","number-theory"],visible:true },
    { id:"ch05", title:"AES-ECB Penguin",      category:"Crypto",    difficulty:"Medium", points:300, solves:0, flag:"flag{ecb_mode_is_bad_mkay}",    description:"ECB mode encryption leaks patterns. Identify the plaintext structure from ciphertext blocks.", hint:"Identical plaintext blocks produce identical ciphertext blocks.", tags:["aes","ecb","block-cipher"],  visible:true },
    { id:"ch06", title:"Diffie Who?",          category:"Crypto",    difficulty:"Hard",   points:500, solves:0, flag:"flag{pohlig_hellman_wins}",     description:"A weak DH exchange uses a smooth prime. Recover the shared secret.", hint:"Factor p-1. Pohlig-Hellman attacks work when all factors are small.", tags:["dh","discrete-log","math"],  visible:true },
    { id:"ch07", title:"Buffer Overflow 0",    category:"Pwn",       difficulty:"Easy",   points:200, solves:0, flag:"flag{bof_ret2win_classic}",     description:"Classic stack buffer overflow. Overwrite the return address to jump to win().", hint:"Find the offset with cyclic patterns. Look for win() in the binary.", tags:["bof","stack","rop"],         visible:true },
    { id:"ch08", title:"Format String Fun",    category:"Pwn",       difficulty:"Hard",   points:500, solves:0, flag:"flag{fmt_str_got_overwrite}",  description:"Exploit a format string vulnerability to leak libc addresses and get a shell.", hint:"%p %p %p… what addresses do you see? Find the libc base.", tags:["fmt-string","libc","shell"],  visible:true },
    { id:"ch09", title:"Steganography Intro",  category:"Forensics", difficulty:"Easy",   points:100, solves:0, flag:"flag{hidden_in_lsb_plane}",    description:"An innocent image hides a secret. Extract it using common steganography tools.", hint:"Try steghide or zsteg with default options.", tags:["stego","image","lsb"],        visible:true },
    { id:"ch10", title:"PCAP Whisperer",       category:"Forensics", difficulty:"Medium", points:350, solves:0, flag:"flag{dns_exfil_caught}",       description:"A network capture contains suspicious traffic. Identify the exfiltrated data.", hint:"Filter by DNS. Subdomains can carry base64-encoded data.", tags:["wireshark","pcap","dns"],     visible:true },
    { id:"ch11", title:"ELF Crackme",          category:"Rev",       difficulty:"Medium", points:300, solves:0, flag:"flag{crackme_angr_ftw}",       description:"A compiled ELF binary validates your input. Reverse engineer to find the password.", hint:"Load in Ghidra. Check the comparison function near main().", tags:["elf","ghidra","reversing"],   visible:true },
    { id:"ch12", title:"Anti-Debug Maze",      category:"Rev",       difficulty:"Hard",   points:500, solves:0, flag:"flag{anti_debug_ptrace_bypass}",description:"This binary detects debuggers and misbehaves. Bypass all anti-debug tricks.", hint:"ptrace, SIGTRAP, and timing-based checks are common techniques.", tags:["anti-debug","ptrace","bypass"],visible:true },
    { id:"ch13", title:"Morse Decoder",        category:"Misc",      difficulty:"Easy",   points:50,  solves:0, flag:"flag{beep_boop_dit_dah}",      description:"Decode the Morse code message and submit the flag.", hint:"Standard ITU Morse. Online decoders work fine.", tags:["morse","encoding"],           visible:true },
    { id:"ch14", title:"Blockchain Heist",     category:"Misc",      difficulty:"Hard",   points:600, solves:0, flag:"flag{reentrancy_drained}",     description:"A vulnerable smart contract holds ETH. Find the reentrancy bug and drain it.", hint:"Think about how fallback functions interact with transfer().", tags:["blockchain","solidity","web3"],visible:true },
  ];

  challenges.forEach(c => {
    const { id, ...data } = c;
    batch.set(doc(db, "challenges", id), {
      ...data,
      createdAt: new Date()
    });
  });

  // Firestore rules reminder (paste in Firebase Console → Firestore → Rules):
  /*
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{uid} {
        allow read, write: if request.auth.uid == uid;
        allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      }
      match /challenges/{id} {
        allow read: if request.auth != null && resource.data.visible == true;
        allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      }
      match /solves/{id} {
        allow read: if request.auth != null;
        allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      }
      match /leaderboard/{uid} {
        allow read: if request.auth != null;
        allow write: if request.auth.uid == uid;
      }
    }
  }
  */

  await batch.commit();
  console.log("✅ Seeded", challenges.length, "challenges.");
  alert("Seeded " + challenges.length + " challenges into Firestore!");
}

// Auto-expose for console use
window.seed = seed;
