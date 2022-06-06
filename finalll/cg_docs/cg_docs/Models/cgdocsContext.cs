using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace cg_docs.Models
{
    public partial class cgdocsContext : DbContext
    {
        public cgdocsContext()
        {
        }

        public cgdocsContext(DbContextOptions<cgdocsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Documents> Documents { get; set; }
        public virtual DbSet<Folders> Folders { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=cgdocs;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Documents>(entity =>
            {
                entity.HasKey(e => e.DocumentId);

                entity.ToTable("documents");

                entity.Property(e => e.DocumentId).HasColumnName("Document_Id");

                entity.Property(e => e.ContentType)
                    .HasColumnName("Content_Type")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt).HasColumnType("smalldatetime");

                entity.Property(e => e.DocumentName)
                    .HasColumnName("Document_Name")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__documents__Creat__619B8048");

                entity.HasOne(d => d.Folder)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.FolderId)
                    .HasConstraintName("FK__documents__Folde__628FA481");
            });

            modelBuilder.Entity<Folders>(entity =>
            {
                entity.ToTable("folders");

                entity.Property(e => e.FoldersId).HasColumnName("folders_Id");

                entity.Property(e => e.CreatedAt).HasColumnType("smalldatetime");

                entity.Property(e => e.FolderName)
                    .HasColumnName("folder_name")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Folders)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__folders__Created__5EBF139D");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("users");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.Property(e => e.CreatedAt).HasColumnType("smalldatetime");

                entity.Property(e => e.Password)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
