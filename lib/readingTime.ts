// Calculate reading time based on word count
export function calculateReadingTime(text: string): number {
  // Remove HTML tags and extra whitespace
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  // Count words (split by spaces)
  const wordCount = cleanText.split(' ').filter(word => word.length > 0).length;
  
  // Average reading speed: 200 words per minute for Hindi content
  // Hindi text typically has longer words, so slightly slower reading speed
  const wordsPerMinute = 180;
  
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Minimum 1 minute, maximum 30 minutes
  return Math.min(30, Math.max(1, readingTime));
}

// Format reading time in Hindi
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 मिनट पढ़ने में';
  } else if (minutes < 60) {
    return `${minutes} मिनट पढ़ने में`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} घंटे पढ़ने में`;
    } else {
      return `${hours} घंटे ${remainingMinutes} मिनट पढ़ने में`;
    }
  }
}
