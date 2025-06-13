// snowflake.js
const EPOCH = 1704067200000; // 自定义起始时间戳，例如 2024-01-01

let sequence = 0;
let lastTimestamp = -1;

const datacenterId = 1; // 数据中心 ID（0~31）
const workerId = 1; // 机器 ID（0~31）

// 生成雪花ID
export const generateSnowflakeId = () => {
    let timestamp = Date.now();

    // 如果当前时间和上次相同，增加序列号
    if (timestamp === lastTimestamp) {
        sequence = (sequence + 1) & 0xfff; // 12位序列号限制（4095）
        if (sequence === 0) {
            // 超过每毫秒 4096，则等待下一毫秒
            while (timestamp <= lastTimestamp) {
                timestamp = Date.now();
            }
        }
    } else {
        sequence = 0;
    }

    lastTimestamp = timestamp;

    // 计算各部分
    const timestampPart = BigInt(timestamp - EPOCH) << BigInt(22); // 41位时间戳
    const datacenterPart = BigInt(datacenterId) << BigInt(17); // 5位数据中心
    const workerPart = BigInt(workerId) << BigInt(12); // 5位机器ID
    const sequencePart = BigInt(sequence); // 12位序列号

    // 合并各部分为最终的雪花ID
    return (timestampPart | datacenterPart | workerPart | sequencePart).toString();
};