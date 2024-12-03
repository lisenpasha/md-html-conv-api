import * as os from "os";
import fs from "fs"
import { execSync } from "child_process";

/**
 * Find PhantomJS's binary path dynamically using platform-specific commands.
 * @returns {string} Path to the PhantomJS binary.
 * @throws Will throw an error if PhantomJS is not found.
 */
export function getPhantomJsPath(): string {
  const isDocker = fs.existsSync("/.dockerenv") || 
                   (fs.existsSync("/proc/1/cgroup") &&
                    fs.readFileSync("/proc/1/cgroup", "utf8").includes("docker"));

  if (isDocker) {
    return "/usr/local/bin/phantomjs"; // Default Docker path
  }

  const osType = os.type(); // Determine the OS type: Linux, Windows_NT, Darwin (macOS)
  let command: string;

  if (osType === "Windows_NT") {
    // Use 'where' command for Windows
    command = "where phantomjs";
  } else {
    // Use 'which' command for Linux/macOS
    command = "which phantomjs";
  }

  try {
    const result = execSync(command, { encoding: "utf8" }).trim();
    if (result) {
      return result; // Return the path if found
    } else {
      throw new Error("PhantomJS binary not found.");
    }
  } catch (error) {
    throw new Error(
      `PhantomJS binary not found. Please ensure it is installed on your system and accessible in the PATH.`
    );
  }
}
