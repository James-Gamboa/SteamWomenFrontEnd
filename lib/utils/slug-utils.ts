// TODO: Reemplazar con validación y generación de slugs desde Django
// En Django, los slugs se generarán automáticamente usando django-autoslug
// y se validarán para asegurar unicidad en la base de datos

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const validateSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

export const ensureUniqueSlug = async (
  baseSlug: string,
  existingSlugs: string[],
): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// TODO: Implementar con Django
// En Django, la validación de slugs únicos se hará así:
// from django.db import models
// from autoslug import AutoSlugField
//
// class Event(models.Model):
//     title = models.CharField(max_length=200)
//     slug = AutoSlugField(populate_from='title', unique=True)
//
// class Opportunity(models.Model):
//     title = models.CharField(max_length=200)
//     slug = AutoSlugField(populate_from='title', unique=True)
