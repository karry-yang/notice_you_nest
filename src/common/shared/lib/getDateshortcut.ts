function getDateShortcut(shortcut: 'today' | 'tomorrow' | 'yesterday' | 'last7Days' | 'thisWeek'): string | string[] {
  const now = new Date();
  const day = now.getDay(); // 星期几，0 表示周日

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  switch (shortcut) {
    case 'today':
      return formatDate(now);

    case 'tomorrow':
      now.setDate(now.getDate() + 1);
      return formatDate(now);

    case 'yesterday':
      now.setDate(now.getDate() - 1);
      return formatDate(now);

    case 'last7Days': {
      const dates: string[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        dates.push(formatDate(d));
      }
      return dates;
    }

    case 'thisWeek': {
      const dates: string[] = [];
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - day); // 设置为本周的周日（可以根据需要改为周一）
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        dates.push(formatDate(d));
      }
      return dates;
    }

    default:
      return formatDate(now); // fallback
  }
}
