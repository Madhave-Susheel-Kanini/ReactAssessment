﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TourPortal.Data;

#nullable disable

namespace TourPortal.Migrations
{
    [DbContext(typeof(UserContext))]
    [Migration("20230807052519_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TourPortal.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("TourPortal.Models.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookingId"));

                    b.Property<int?>("UserDetailId")
                        .HasColumnType("int");

                    b.Property<string>("billingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("billingMail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("daysCount")
                        .HasColumnType("int");

                    b.Property<string>("endDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("endTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("endingPoint")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("headCount")
                        .HasColumnType("int");

                    b.Property<string>("hotel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startingPoint")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userMail")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BookingId");

                    b.HasIndex("UserDetailId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("TourPortal.Models.Feedback", b =>
                {
                    b.Property<int>("feedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("feedbackId"));

                    b.Property<int?>("BookingId")
                        .HasColumnType("int");

                    b.Property<string>("createdAt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("feedback")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("userId")
                        .HasColumnType("int");

                    b.HasKey("feedbackId");

                    b.HasIndex("BookingId");

                    b.HasIndex("userId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("TourPortal.Models.Gallery", b =>
                {
                    b.Property<int>("galId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("galId"));

                    b.Property<string>("galImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("galName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("galId");

                    b.ToTable("Galleries");
                });

            modelBuilder.Entity("TourPortal.Models.UserDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UserDetails");
                });

            modelBuilder.Entity("TourPortal.Models.Booking", b =>
                {
                    b.HasOne("TourPortal.Models.UserDetail", "UserDetail")
                        .WithMany("Bookings")
                        .HasForeignKey("UserDetailId");

                    b.Navigation("UserDetail");
                });

            modelBuilder.Entity("TourPortal.Models.Feedback", b =>
                {
                    b.HasOne("TourPortal.Models.Booking", "booking")
                        .WithMany("Feedbacks")
                        .HasForeignKey("BookingId");

                    b.HasOne("TourPortal.Models.UserDetail", "user")
                        .WithMany("Feedbacks")
                        .HasForeignKey("userId");

                    b.Navigation("booking");

                    b.Navigation("user");
                });

            modelBuilder.Entity("TourPortal.Models.Booking", b =>
                {
                    b.Navigation("Feedbacks");
                });

            modelBuilder.Entity("TourPortal.Models.UserDetail", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Feedbacks");
                });
#pragma warning restore 612, 618
        }
    }
}
