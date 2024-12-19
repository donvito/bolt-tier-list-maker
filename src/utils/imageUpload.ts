export async function handleImageDrop(e: DragEvent): Promise<Array<{ url: string; name: string; id: string }>> {
  e.preventDefault();
  
  const files = Array.from(e.dataTransfer?.files || []).filter(file =>
    file.type.startsWith('image/')
  );
  
  if (files.length === 0) return [];
  
  return Promise.all(files.map(async file => {
    const url = URL.createObjectURL(file);
    const name = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const id = file.name; // Use the original filename as the key
    return { url, name, id };
  }));
}