export async function getTranslations(locale: string) {
  const messages = (await import(`../messages/${locale}.json`)).default;

  return (key: string) => {
    const keys = key.split(".");
    let value: any = messages;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}
