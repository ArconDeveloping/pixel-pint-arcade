import net from "node:net";

const [, , host, portValue, timeoutValue] = process.argv;
const port = Number(portValue);
const timeoutSeconds = Number(timeoutValue ?? 60);

if (!host || !Number.isInteger(port)) {
  console.error("Usage: node docker/wait-for-tcp.mjs <host> <port> [timeoutSeconds]");
  process.exit(1);
}

const deadline = Date.now() + timeoutSeconds * 1000;

const tryConnect = () =>
  new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port });

    socket.once("connect", () => {
      socket.end();
      resolve();
    });

    socket.once("error", reject);
    socket.setTimeout(1000, () => {
      socket.destroy(new Error("Connection timed out"));
    });
  });

while (Date.now() < deadline) {
  try {
    await tryConnect();
    process.exit(0);
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

console.error(`Timed out waiting for ${host}:${port}`);
process.exit(1);
