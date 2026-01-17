# Giai đoạn 1: Build
FROM node:20-alpine AS builder

# Cài đặt pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy file cấu hình pnpm để install trước (tận dụng cache)
COPY pnpm-lock.yaml package.json ./

# Cài đặt dependencies
RUN pnpm install --frozen-lockfile

# Copy toàn bộ code và build
COPY . .
RUN pnpm run build

# Giai đoạn 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Chỉ lấy thành phẩm .output
COPY --from=builder /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]