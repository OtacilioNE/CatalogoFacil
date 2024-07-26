import { db, storage } from "../../firebaseConfig";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

const imageCollection = collection(db, "catalog");

export async function addCatalogItem(imageFile: File, position: number) {
  try {
    const docId = uuidv4();
    const storageRef = ref(storage, `catalog/${docId}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(imageCollection, {
      imageUrl: downloadURL,
      position: position,
      createdAt: new Date(),
    });

    console.log("Imagem adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar imagem: ", error);
  }
}

export async function getCatalogItems() {
  try {
    const q = query(imageCollection, orderBy("position"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao buscar imagem: ", error);
    return [];
  }
}

export async function updateCatalogItem(
  docId: string,
  newPosition: number,
  newImageFile?: File
) {
  try {
    let newImageUrl: string | undefined;

    if (newImageFile) {
      const storageRef = ref(storage, `catalog/${docId}`);
      await uploadBytes(storageRef, newImageFile);
      newImageUrl = await getDownloadURL(storageRef);
    }

    const docRef = doc(db, "catalog", docId);
    await updateDoc(docRef, {
      ...(newImageUrl && { imageUrl: newImageUrl }),
      position: newPosition,
      updatedAt: new Date(),
    });

    console.log("Imagem atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar imagem: ", error);
  }
}

export async function deleteCatalogItem(docId: string) {
  try {
    const docRef = doc(db, "catalog", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const imageUrl = docSnap.data().imageUrl;
      if (imageUrl) {
        const storageRef = ref(storage, `catalog/${docId}`);
        await deleteObject(storageRef);
      }
      await deleteDoc(docRef);
      console.log("Imagem deletada com sucesso!");
    } else {
      console.log("Imagem não encontrada!");
    }
  } catch (error) {
    console.error("Erro ao deletar imagem: ", error);
  }
}
